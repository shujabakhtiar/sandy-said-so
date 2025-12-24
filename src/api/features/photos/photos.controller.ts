import { Request, Response } from "express";
import { PhotosService } from "./photos.service";

export class PhotosController {
  static async create(req: Request, res: Response) {
    try {
      const { imageUrl, userId } = req.body;
      if (!imageUrl || !userId) {
        return res.status(400).json({ error: "imageUrl and userId are required" });
      }
      const photo = await PhotosService.createPhoto({ imageUrl, userId: Number(userId) });
      res.status(201).json(photo);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const photos = await PhotosService.listPhotos(Number(userId));
      res.json(photos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
