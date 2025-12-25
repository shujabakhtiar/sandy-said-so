import { NextRequest, NextResponse } from "next/server";
import { GameDecksService } from "@/api/features/game-decks/game-decks.service";
import { requireAuth } from "@/api/utils/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAuth();
    const { id } = await params;
    const deck = await GameDecksService.getDeckWithCards(Number(id));
    
    if (!deck) {
      return NextResponse.json({ error: "Deck not found" }, { status: 404 });
    }

    return NextResponse.json(deck);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { GameDecksController } = await import("@/api/features/game-decks/game-decks.controller");
  return GameDecksController.update(req, { params });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { GameDecksController } = await import("@/api/features/game-decks/game-decks.controller");
  return GameDecksController.delete(req, { params });
}
