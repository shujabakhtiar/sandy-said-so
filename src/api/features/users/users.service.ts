import { prisma } from "../../../lib/prisma";

export class UserService {
  static async ensureUserExists(user: { id: string; email: string; name?: string }) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email, // Keep email in sync
        ...(user.name ? { name: user.name } : {}), // Update name if provided
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }
}
