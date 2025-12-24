import { NextRequest } from "next/server";
import { GameCardsController } from "@/api/features/game-cards/game-cards.controller";

export async function POST(req: NextRequest) {
  return GameCardsController.bulkCreate(req);
}
