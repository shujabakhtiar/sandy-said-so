import { db } from "@/lib/db";

export class DeckService {
  /**
   * Creates a new game deck with associated persons and their photos.
   */
  static async createDeck(data: {
    name?: string;
    gameMode: string;
    persons: { name: string; photos: string[] }[];
  }) {
    return await db.deck.create({
      data: {
        name: data.name,
        gameMode: data.gameMode,
        status: "READY",
        persons: {
          create: data.persons.map((p) => ({
            name: p.name,
            photos: {
              create: p.photos.map((url) => ({ url })),
            },
          })),
        },
      },
      include: {
        persons: {
          include: {
            photos: true,
          },
        },
      },
    });
  }

  /**
   * Fetches a deck by ID with all associations.
   */
  static async getDeck(id: string) {
    return await db.deck.findUnique({
      where: { id },
      include: {
        persons: {
          include: {
            photos: true,
          },
        },
        cards: true,
      },
    });
  }

  /**
   * Generates rules (cards) for a deck based on the game mode and persons.
   * This is where the 'Logic Engine' would reside.
   */
  static async generateCards(deckId: string) {
    const deck = await db.deck.findUnique({
      where: { id: deckId },
      include: { persons: true },
    });

    if (!deck) throw new Error("Deck not found");

    // Example logic for rule generation
    const ruleTemplates = [
      "Drink if you are {name}.",
      "{name} must do a truth or dare.",
      "Waterfall starts with {name}.",
    ];

    const cards = deck.persons.map((person: { id: string; name: string }) => {
      const template = ruleTemplates[Math.floor(Math.random() * ruleTemplates.length)];
      return {
        text: template.replace("{name}", person.name),
        type: "RULE",
        deckId: deck.id,
        personId: person.id,
      };
    });

    return await db.card.createMany({
      data: cards,
    });
  }
}
