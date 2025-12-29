import { NextRequest, NextResponse } from "next/server";
import { AICardsGeneratorService } from "./ai-cards-generator.service";

export class AICardsGeneratorController {
  static async generateSuggestions(req: NextRequest) {
    try {
      const body = await req.json();
      const { deckId } = body;

      if (!deckId) {
        return NextResponse.json({ error: "deckId is required" }, { status: 400 });
      }

      const suggestions = await AICardsGeneratorService.generateDeckSuggestions(Number(deckId));
      
      return NextResponse.json({ 
        success: true, 
        suggestions 
      }, { status: 200 });
    } catch (error: any) {
      console.error("AI Suggestions Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
