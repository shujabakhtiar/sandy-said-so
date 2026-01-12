import { prisma } from "../../../lib/prisma";

export class UserService {
  static async ensureUserExists(user: { id: string; email: string; name?: string }) {
    // 1. Check if user exists with this ID
    const existingUserById = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (existingUserById) {
      // User exists with correct ID -> just update profile info
      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: user.email,
          ...(user.name ? { name: user.name } : {}),
        },
      });
      return;
    }

    // 2. Check if user exists with this Email (but different ID, since we passed step 1)
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUserByEmail) {
      // User exists with same email but DIFFERENT ID.
      // We need to validly "migrate" the old user to the new ID provided by the current Auth session.
      // Because we set `onUpdate: Cascade` in schema, updating the ID will move all related records.
      await prisma.user.update({
        where: { email: user.email },
        data: {
          id: user.id, // Migrate to new Auth ID
          ...(user.name ? { name: user.name } : {}),
        },
      });
      return;
    }

    // 3. User doesn't exist by ID or Email -> Create new
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }
}
