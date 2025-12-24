import { db } from "@/lib/db";

export class PhotosService {
  static async createPhoto(data: { imageUrl: string; userId: number }) {
    return await db.photo.create({
      data: {
        imageUrl: data.imageUrl,
        userId: data.userId,
      },
    });
  }

  static async listPhotos(userId: number) {
    return await db.photo.findMany({
      where: { userId },
      include: {
        faces: true,
      },
    });
  }
}
