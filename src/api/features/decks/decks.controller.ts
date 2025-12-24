import { NextResponse } from "next/server";
import { DeckService } from "./decks.service";
import { CreateDeckSchema } from "./decks.schema";

export class DeckController {
  static async create(req: Request) {
    try {
      const body = await req.json();
      const validatedData = CreateDeckSchema.parse(body);

      const deck = await DeckService.createDeck(validatedData);
      await DeckService.generateCards(deck.id);

      return NextResponse.json({ 
        success: true, 
        deckId: deck.id,
        message: "Deck created and rules generated successfully." 
      }, { status: 201 });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
      }
      return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
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
