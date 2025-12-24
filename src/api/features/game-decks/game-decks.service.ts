import { prisma } from "../../../lib/prisma";

export class GameDecksService {
  static async createDeck(data: { userId: number; gameModeId: number; title?: string }) {
    return await prisma.gameDeck.create({
      data: {
        userId: data.userId,
        gameModeId: data.gameModeId,
        title: data.title,
        isSaved: false,
      },
    });
  }

  static async listDecks(userId: number) {
    return await prisma.gameDeck.findMany({
      where: { userId },
      include: {
        gameMode: true,
        gameCards: true,
      },
    });
  }

  static async markDeckAsSaved(id: number) {
    return await prisma.gameDeck.update({
      where: { id },
      data: { isSaved: true },
    });
  }
}
