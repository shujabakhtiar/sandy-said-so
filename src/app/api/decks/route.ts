import { DeckController } from "@/api/features/decks/decks.controller";

/**
 * POST /api/decks
 */
export async function POST(req: Request) {
  return DeckController.create(req);
}
