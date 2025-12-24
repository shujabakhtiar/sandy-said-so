import { NextRequest, NextResponse } from "next/server";
import { GameCardsService } from "./game-cards.service";

export class GameCardsController {
  static async create(req: NextRequest) {
    try {
      const { deckId, ruleText, photoId, orderIndex } = await req.json();
      if (!deckId || !ruleText || orderIndex === undefined) {
        return NextResponse.json({ error: "deckId, ruleText, and orderIndex are required" }, { status: 400 });
      }
      const card = await GameCardsService.addCard({ 
        deckId: Number(deckId), 
        ruleText, 
        photoId: photoId ? Number(photoId) : undefined, 
        orderIndex: Number(orderIndex) 
      });
      return NextResponse.json(card, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async list(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const deckId = searchParams.get("deckId");
      if (!deckId) {
        return NextResponse.json({ error: "deckId is required" }, { status: 400 });
      }
      const cards = await GameCardsService.listCards(Number(deckId));
      return NextResponse.json(cards);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  static async bulkCreate(req: NextRequest) {
    try {
      const { deckId, cards } = await req.json();
      if (!deckId || !cards || !Array.isArray(cards)) {
        return NextResponse.json({ error: "deckId and cards array are required" }, { status: 400 });
      }
      
      const result = await GameCardsService.bulkAddCards(Number(deckId), cards);
      return NextResponse.json({ 
        success: true, 
        message: `${result.count} cards created successfully` 
      }, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
