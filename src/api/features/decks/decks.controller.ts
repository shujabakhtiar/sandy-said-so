import { NextResponse } from "next/server";
import { DeckService } from "./decks.service";
import { CreateDeckSchema } from "./decks.schema";
import { requireAuth } from "@/api/utils/auth";

export class DeckController {
  static async create(req: Request) {
    try {
      const userId = await requireAuth();
      const body = await req.json();
      const validatedData = CreateDeckSchema.parse(body);

      const deck = await DeckService.createDeck({
        title: validatedData.name,
        gameModeId: 1, // Placeholder
        userId: userId,
      });
      await DeckService.generateCards(deck.id);

      return NextResponse.json({ 
        success: true, 
        deckId: deck.id,
        message: "Deck created and rules generated successfully." 
      }, { status: 201 });
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }
      if (error.name === "ZodError") {
        return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: error.message || "Internal Server Error" }, { status: 500 });
    }
  }

  static async getById(id: string) {
    try {
      const deck = await DeckService.getDeck(id);
      if (!deck) {
        return NextResponse.json({ success: false, message: "Deck not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, deck });
    } catch (error) {
      return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
  }
}
