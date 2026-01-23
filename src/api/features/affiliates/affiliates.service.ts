import { prisma } from "../../../lib/prisma";

export class AffiliateService {
  /**
   * Validates if an affiliate code exists.
   */
  static async validateCode(code: string) {
    const affiliate = await prisma.affiliate.findUnique({
      where: { code },
    });
    return affiliate;
  }

  /**
   * Tracks earnings for an affiliate based on an order.
   */
  static async trackEarning(orderId: number, affiliateCode: string, amount: number) {
    const affiliate = await this.validateCode(affiliateCode);
    if (!affiliate) return null;

    return await prisma.affiliateEarning.create({
      data: {
        orderId,
        affiliateId: affiliate.id,
        amount,
        status: "PENDING",
      },
    });
  }

  /**
   * Gets earnings for a user.
   */
  static async getEarnings(userId: string) {
    return await prisma.affiliateEarning.findMany({
      where: {
        affiliate: {
          userId,
        },
      },
      include: {
        order: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
