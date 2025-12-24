import { Request, Response } from "express";
import { GameCardsService } from "./game-cards.service";

export class GameCardsController {
  static async create(req: Request, res: Response) {
    try {
      const { deckId, ruleText, photoId, orderIndex } = req.body;
      if (!deckId || !ruleText || orderIndex === undefined) {
        return res.status(400).json({ error: "deckId, ruleText, and orderIndex are required" });
      }
      const card = await GameCardsService.addCard({ 
        deckId: Number(deckId), 
        ruleText, 
        photoId: photoId ? Number(photoId) : undefined, 
        orderIndex: Number(orderIndex) 
      });
      res.status(201).json(card);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const deckId = req.query.deckId;
      if (!deckId) {
        return res.status(400).json({ error: "deckId is required" });
      }
      const cards = await GameCardsService.listCards(Number(deckId));
      res.json(cards);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
