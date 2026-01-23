import { prisma } from "../../../lib/prisma";
import { SubscriptionStatus } from "@prisma/client";

export class SubscriptionService {
  /**
   * Checks if a user has an active subscription.
   */
  static async getUserSubscription(userId: string) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: SubscriptionStatus.ACTIVE,
        endDate: {
          gt: new Date(),
        },
      },
      orderBy: {
        endDate: "desc",
      },
    });

    return subscription;
  }

  /**
   * Creates a new subscription.
   */
  static async createSubscription(data: {
    userId: string;
    orderId: number;
    durationDays: number;
  }) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + data.durationDays);

    return await prisma.subscription.create({
      data: {
        userId: data.userId,
        orderId: data.orderId,
        startDate,
        endDate,
        status: SubscriptionStatus.ACTIVE,
      },
    });
  }

  /**
   * Cancels/Ends a subscription.
   */
  static async cancelSubscription(id: number) {
    return await prisma.subscription.update({
      where: { id },
      data: {
        status: SubscriptionStatus.CANCELED,
      },
    });
  }
}
