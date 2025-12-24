import { db } from "@/lib/db";

export class GameCardsService {
  static async addCard(data: { deckId: number; ruleText: string; photoId?: number; orderIndex: number }) {
    return await db.gameCard.create({
      data: {
        deckId: data.deckId,
        ruleText: data.ruleText,
        photoId: data.photoId,
        orderIndex: data.orderIndex,
      },
    });
  }

  static async listCards(deckId: number) {
    return await db.gameCard.findMany({
      where: { deckId },
      orderBy: { orderIndex: "asc" },
      include: {
        photo: true,
      },
    });
  }
}
