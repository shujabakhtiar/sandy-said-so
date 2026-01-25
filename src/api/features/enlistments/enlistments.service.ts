import { prisma } from "../../../lib/prisma";

export class EnlistmentsService {
  static async enlist(email: string, name: string | null) {
    // Check if duplicate email? The schema has @unique, so it will throw error.
    // We can just try create.
    return await prisma.enlistment.create({
      data: {
        email,
        name,
      },
    });
  }

  static async list() {
    return await prisma.enlistment.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
