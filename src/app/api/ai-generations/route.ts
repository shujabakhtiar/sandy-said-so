import { NextRequest } from "next/server";
import { AIGenerationsController } from "@/api/features/ai-generations/ai-generations.controller";

export async function POST(req: NextRequest) {
  return AIGenerationsController.create(req);
}
