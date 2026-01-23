import { prisma } from "../../../lib/prisma";

export class OrderService {
  /**
   * Places an order for a physical deck.
   */
  static async placeOrder(data: {
    deckId?: number;
    customerEmail?: string;
    address?: string;
    productId?: number;
    gameModeId?: number;
    amount?: number;
    currency?: string;
  }) {
    // 1. Verify deck exists if provided
    if (data.deckId) {
      const deck = await prisma.gameDeck.findUnique({
        where: { id: data.deckId },
      });
      if (!deck) throw new Error("Deck not found");
    }

    // 2. Create Order
    const order = await prisma.order.create({
      data: {
        deckId: data.deckId,
        customerEmail: data.customerEmail,
        address: data.address,
        status: "PENDING",
      },
    });

    return order;
  }

  /**
   * Fetches order history for an email.
   */
  static async getOrdersByEmail(email: string) {
    return await prisma.order.findMany({
      where: { customerEmail: email },
      include: {
        items: {
          include: {
            deck: true
          }
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
