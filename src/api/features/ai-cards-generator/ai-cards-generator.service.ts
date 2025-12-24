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
      model: "gemini-2.5-flash",
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

    // 2. Generate 3 different themed decks
    const themes = [
      { name: "Spicy & Bold", vibe: "Make these cards bold, daring, and spicy. Push boundaries and create memorable moments." },
      { name: "Chill & Conversational", vibe: "Keep it light, fun, and conversational. Focus on getting to know each other better." },
      { name: "Chaotic & Wild", vibe: "Maximum chaos! Create unpredictable, wild, and hilarious situations." }
    ];

    const deckSuggestions = await Promise.all(
      themes.map(async (theme) => {
        const prompt = this.constructThemePrompt(deck, theme);
        
        const response = await this.genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text = response.text || "";
        const cards = this.parseGeneratedCards(text);

        return {
          theme: theme.name,
          cards: cards
        };
      })
    );

    return deckSuggestions;
  }

  private static constructPrompt(deck: any) {
    const modeName = deck.gameMode.name;
    const { goal, secrets, extra, chaosLevel } = deck;

    let basePrompt = `You are "Sandy", a mischievous and witty game master for a drinking game called "Sandy Said So". 
Your goal is to generate 15-20 creative, engaging, and sometimes brutal cards for a game deck.

Game Mode: ${modeName}
Chaos Level (1-5): ${chaosLevel}
User-provided Context:
- Goal: ${goal || "Not specified"}
- Secrets/Inside Jokes: ${secrets || "None"}
- Extra Rules/Vibe: ${extra || "None"}

Instructions for each card:
1. Each card should be a "command" or "situation" from Sandy.
2. The tone should be consistent with the game mode. 
3. If secrets or inside jokes are provided, try to weave them into 2-3 of the cards subtly or explicitly (depending on chaos level).
4. If chaos level is high (4 or 5), make the dares more daring or the "punishments" (drinks) more frequent.
5. If chaos level is low (1 or 2), keep it more conversational and light.
6. Use "Sandy says..." or similar phrasing for some cards to maintain the persona.

OUTPUT FORMAT:
Return ONLY a valid JSON array of strings, where each string is the text for one card. No other text or markdown formatting outside the JSON.
Example: ["Sandy says: Drink if you've ever lied about your age.", "The person to your left must reveal their most embarrassing secret or take 3 sips."]
`;

    return basePrompt;
  }

  private static constructThemePrompt(deck: any, theme: { name: string; vibe: string }) {
    const modeName = deck.gameMode.name;
    const { goal, secrets, extra, chaosLevel } = deck;

    let basePrompt = `You are "Sandy", a mischievous and witty game master for a drinking game called "Sandy Said So". 
Your goal is to generate exactly 20 creative, engaging cards for a game deck with a specific theme.

Game Mode: ${modeName}
Chaos Level (1-5): ${chaosLevel}
Theme: ${theme.name}
Theme Vibe: ${theme.vibe}

User-provided Context:
- Goal: ${goal || "Not specified"}
- Secrets/Inside Jokes: ${secrets || "None"}
- Extra Rules/Vibe: ${extra || "None"}

Instructions for each card:
1. Each card should be a "command" or "situation" from Sandy.
2. The tone should be consistent with the game mode AND the theme vibe.
3. IMPORTANT: Align all cards with the "${theme.name}" theme - ${theme.vibe}
4. If secrets or inside jokes are provided, try to weave them into 2-3 of the cards.
5. Use "Sandy says..." or similar phrasing for some cards to maintain the persona.
6. Make each card unique and interesting.

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
