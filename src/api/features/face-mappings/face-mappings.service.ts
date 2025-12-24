import { db } from "@/lib/db";

export class FaceMappingsService {
  static async mapFaceToPerson(data: { faceId: number; personId: number }) {
    return await db.facePersonMap.create({
      data: {
        faceId: data.faceId,
        personId: data.personId,
      },
    });
  }

  static async removeMapping(id: number) {
    return await db.facePersonMap.delete({
      where: { id },
    });
  }
}
