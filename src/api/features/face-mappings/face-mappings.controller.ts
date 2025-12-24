import { Request, Response } from "express";
import { FaceMappingsService } from "./face-mappings.service";

export class FaceMappingsController {
  static async create(req: Request, res: Response) {
    try {
      const { faceId, personId } = req.body;
      if (!faceId || !personId) {
        return res.status(400).json({ error: "faceId and personId are required" });
      }
      const mapping = await FaceMappingsService.mapFaceToPerson({ 
        faceId: Number(faceId), 
        personId: Number(personId) 
      });
      res.status(201).json(mapping);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await FaceMappingsService.removeMapping(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
