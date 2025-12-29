import { prisma } from "../../../lib/prisma";

export class GameModesService {
  static async listModes() {
    return await prisma.gameMode.findMany({
      orderBy: { id: 'asc' }
    });
  }
}
