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

    // 2. Check if we already have a complete set of cards (live or drafts)
    if (existingCount >= 20) {
      // Group them into the expected theme structure for the UI
      return [
        { 
          theme: "Bold & Daring", 
          cards: deck.gameCards.slice(0, 10).map(c => c.ruleText) 
        },
        { 
          theme: "Wild & Chaotic", 
          cards: deck.gameCards.slice(10, 20).map(c => c.ruleText) 
        }
      ];
    }

    // 3. Complete Cleanup: Remove ANY existing cards if we are re-generating
    await prisma.gameCard.deleteMany({
      where: { deckId }
    });

    // 4. Generate 2 different variations
    const variations = [
      { 
        name: "Bold & Daring", 
        instruction: "Create cards that are bold and push boundaries." 
      },
      { 
        name: "Wild & Chaotic", 
        instruction: "Create cards that maximize chaos and unpredictability." 
      }
    ];

    const deckSuggestions = await Promise.all(
      variations.map(async (variation, index) => {
        const prompt = PromptsService.getPromptForMode(deck.gameMode.name, deck, variation);
        
        const response = await this.genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text = response.text || "";
        const cards = this.parseGeneratedCards(text);
        
        // Save suggested cards as drafts
        await Promise.all(
          cards.map((cardText, cardIndex) =>
            prisma.gameCard.create({
              data: {
                deckId: deck.id,
                ruleText: cardText,
                orderIndex: cardIndex + (index * 10),
                isDraft: true
              }
            })
          )
        );

        return {
          theme: variation.name,
          cards: cards
        };
      })
    );

    const totalGenerated = deckSuggestions.reduce((acc, curr) => acc + curr.cards.length, 0);
    return deckSuggestions;
  }


  private static parseGeneratedCards(text: string): string[] {
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

      // 2. Handle nested arrays or weird objects
      if (Array.isArray(parsed)) {
        // Flatten if AI returned [[...]]
        const flat = parsed.flat(2);
        return flat.filter(item => typeof item === 'string').slice(0, 10);
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
        .slice(0, 10);
    }
  }
}
