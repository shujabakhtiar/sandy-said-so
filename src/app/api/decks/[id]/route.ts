import { DeckController } from "@/api/features/decks/decks.controller";

/**
 * GET /api/decks/[id]
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return DeckController.getById(id);
}
