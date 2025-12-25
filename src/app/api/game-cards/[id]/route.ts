import { NextRequest, NextResponse } from "next/server";
import { GameCardsController } from "@/api/features/game-cards/game-cards.controller";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return GameCardsController.update(req, { params });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  return GameCardsController.delete(req, { params });
}
