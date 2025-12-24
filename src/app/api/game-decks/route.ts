import { NextRequest } from "next/server";
import { GameDecksController } from "@/api/features/game-decks/game-decks.controller";

export async function POST(req: NextRequest) {
  return GameDecksController.create(req);
}

export async function GET(req: NextRequest) {
  return GameDecksController.list(req);
}
