import { prisma } from "../../../lib/prisma";

export class FacesService {
  static async createFace(data: { photoId: number; boundingBox: any; faceEmbedding?: string }) {
    return await prisma.face.create({
      data: {
        photoId: data.photoId,
        boundingBox: data.boundingBox,
        faceEmbedding: data.faceEmbedding,
      },
    });
  }

  static async listFaces(photoId: number) {
    return await prisma.face.findMany({
      where: { photoId },
      include: {
        facePersonMaps: {
          include: {
            person: true,
          },
        },
      },
    });
  }
}
