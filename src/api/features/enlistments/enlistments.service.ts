import { prisma } from "../../../lib/prisma";

export class EnlistmentsService {
  static async enlist(email: string, name: string | null) {
    return await prisma.enlistment.create({
      data: {
        email,
        name,
      },
    });
  }

  static async list(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [total, data] = await prisma.$transaction([
      prisma.enlistment.count(),
      prisma.enlistment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
