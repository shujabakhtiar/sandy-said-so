import { NextRequest, NextResponse } from "next/server";
import { GameDecksService } from "./game-decks.service";
import { requireAuth } from "@/api/utils/auth";
import { DeckService } from "../decks/decks.service";

export class GameDecksController {
  static async create(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const { gameModeId, title, notes, useImages, goal, secrets, extra, chaosLevel } = await req.json();
      if (!gameModeId) {
        return NextResponse.json({ error: "gameModeId is required" }, { status: 400 });
      }
      const deck = await GameDecksService.createDeck({ 
        userId: userId, 
        gameModeId: Number(gameModeId), 
        title,
        notes,
        useImages,
        goal,
        secrets,
        extra,
        chaosLevel
      });
      
      // Generate initial cards for the deck
      await DeckService.generateCards(deck.id);

      return NextResponse.json(deck, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const decks = await GameDecksService.listDecks(userId);
      return NextResponse.json(decks);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async save(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
      const deck = await GameDecksService.markDeckAsSaved(Number(id));
      return NextResponse.json(deck);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
