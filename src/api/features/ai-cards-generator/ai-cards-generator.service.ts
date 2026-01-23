import { prisma } from "../../../lib/prisma";
import { GoogleGenAI } from "@google/genai";

import { PromptsService } from "./prompts.service";

export class AICardsGeneratorService {
  private static genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
  });

  static async generateDeckSuggestions(deckId: number) {
    // 1. Fetch deck details - including ALL cards to avoid duplication
    const deck = await prisma.gameDeck.findUnique({
      where: { id: deckId },
      include: { 
        gameMode: true,
        gameCards: true 
      },
    });

    if (!deck) throw new Error("Deck not found");

    const existingCount = deck.gameCards?.length || 0;

    // 2. Check if we already have suggestions (drafts)
    const drafts = deck.gameCards.filter(c => c.isDraft);
    if (drafts.length > 0) {
      // Group cards by their card_type (phase) or into standard variations
      if (deck.gameMode.name === "Dimmed Lights") {
        const phases = ["PHASE_0", "PHASE_1", "PHASE_2", "PHASE_3", "PHASE_4", "PHASE_5"];
        const phaseNames: Record<string, string> = {
          PHASE_0: "Backstory",
          PHASE_1: "Opening Moment",
          PHASE_2: "Inside the Space",
          PHASE_3: "Almost",
          PHASE_4: "Tension",
          PHASE_5: "Permission"
        };

        return {
          gameModeName: deck.gameMode.name,
          suggestions: phases.map(phase => ({
            theme: phaseNames[phase],
            cards: drafts.filter(c => c.cardType === phase).map(c => c.ruleText)
          })).filter(p => p.cards.length > 0)
        };
      }

      // Standard mode grouping
      return {
        gameModeName: deck.gameMode.name,
        suggestions: [
          { 
            theme: "Bold & Daring", 
            cards: drafts.slice(0, 10).map(c => c.ruleText) 
          },
          { 
            theme: "Wild & Chaotic", 
            cards: drafts.slice(10, 20).map(c => c.ruleText) 
          }
        ].filter(v => v.cards.length > 0)
      };
    }

    // 3. Complete Cleanup: Remove ANY existing cards if we are re-generating
    await prisma.gameCard.deleteMany({
      where: { deckId }
    });

    // 4. Generate variations based on game mode
    let variations = [
      { 
        name: "Bold & Daring", 
        instruction: "Create cards that are bold and push boundaries.",
        type: null as any
      },
      { 
        name: "Wild & Chaotic", 
        instruction: "Create cards that maximize chaos and unpredictability.",
        type: null as any
      }
    ];

    if (deck.gameMode.name === "Dimmed Lights") {
      variations = [
        { type: "PHASE_0", name: "Backstory", instruction: "PHASE 0 — BACKSTORY (SHARED, READ TOGETHER). Short narrative paragraph establishing fictional context. No choices. No dialogue prompts." },
        { type: "PHASE_1", name: "Opening Moment", instruction: "PHASE 1 — THE OPENING MOMENT. Romance-novel beginning. Gentle tension. Emotional stakes. No rush." },
        { type: "PHASE_2", name: "Inside the Space", instruction: "PHASE 2 — INSIDE THE SPACE. Proximity, noticing details. No urgency." },
        { type: "PHASE_3", name: "Almost", instruction: "PHASE 3 — ALMOST. Closeness without crossing the line. Anticipation focus." },
        { type: "PHASE_4", name: "Tension", instruction: "PHASE 4 — TENSION. Waiting becomes intentional. Subtle control." },
        { type: "PHASE_5", name: "Permission", instruction: "PHASE 5 — PERMISSION. Game steps back. Couple continues naturally." },
      ] as any;
    }

    let globalCardIndex = 0;
    const deckSuggestions = await Promise.all(
      variations.map(async (variation) => {
        const prompt = PromptsService.getPromptForMode(deck.gameMode.name, deck, variation);
        
        const response = await this.genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text = response.text || "";
        const cards = this.parseGeneratedCards(text);
        
        // Save suggested cards as drafts
        await Promise.all(
          cards.map((card) => {
            const currentIndex = globalCardIndex++;
            return prisma.gameCard.create({
              data: {
                deckId: deck.id,
                ruleText: typeof card === 'string' ? card : card.text,
                orderIndex: currentIndex,
                cardType: variation.type,
                targetPerson: typeof card === 'string' ? null : card.target,
                isDraft: deck.gameMode?.name === "Dimmed Lights" ? false : true
              }
            });
          })
        );

        return {
          theme: variation.name,
          cards: cards
        };
      })
    );

    return {
      gameModeName: deck.gameMode?.name,
      suggestions: deckSuggestions
    };
  }


  private static parseGeneratedCards(text: string): (string | { text: string; target: string })[] {
    try {
      // 1. Extreme cleaning: find the first '[' and last ']'
      let cleanJson = text.trim();
      
      // Remove markdown blocks if present
      cleanJson = cleanJson.replace(/```json/gi, "").replace(/```/gi, "").trim();
      
      // Remove common AI prefixes like "json" or "Result:"
      if (cleanJson.toLowerCase().startsWith("json")) {
        cleanJson = cleanJson.substring(4).trim();
      }

      const startBracket = cleanJson.indexOf('[');
      const endBracket = cleanJson.lastIndexOf(']');

      if (startBracket !== -1 && endBracket !== -1) {
        cleanJson = cleanJson.substring(startBracket, endBracket + 1);
      }

      const parsed = JSON.parse(cleanJson);

      if (Array.isArray(parsed)) {
        // Flatten if AI returned [[...]]
        const flat = parsed.flat(2);
        return flat.filter(item => typeof item === 'string' || (typeof item === 'object' && item !== null && 'text' in item));
      }

      // 3. Fallback to line splitting if it's not an array
      throw new Error("Parsed result is not an array");
    } catch (error) {
      console.error("Robust Parse Fail. Raw text:", text);
      // Clean up common list markers if we fall back to split
      return text
        .split("\n")
        .map(line => line.replace(/^\d+\.\s*|^-\s*|^\[\d+\]\s*/, "").replace(/^"|"$/g, "").trim())
        .filter(line => line.length > 5 && !line.includes("JSON") && !line.includes("["))
        .map(text => ({ text, target: "Both" }))
        .slice(0, 10);
    }
  }
}
