import { prisma } from "../../../lib/prisma";

export class GameDecksService {
  static async createDeck(data: { 
    userId: string; 
    gameModeId: number; 
    title?: string;
    notes?: string;
    goal?: string;
    secrets?: string;
    extra?: string;
    chaosLevel?: number;
    useImages?: boolean;
  }) {
    const deck = await prisma.gameDeck.create({
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

    return deck;
  }

  static async listDecks(userId: string, gameModeId?: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(gameModeId ? { gameModeId } : {})
    };

    const [total, data] = await prisma.$transaction([
      prisma.gameDeck.count({ where }),
      prisma.gameDeck.findMany({
        where,
        include: {
          gameMode: true,
          gameCards: true,
          _count: {
            select: { gameCards: true }
          }
        },
        skip,
        take: limit,
        orderBy: { id: 'desc' } // Safe fallback
      })
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async markDeckAsSaved(id: number) {
    return await prisma.gameDeck.update({
      where: { id },
      data: { isSaved: true },
    });
  }

  static async getDeckWithCards(id: number) {
    const deck = await prisma.gameDeck.findUnique({
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

    if (deck) {
      const { SandyChaosService } = await import("../sandy-chaos/sandy-chaos.service");
      const chaosCards = await SandyChaosService.getDeckChaosCards(deck.id);
      return {
        ...deck,
        sandyChaosCards: chaosCards
      };
    }

    return null;
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
