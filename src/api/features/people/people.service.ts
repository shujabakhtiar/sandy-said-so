import { prisma } from "../../../lib/prisma";
import { CreatePersonDto, UpdatePersonDto } from "./people.types";

export class PeopleService {
  static async createPerson(data: CreatePersonDto) {
    return await prisma.person.create({
      data: {
        name: data.name,
        note: data.note,
        userId: data.userId,
      },
    });
  }

  static async listPeople(userId: number) {
    return await prisma.person.findMany({
      where: { userId },
      include: {
        facePersonMaps: true,
      },
    });
  }

  static async updatePerson(id: number, data: UpdatePersonDto) {
    return await prisma.person.update({
      where: { id },
      data,
    });
  }

  static async deletePerson(id: number) {
    // Face mapping deletion is handled by Prisma if relations are set up for it, 
    // but we can explicitly delete them if needed. 
    // In our schema, we don't have onDelete: Cascade explicitly in the file I saw, 
    // but usually it's better to be safe.
    await prisma.facePersonMap.deleteMany({
      where: { personId: id },
    });

    return await prisma.person.delete({
      where: { id },
    });
  }
}
