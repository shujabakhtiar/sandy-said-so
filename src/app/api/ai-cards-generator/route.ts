import { NextRequest } from "next/server";
import { AICardsGeneratorController } from "@/api/features/ai-cards-generator/ai-cards-generator.controller";

export async function POST(req: NextRequest) {
  return AICardsGeneratorController.generateSuggestions(req);
}
