import { NextRequest, NextResponse } from "next/server";
import { GameCardsController } from "@/api/features/game-cards/game-cards.controller";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return GameCardsController.update(req, { params: resolvedParams });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return GameCardsController.delete(req, { params: resolvedParams });
}
