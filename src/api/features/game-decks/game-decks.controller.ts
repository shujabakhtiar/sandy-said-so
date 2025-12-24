import { Request, Response } from "express";
import { GameDecksService } from "./game-decks.service";

export class GameDecksController {
  static async create(req: Request, res: Response) {
    try {
      const { userId, gameModeId, title } = req.body;
      if (!userId || !gameModeId) {
        return res.status(400).json({ error: "userId and gameModeId are required" });
      }
      const deck = await GameDecksService.createDeck({ 
        userId: Number(userId), 
        gameModeId: Number(gameModeId), 
        title 
      });
      res.status(201).json(deck);
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
      const decks = await GameDecksService.listDecks(Number(userId));
      res.json(decks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deck = await GameDecksService.markDeckAsSaved(Number(id));
      res.json(deck);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
