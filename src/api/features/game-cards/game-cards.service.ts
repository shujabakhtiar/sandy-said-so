import { prisma } from "../../../lib/prisma";

export class GameCardsService {
  static async addCard(data: { deckId: number; ruleText: string; photoId?: number; orderIndex: number }) {
    return await prisma.gameCard.create({
      data: {
        deckId: data.deckId,
        ruleText: data.ruleText,
        photoId: data.photoId,
        orderIndex: data.orderIndex,
      },
    });
  }

  static async listCards(deckId: number) {
    return await prisma.gameCard.findMany({
      where: { deckId },
      orderBy: { orderIndex: "asc" },
      include: {
        photo: true,
      },
    });
  }

  static async bulkAddCards(deckId: number, cards: { ruleText: string; orderIndex: number; photoId?: number }[]) {
    // First, delete any existing cards for this deck
    await prisma.gameCard.deleteMany({
      where: { deckId },
    });

    // Then create all the new cards
    return await prisma.gameCard.createMany({
      data: cards.map(card => ({
        deckId,
        ruleText: card.ruleText,
        orderIndex: card.orderIndex,
        photoId: card.photoId,
      })),
    });
  }
}
