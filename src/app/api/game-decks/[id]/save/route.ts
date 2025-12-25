import { NextRequest } from "next/server";
import { GameDecksController } from "@/api/features/game-decks/game-decks.controller";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return GameDecksController.save(req, { params });
}
