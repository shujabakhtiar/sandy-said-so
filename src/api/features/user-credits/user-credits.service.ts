import { prisma } from "../../../lib/prisma";

export class UserCreditService {
  /**
   * Gets the credit balance for a user.
   */
  static async getBalance(userId: string, type = "DECK_CREDIT") {
    const credit = await prisma.userCredit.findFirst({
      where: { userId, type },
    });
    return credit?.balance ?? 0;
  }

  /**
   * Adds credits to a user's balance.
   */
  static async addCredits(userId: string, amount: number, type = "DECK_CREDIT") {
    return await prisma.userCredit.upsert({
      where: { 
        // Note: In schema, userId is indexed but not unique with type. 
        // We might want to add a unique constraint in schema later, 
        // but for now we find by userId and type.
        id: (await prisma.userCredit.findFirst({ where: { userId, type } }))?.id ?? -1
      },
      update: {
        balance: { increment: amount },
      },
      create: {
        userId,
        type,
        balance: amount,
      },
    });
  }

  /**
   * Spends credits from a user's balance.
   */
  static async spendCredits(userId: string, amount: number, type = "DECK_CREDIT") {
    const currentBalance = await this.getBalance(userId, type);
    if (currentBalance < amount) {
      throw new Error("Insufficient credits");
    }

    return await prisma.userCredit.updateMany({
      where: { userId, type },
      data: {
        balance: { decrement: amount },
      },
    });
  }
}
