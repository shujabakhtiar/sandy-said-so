import { Request, Response } from "express";
import { FacesService } from "./faces.service";

export class FacesController {
  static async create(req: Request, res: Response) {
    try {
      const { photoId, boundingBox, faceEmbedding } = req.body;
      if (!photoId || !boundingBox) {
        return res.status(400).json({ error: "photoId and boundingBox are required" });
      }
      const face = await FacesService.createFace({ 
        photoId: Number(photoId), 
        boundingBox, 
        faceEmbedding 
      });
      res.status(201).json(face);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const photoId = req.query.photoId;
      if (!photoId) {
        return res.status(400).json({ error: "photoId is required" });
      }
      const faces = await FacesService.listFaces(Number(photoId));
      res.json(faces);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
