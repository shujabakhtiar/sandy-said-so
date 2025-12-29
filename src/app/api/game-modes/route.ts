import { NextRequest } from "next/server";
import { GameModesController } from "@/api/features/game-modes/game-modes.controller";

export async function GET(req: NextRequest) {
  return GameModesController.list(req);
}
