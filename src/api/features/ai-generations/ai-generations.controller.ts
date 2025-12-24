import { Request, Response } from "express";
import { AIGenerationsService } from "./ai-generations.service";

export class AIGenerationsController {
  static async create(req: Request, res: Response) {
    try {
      const { deckId, prompt, model } = req.body;
      if (!deckId || !prompt) {
        return res.status(400).json({ error: "deckId and prompt are required" });
      }
      const generation = await AIGenerationsService.saveGeneration({ 
        deckId: Number(deckId), 
        prompt, 
        model 
      });
      res.status(201).json(generation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
