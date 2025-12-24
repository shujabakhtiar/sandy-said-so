import { prisma } from "../../../lib/prisma";

export class FaceMappingsService {
  static async mapFaceToPerson(data: { faceId: number; personId: number }) {
    return await prisma.facePersonMap.create({
      data: {
        faceId: data.faceId,
        personId: data.personId,
      },
    });
  }

  static async removeMapping(id: number) {
    return await prisma.facePersonMap.delete({
      where: { id },
    });
  }
}
