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
}
