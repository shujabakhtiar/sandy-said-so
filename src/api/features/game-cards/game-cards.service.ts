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
      where: { 
        deckId,
        isDraft: false
      },
      orderBy: { orderIndex: "asc" },
      include: {
        photo: true,
      },
    });
  }

  static async bulkAddCards(deckId: number, cards: { ruleText: string; orderIndex: number; photoId?: number }[]) {
    const ruleTextsToSave = cards.map(c => c.ruleText);

    // 1. Mark selected cards as live (isDraft: false)
    await prisma.gameCard.updateMany({
      where: {
        deckId,
        ruleText: { in: ruleTextsToSave },
      },
      data: { isDraft: false }
    });

    // 2. Ensure cards NOT in this selection are marked as drafts
    await prisma.gameCard.updateMany({
      where: {
        deckId,
        ruleText: { notIn: ruleTextsToSave },
      },
      data: { isDraft: true }
    });

    // 3. Handle any completely new cards that might have been added
    const currentCards = await prisma.gameCard.findMany({
      where: { deckId, ruleText: { in: ruleTextsToSave } }
    });
    
    const currentTexts = new Set(currentCards.map(c => c.ruleText));
    const missingCards = cards.filter(c => !currentTexts.has(c.ruleText));

    if (missingCards.length > 0) {
      await prisma.gameCard.createMany({
        data: missingCards.map(card => ({
          deckId,
          ruleText: card.ruleText,
          orderIndex: card.orderIndex,
          photoId: card.photoId,
          isDraft: false
        })),
      });
    }

    // 4. Update order indices for the live cards
    for (const card of cards) {
      await prisma.gameCard.updateMany({
        where: { deckId, ruleText: card.ruleText },
        data: { orderIndex: card.orderIndex }
      });
    }

    return { count: cards.length };
  }

  static async updateCard(id: number, data: { ruleText?: string; isDraft?: boolean }) {
    return await prisma.gameCard.update({
      where: { id },
      data: { 
        ruleText: data.ruleText,
        isDraft: data.isDraft
      },
    });
  }

  static async deleteCard(id: number) {
    // Instead of deleting, we mark as draft
    return await prisma.gameCard.update({
      where: { id },
      data: { isDraft: true },
    });
  }
}
