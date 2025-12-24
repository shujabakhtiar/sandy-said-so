import { db } from "@/lib/db";
import { CreatePersonDto, UpdatePersonDto } from "./people.types";

export class PeopleService {
  static async createPerson(data: CreatePersonDto) {
    return await db.person.create({
      data: {
        name: data.name,
        note: data.note,
        userId: data.userId,
      },
    });
  }

  static async listPeople(userId: number) {
    return await db.person.findMany({
      where: { userId },
      include: {
        faceMaps: true,
      },
    });
  }

  static async updatePerson(id: number, data: UpdatePersonDto) {
    return await db.person.update({
      where: { id },
      data,
    });
  }

  static async deletePerson(id: number) {
    // Face mapping deletion is handled by Prisma if relations are set up for it, 
    // but we can explicitly delete them if needed. 
    // In our schema, we don't have onDelete: Cascade explicitly in the file I saw, 
    // but usually it's better to be safe.
    await db.facePersonMap.deleteMany({
      where: { personId: id },
    });

    return await db.person.delete({
      where: { id },
    });
  }
}
