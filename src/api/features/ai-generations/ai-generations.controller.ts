import { NextRequest, NextResponse } from "next/server";
import { AIGenerationsService } from "./ai-generations.service";

export class AIGenerationsController {
  static async create(req: NextRequest) {
    try {
      const body = await req.json();
      const { deckId, prompt, model } = body;
      
      if (!deckId || !prompt) {
        return NextResponse.json({ error: "deckId and prompt are required" }, { status: 400 });
      }
      
      const generation = await AIGenerationsService.saveGeneration({ 
        deckId: Number(deckId), 
        prompt, 
        model 
      });
      
      return NextResponse.json(generation, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
