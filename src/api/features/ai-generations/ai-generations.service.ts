import { db } from "@/lib/db";

export class AIGenerationsService {
  static async saveGeneration(data: { deckId: number; prompt: string; model?: string }) {
    return await db.aIGeneration.create({
      data: {
        deckId: data.deckId,
        prompt: data.prompt,
        model: data.model,
      },
    });
  }
}
