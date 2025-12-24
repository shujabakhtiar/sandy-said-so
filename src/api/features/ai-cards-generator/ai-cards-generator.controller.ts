import { NextRequest, NextResponse } from "next/server";
import { AICardsGeneratorService } from "./ai-cards-generator.service";

export class AICardsGeneratorController {
  static async generate(req: NextRequest) {
    try {
      const body = await req.json();
      const { deckId } = body;

      if (!deckId) {
        return NextResponse.json({ error: "deckId is required" }, { status: 400 });
      }

      const cards = await AICardsGeneratorService.generateCards(Number(deckId));
      
      return NextResponse.json({ 
        success: true, 
        message: `${cards.length} cards generated successfully`,
        cards 
      }, { status: 201 });
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
