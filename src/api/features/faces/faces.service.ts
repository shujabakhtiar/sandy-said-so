import { db } from "@/lib/db";

export class FacesService {
  static async createFace(data: { photoId: number; boundingBox: any; faceEmbedding?: string }) {
    return await db.face.create({
      data: {
        photoId: data.photoId,
        boundingBox: data.boundingBox,
        faceEmbedding: data.faceEmbedding,
      },
    });
  }

  static async listFaces(photoId: number) {
    return await db.face.findMany({
      where: { photoId },
      include: {
        personMaps: {
          include: {
            person: true,
          },
        },
      },
    });
  }
}
