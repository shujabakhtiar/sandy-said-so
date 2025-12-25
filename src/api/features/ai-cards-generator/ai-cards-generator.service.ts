import { prisma } from "../../../lib/prisma";
import { GoogleGenAI } from "@google/genai";

export class AICardsGeneratorService {
  private static genAI = new GoogleGenAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
  });

  static async generateCards(deckId: number) {
    // 1. Fetch deck details
    const deck = await prisma.gameDeck.findUnique({
      where: { id: deckId },
      include: { gameMode: true },
    });

    if (!deck) throw new Error("Deck not found");

    // 2. Prepare the prompt based on deck info
    const prompt = this.constructPrompt(deck);

    // 3. Generate content using new API
    const response = await this.genAI.models.generateContent({
      model: "gemini-3-flash",
      contents: prompt,
    });

    const text = response.text || "";

    // 4. Parse the generated cards
    const cards = this.parseGeneratedCards(text);

    // 5. Save cards to database
    const savedCards = await Promise.all(
      cards.map((cardText, index) =>
        prisma.gameCard.create({
          data: {
            deckId: deck.id,
            ruleText: cardText,
            orderIndex: index,
          },
        })
      )
    );

    // 6. Log the generation
    await prisma.aiGeneration.create({
      data: {
        deckId: deck.id,
        prompt: prompt,
        model: "gemini-2.5-flash",
      },
    });

    return savedCards;
  }

  static async generateDeckSuggestions(deckId: number) {
    // 1. Fetch deck details
    const deck = await prisma.gameDeck.findUnique({
      where: { id: deckId },
      include: { gameMode: true },
    });

    if (!deck) throw new Error("Deck not found");

    // 2. Generate 2 different variations based on game mode
    // These variations stay within the game mode but offer different styles
    const variations = [
      { 
        name: "Deck 1", 
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

        return {
          theme: variation.name,
          cards: cards
        };
      })
    );

    return deckSuggestions;
  }

  private static constructPrompt(deck: any) {
    const modeName = deck.gameMode.name;
    const { goal, secrets, extra, chaosLevel } = deck;
    // Extract people if they exist in the extra field pattern
    const peopleMatch = extra?.match(/People in the room: (.*)/);
    const peopleList = peopleMatch ? peopleMatch[1] : null;
    const cleanExtra = extra?.replace(/People in the room: .*/, '').trim();

    let basePrompt = `You are "Sandy", a mischievous and witty game master for a drinking game called "Sandy Said So". 
Your goal is to generate 15-20 creative, engaging, and sometimes brutal cards for a game deck.

Game Mode: ${modeName}
Chaos Level (1-5): ${chaosLevel}
User-provided Context:
- Goal: ${goal || "Not specified"}
- Secrets/Inside Jokes: ${secrets || "None"}
- Participants (People in the room): ${peopleList || "None specified, use general pronouns"}
- Extra Rules/Vibe: ${cleanExtra || "None"}

Instructions for each card:
1. Each card should be a "command" or "situation" from Sandy.
2. The tone should be consistent with the game mode. 
3. If participants are listed, use their names in 70% of the cards to create personalized challenges. If a participant has a note in parentheses (e.g. "Name (Note)"), use that information to make the challenge more specific and hilarious.
4. If secrets or inside jokes are provided, try to weave them into 40% of the cards subtly or explicitly (depending on chaos level).
4. If chaos level is high (4 or 5), make the dares more daring or the "punishments" (drinks) more frequent.
5. If chaos level is low (1 or 2), keep it more conversational but still provocative.
6. Use "Sandy says..." or similar phrasing for some cards to maintain the persona.

OUTPUT FORMAT:
Return ONLY a valid JSON array of strings, where each string is the text for one card. No other text or markdown formatting outside the JSON.
Example: ["Sandy says: Drink if you've ever lied about your age.", "The person to your left must reveal their most embarrassing secret or take 3 sips."]
`;

    return basePrompt;
  }

  private static constructVariationPrompt(deck: any, variation: { name: string; instruction: string }, deckNumber: number) {
    const modeName = deck.gameMode.name;
    const { goal, secrets, extra, chaosLevel } = deck;
    // Extract people if they exist in the extra field pattern
    const peopleMatch = extra?.match(/People in the room: (.*)/);
    const peopleList = peopleMatch ? peopleMatch[1] : null;
    const cleanExtra = extra?.replace(/People in the room: .*/, '').trim();

    let basePrompt = `You are "Sandy", a mischievous and witty game master for a drinking game called "Sandy Said So". 
Your goal is to generate exactly 20 creative, engaging cards for a game deck.

IMPORTANT CONTEXT:
Game Mode: ${modeName}
- If this is "Sandy's Confession" (Truth or Dare mode): Focus on revealing secrets, uncomfortable truths, and social challenges.
- If this is "Pure Provocation" (Kings Cup/Drinking Rituals): Focus on drinking rules, group challenges, and circle-based gameplay.
- If this is "The Verdict" (Naughty & Spicy/Sex Games): Focus on adult content, intimate dares, and spicy challenges.

Chaos Level (1-5): ${chaosLevel}
Deck Variation #${deckNumber}: ${variation.instruction}

User-provided Context:
- Goal: ${goal || "Not specified"}
- Secrets/Inside Jokes: ${secrets || "None"}
- Participants (People in the room): ${peopleList || "None specified, use general pronouns"}
- Extra Rules/Vibe: ${cleanExtra || "None"}

Instructions for each card:
1. Each card MUST align with the "${modeName}" game mode. Stay true to the mode's theme.
2. Apply the variation style: ${variation.instruction}
3. If participants are listed, use their names in 5-7 of the cards to create personalized challenges. Leverage any notes provided in parentheses for extra humor.
4. The tone should match both the game mode AND the variation style.
5. If secrets or inside jokes are provided, weave them into 2-3 cards naturally.
5. Use "Sandy says..." or similar phrasing for some cards to maintain the persona.
6. Make each card unique, engaging, and appropriate for the game mode.
7. Consider the chaos level - higher levels mean more intense/frequent consequences.

OUTPUT FORMAT:
Return ONLY a valid JSON array of exactly 20 strings, where each string is the text for one card. No other text or markdown formatting outside the JSON.
Example: ["Sandy says: Drink if you've ever lied about your age.", "The person to your left must reveal their most embarrassing secret or take 3 sips."]
`;

    return basePrompt;
  }

  private static parseGeneratedCards(text: string): string[] {
    try {
      // Remove any potential markdown code blocks
      const cleanJson = text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanJson);
    } catch (error) {
      console.error("Failed to parse AI response:", text);
      // Fallback: split by lines if JSON parsing fails, though prompt asks for JSON
      return text.split("\n").filter(line => line.trim().length > 0).slice(0, 20);
    }
  }
}
