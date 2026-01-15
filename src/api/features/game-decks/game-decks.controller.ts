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
      
      // We will generate cards via the AI service separately
      // await DeckService.generateCards(deck.id);


      return NextResponse.json(deck, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const userId = await requireAuth();
      const { searchParams } = new URL(req.url);
      const gameModeId = searchParams.get("gameModeId");
      
      const page = Number(searchParams.get("page")) || 1;
      const limit = Number(searchParams.get("limit")) || 10;
      
      const result = await GameDecksService.listDecks(
        userId, 
        gameModeId ? Number(gameModeId) : undefined,
        page,
        limit
      );
      return NextResponse.json(result);
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
  static async update(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const userId = await requireAuth();
      const { id } = await params;
      const { title } = await req.json();
      
      const deck = await GameDecksService.updateDeck(Number(id), { title });
      return NextResponse.json(deck);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async delete(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const userId = await requireAuth();
      const { id } = await params;
      
      await GameDecksService.deleteDeck(Number(id));
      return NextResponse.json({ success: true });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
