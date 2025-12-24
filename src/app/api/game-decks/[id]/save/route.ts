import { NextRequest } from "next/server";
import { GameDecksController } from "@/api/features/game-decks/game-decks.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return GameDecksController.save(req, { params: resolvedParams });
}
