import { prisma } from "../../../lib/prisma";
import { GoogleGenAI } from "@google/genai";

export class AICardsGeneratorService {
  private static genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
  });

  static async generateDeckSuggestions(deckId: number) {
    // 1. Fetch deck details
    const deck = await prisma.gameDeck.findUnique({
      where: { id: deckId },
      include: { 
        gameMode: true,
        gameCards: {
          where: { isDraft: true }
        }
      },
    });

    if (!deck) throw new Error("Deck not found");

    // 2. Check if we already have drafts for this deck
    if (deck.gameCards && deck.gameCards.length >= 20) {
      console.log("Returning existing draft cards for deck", deckId);
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

    // 3. Generate 2 different variations based on game mode
    // These variations stay within the game mode but offer different styles
    const variations = [
      { 
        name: "Bold & Daring", 
        instruction: "Create cards that are bold and push boundaries. Make them memorable and daring within the game mode." 
      },
      { 
        name: "Deck 2", 
        instruction: "Create cards that maximize chaos and unpredictability. Make them wild and hilarious within the game mode." 
      }
    ];

    const deckSuggestions = await Promise.all(
      variations.map(async (variation, index) => {
        const prompt = this.constructVariationPrompt(deck, variation, index + 1);
        
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

    return deckSuggestions;
  }


  private static constructVariationPrompt(deck: any, variation: { name: string; instruction: string }, deckNumber: number) {
    const { goal, secrets, extra, chaosLevel } = deck;
    const modeName = deck.gameMode.name;
    
    // Map mode-specific focus outside the prompt
    const modeFocusMap: Record<string, string> = {
      "Sandy's Confession": "Focus on revealing secrets, uncomfortable truths, and social challenges.",
      "Pure Provocation": "Focus on drinking rules, group challenges, and circle-based gameplay.",
      "The Verdict": "Focus on adult content, intimate dares, and spicy challenges."
    };
    const modeFocus = modeFocusMap[modeName] || "";

    // Extract people and extra context
    const peopleMatch = extra?.match(/People in the room: (.*)/);
    const peopleList = peopleMatch ? peopleMatch[1] : null;
    const cleanExtra = extra?.replace(/People in the room: .*/, '').trim();

    // Dynamically build context lines
    const contextLines = [
      goal && `- Goal: ${goal}`,
      secrets && `- Secrets: ${secrets}`,
      peopleList && `- Participants: ${peopleList}`,
      cleanExtra && `- Extra vibe: ${cleanExtra}`
    ].filter(Boolean);

    return `You are "Sandy", a mischievous/witty game master for "Sandy Said So". 
Generate exactly 10 cards for: ${modeName}.
${modeFocus}

Rules:
1. Variation: ${variation.instruction}
2. Chaos Level: ${chaosLevel}
3. ${peopleList ? "Use participant names in most cards." : ""}
4. ${secrets ? "Weave in secrets naturally." : ""}
5. Output format: Valid JSON array of 10 strings.

Context:
${contextLines.join('\n')}

Example: ["Sandy says: Drink if you've ever lied about your age.", "The person to your left must reveal their secret or take 3 sips."]`;
  }

  private static parseGeneratedCards(text: string): string[] {
    try {
      // Remove any potential markdown code blocks
      const cleanJson = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error("Failed to parse AI response:", text);
      // Fallback: split by lines if JSON parsing fails, though prompt asks for JSON
      return text.split("\n").filter(line => line.trim().length > 0).slice(0, 10);
    }
  }
}
