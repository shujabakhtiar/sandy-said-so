import { prisma } from "../../../lib/prisma";

export class AIGenerationsService {
  static async saveGeneration(data: { deckId: number; prompt: string; model?: string }) {
    return await prisma.aiGeneration.create({
      data: {
        deckId: data.deckId,
        prompt: data.prompt,
        model: data.model,
      },
    });
  }
}
