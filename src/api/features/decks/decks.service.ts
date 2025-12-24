import { prisma } from "@/lib/prisma";

export class DeckService {
  /**
   * Creates a new game deck.
   */
  static async createDeck(data: {
    title?: string;
    gameModeId: number;
    userId: number;
  }) {
    return await prisma.gameDeck.create({
      data: {
        title: data.title,
        gameModeId: data.gameModeId,
        userId: data.userId,
        isSaved: false,
      },
    });
  }

  /**
   * Fetches a deck by ID.
   */
  static async getDeck(id: string) {
    return await prisma.gameDeck.findUnique({
      where: { id: Number(id) },
      include: {
        gameMode: true,
        gameCards: true,
      },
    });
  }

  /**
   * Generates rules (cards) for a deck.
   */
  static async generateCards(deckId: number) {
    const deck = await prisma.gameDeck.findUnique({
      where: { id: deckId },
    });

    if (!deck) throw new Error("Deck not found");

    // Placeholder for rule generation logic
    const ruleTemplates = [
      "Drink if you are the dealer.",
      "Everyone takes a shot.",
      "The person to your left drinks.",
    ];

    const cards = ruleTemplates.map((template, index) => ({
      ruleText: template,
      deckId: deck.id,
      orderIndex: index,
    }));

    return await prisma.gameCard.createMany({
      data: cards,
    });
  }
}
