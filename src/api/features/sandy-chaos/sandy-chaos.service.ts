import { prisma } from "../../../lib/prisma";

export class SandyChaosService {
  /**
   * Retrieves the Sandy Chaos cards for a specific deck based on its mode and chaos level.
   * This is now dynamic and doesn't require a junction table.
   */
  static async getDeckChaosCards(deckId: number) {
    const deck = await prisma.gameDeck.findUnique({
      where: { id: deckId },
      include: { gameMode: true },
    });

    if (!deck) throw new Error(`Deck not found for ID: ${deckId}`);

    // Fetch all applicable chaos cards for this mode and chaos level (or lower)
    const applicableCards = await prisma.sandyChaosCard.findMany({
      where: {
        gameModeId: deck.gameModeId,
        chaosLevel: { lte: deck.chaosLevel }
      }
    });

    return applicableCards;
  }
}
