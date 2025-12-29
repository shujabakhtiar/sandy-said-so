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
    const modeName = deck.gameMode.name;

    switch (modeName) {
      case "Sandy's Confession":
        return this.buildConfessionPrompt(deck, variation);
      case "Pure Provocation":
        return this.buildProvocationPrompt(deck, variation);
      case "The Verdict":
        return this.buildVerdictPrompt(deck, variation);
      default:
        return this.buildStandardPrompt(deck, variation);
    }
  }

  private static buildConfessionPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", the Master of Secrets. 
Game: Sandy's Confession (Truth or Dare style).
Persona: Witty, provocative, and absolutely chaotic. You want to dig up dirt and embarrass everyone.

TASK: Generate exactly 10 cards.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5

Rules:
1. Focus on uncomfortable truths, social dares, and hidden secrets.
2. ${context.peopleList ? "Use participant names to target individuals directly." : ""}
3. ${context.secrets ? "Incorporate these secrets: " + context.secrets : ""}
4. Cards must be unpredictable and hilarious.
5. Limits: Max 30 words and 160 chars per card.
6. Format: Valid JSON array of 10 strings.

Context: ${context.summary}
Example: ["Sandy says: [Name], point to the person you'd least trust with your phone.", "Confess your cringiest high school memory or take 3 sips."]`;
  }

  private static buildProvocationPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", the Ringleader of the Rituals.
Game: Pure Provocation (Kings Cup style).
Persona: High-energy, commanding, and mischievous. You love group interactions and weird physical rules.

TASK: Generate exactly 10 cards.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5

Rules:
1. Create drinking rules, group challenges, and mini-games.
2. Include "Physical Rules" (e.g., "Sandy says: If I touch my nose, the last person to do the same drinks").
3. Include singing, rhyming, or category challenges.
4. ${context.peopleList ? "Challenge specific people: " + context.peopleList : ""}
5. Limits: Max 30 words and 160 chars per card.
6. Format: Valid JSON array of 10 strings.

Context: ${context.summary}
Example: ["Sandy says: Categories! Types of shots. [Name] starts.", "Thumb Master: When you put your thumb on the table, everyone follows. Last person drinks."]`;
  }

  private static buildVerdictPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", the Spicy Mistress.
Game: The Verdict (Intimate & Spicy).
Persona: Sultry, demanding, and sophisticated. You speak in a sexy, teasing tone.

TASK: Generate a deck of 10–15 adult intimacy prompt cards for couples.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5

Instructions: Each card should include:
Title (2–3 words, bold/punchy, e.g., “Hands Behind,” “Dominatrix”)
Description (1–2 sentences, clear, sexual intent, kinky or playful, but non-explicit about body acts)
Themes to include: bondage, role-playing, power exchange, toys, sexual tension, anticipation, control, denial, and positions.
The tone should be erotic, seductive, and consent-focused.
Cards should be usable in a choose 3–5 style, where couples pick a few and incorporate them in their play.
Avoid explicit pornographic detail. Focus on mood, power, and rules.
Give the output as a numbered list of cards with title and description.

Rules:
1. Focus on intimate activities: neck kisses, strip-tease elements, teasing and sex positions.
2. If context mentions items (ice, blindfolds, etc.), use them.
3. Tone: Sophisticated and sexy. Use a "Mistress" persona.
4. ${context.peopleList ? "Focus on the chemistry between: " + context.peopleList : ""}
5. Limits: Max 30 words and 160 chars per card.
6. Format: Valid JSON array of 10 strings.

Context: ${context.summary}
Example: ["Sandy says: Whisper your dirtiest fantasy into [Name]'s ear.", "Sandy commands: Remove one piece of clothing. Slowly."]`;
  }

  private static buildStandardPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", a mischievous game master.
Generate 10 cards for a drinking game.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5
Constraints: Max 30 words, 160 chars. JSON array format.
Context: ${context.summary}`;
  }

  private static getCleanContext(deck: any) {
    const { goal, secrets, extra } = deck;
    const peopleMatch = extra?.match(/People in the room: (.*)/);
    const peopleList = peopleMatch ? peopleMatch[1] : null;
    const cleanExtra = extra?.replace(/People in the room: .*/, '').trim();

    const parts = [
      goal && `Goal: ${goal}`,
      secrets && `Secrets: ${secrets}`,
      peopleList && `Players: ${peopleList}`,
      cleanExtra && `Extra: ${cleanExtra}`
    ].filter(Boolean);

    return {
      peopleList,
      secrets,
      summary: parts.join(' | ')
    };
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
