import { prisma } from "../../../lib/prisma";

export class PhotosService {
  static async createPhoto(data: { imageUrl: string; userId: number }) {
    return await prisma.photo.create({
      data: {
        imageUrl: data.imageUrl,
        userId: data.userId,
      },
    });
  }

  static async listPhotos(userId: number) {
    return await prisma.photo.findMany({
      where: { userId },
      include: {
        faces: true,
      },
    });
  }
}
