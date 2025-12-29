import { NextRequest, NextResponse } from "next/server";
import { GameModesService } from "./game-modes.service";

export class GameModesController {
  static async list(req: NextRequest) {
    try {
      const modes = await GameModesService.listModes();
      return NextResponse.json(modes);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
