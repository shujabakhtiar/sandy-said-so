import { db } from "@/lib/db";

export class OrderService {
  /**
   * Places an order for a physical deck.
   */
  static async placeOrder(data: {
    deckId: string;
    customerEmail: string;
    address: string;
  }) {
    // 1. Verify deck exists and is ready
    const deck = await db.deck.findUnique({
      where: { id: data.deckId },
    });

    if (!deck) throw new Error("Deck not found");

    // 2. Create Order
    const order = await db.order.create({
      data: {
        deckId: data.deckId,
        customerEmail: data.customerEmail,
        address: data.address,
        status: "PENDING",
      },
    });

    // 3. Update Deck Status
    await db.deck.update({
      where: { id: data.deckId },
      data: { status: "ORDERED" },
    });

    return order;
  }

  /**
   * Fetches order history for an email (simplified for demo).
   */
  static async getOrdersByEmail(email: string) {
    return await db.order.findMany({
      where: { customerEmail: email },
      include: {
        deck: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
