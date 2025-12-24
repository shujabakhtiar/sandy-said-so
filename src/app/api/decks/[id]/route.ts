import { DeckController } from "@/api/features/decks/decks.controller";

/**
 * GET /api/decks/[id]
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return DeckController.getById(id);
}
