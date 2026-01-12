import { prisma } from "../../../lib/prisma";

export class PhotosService {
  static async createPhoto(data: { imageUrl: string; userId: string }) {
    return await prisma.photo.create({
      data: {
        imageUrl: data.imageUrl,
        userId: data.userId,
      },
    });
  }

  static async listPhotos(userId: string) {
    return await prisma.photo.findMany({
      where: { userId },
      include: {
        faces: true,
      },
    });
  }
}
