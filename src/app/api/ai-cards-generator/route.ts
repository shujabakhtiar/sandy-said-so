import { NextRequest } from "next/server";
import { AICardsGeneratorController } from "@/api/features/ai-cards-generator/ai-cards-generator.controller";

export async function POST(req: NextRequest) {
  // Clone the request to read the body
  const clonedReq = req.clone();
  const body = await clonedReq.json();
  
  // Check if this is a suggestions request
  if (body.action === 'suggestions') {
    return AICardsGeneratorController.generateSuggestions(req);
  }
  
  // Default to generate
  return AICardsGeneratorController.generate(req);
}
