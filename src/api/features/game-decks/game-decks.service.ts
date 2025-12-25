import { prisma } from "../../../lib/prisma";

export class GameDecksService {
  static async createDeck(data: { 
    userId: number; 
    gameModeId: number; 
    title?: string;
    notes?: string;
    goal?: string;
    secrets?: string;
    extra?: string;
    chaosLevel?: number;
    useImages?: boolean;
  }) {
    return await prisma.gameDeck.create({
      data: {
        userId: data.userId,
        gameModeId: data.gameModeId,
        title: data.title,
        notes: data.notes,
        goal: data.goal,
        secrets: data.secrets,
        extra: data.extra,
        chaosLevel: data.chaosLevel ?? 3,
        useImages: data.useImages ?? false,
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
        _count: {
          select: { gameCards: true }
        }
      },
    });
  }

  static async markDeckAsSaved(id: number) {
    return await prisma.gameDeck.update({
      where: { id },
      data: { isSaved: true },
    });
  }

  static async getDeckWithCards(id: number) {
    return await prisma.gameDeck.findUnique({
      where: { id },
      include: {
        gameMode: true,
        gameCards: {
          include: {
            photo: true
          }
        },
      },
    });
  }
  static async updateDeck(id: number, data: { title?: string }) {
    return await prisma.gameDeck.update({
      where: { id },
      data: { title: data.title },
    });
  }

  static async deleteDeck(id: number) {
    // Delete cards first (cascading might be on, but explicit is safer or required depending on prisma setup)
    await prisma.gameCard.deleteMany({
      where: { deckId: id }
    });
    
    return await prisma.gameDeck.delete({
      where: { id },
    });
  }
}
