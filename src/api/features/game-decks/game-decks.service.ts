import { db } from "@/lib/db";

export class GameDecksService {
  static async createDeck(data: { userId: number; gameModeId: number; title?: string }) {
    return await db.gameDeck.create({
      data: {
        userId: data.userId,
        gameModeId: data.gameModeId,
        title: data.title,
        isSaved: false,
      },
    });
  }

  static async listDecks(userId: number) {
    return await db.gameDeck.findMany({
      where: { userId },
      include: {
        gameMode: true,
        gameCards: true,
      },
    });
  }

  static async markDeckAsSaved(id: number) {
    return await db.gameDeck.update({
      where: { id },
      data: { isSaved: true },
    });
  }
}
