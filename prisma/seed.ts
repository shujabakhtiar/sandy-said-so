import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DIRECT_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const modes = [
    { id: 1, name: "Sandy's Confession" },
    { id: 2, name: "Pure Provocation" },
    { id: 3, name: "Dimmed Lights" },
  ];

  for (const mode of modes) {
    await prisma.gameMode.upsert({
      where: { id: mode.id },
      update: { name: mode.name },
      create: { id: mode.id, name: mode.name },
    });
  }

  console.log("Seed successful: Game Modes created.");

  const chaosCards = [
    // Mode 2: Pure Provocation
    { gameModeId: 2, chaosLevel: 1, ruleText: "Waterfall! Start drinking and don't stop until the person to your right stops." },
    { gameModeId: 2, chaosLevel: 1, ruleText: "Choose a drinking partner. Whenever you drink, they drink (and vice versa)." },
    { gameModeId: 2, chaosLevel: 2, ruleText: "Sandy says: If I cough, everyone drinks. This rule stays until the next Sandy's Chaos card." },
    { gameModeId: 2, chaosLevel: 2, ruleText: "The Floor is Lava: Last person to touch a wall drinks 2 sips." },
    { gameModeId: 2, chaosLevel: 3, ruleText: "Medusa: On the count of three, everyone looks at someone. If you make eye contact, both drink." },
    { gameModeId: 2, chaosLevel: 3, ruleText: "Question Master: You are now the Question Master. If someone answers your question, they drink. Stays until someone else becomes the Question Master." },
    { gameModeId: 2, chaosLevel: 4, ruleText: "Kings Cup: Everyone contributes a bit of their drink to a central cup. Sandy chooses who drinks it later." },
    { gameModeId: 2, chaosLevel: 5, ruleText: "Total Chaos: Swap drinks with the person to your left. Good luck." },

    // Mode 1: Sandy's Confession
    { gameModeId: 1, chaosLevel: 1, ruleText: "Never Have I Ever: Sandy says: Drink if you've ever lied to someone in this room." },
    { gameModeId: 1, chaosLevel: 2, ruleText: "Truth or Drink: Reveal the last person you texted, or take a shot." },
    { gameModeId: 1, chaosLevel: 3, ruleText: "The Hot Seat: Everyone asks you one question. You must answer or drink for each one you skip." },
    { gameModeId: 1, chaosLevel: 4, ruleText: "Deepest Secret: Tell the group something nobody here knows, or finish your drink." },
    { gameModeId: 1, chaosLevel: 5, ruleText: "Social Sabotage: Give your phone to the person to your right. They get to send one text to anyone in your contacts (Sandy approved)." },

    // Mode 3: The Verdict
    { gameModeId: 3, chaosLevel: 1, ruleText: "Body Shot: Someone chooses where you take a shot from. Consent is mandatory, or take 5 sips." },
    { gameModeId: 3, chaosLevel: 2, ruleText: "Lap Dance: Give a 30-second lap dance to the person of your choice, or finish your drink." },
    { gameModeId: 3, chaosLevel: 3, ruleText: "Seven Minutes in Heaven: You and the person to your left go to another room for 2 minutes. Sandy is watching." },
    { gameModeId: 3, chaosLevel: 4, ruleText: "Strip or Sip: Remove one item of clothing or drink half your glass." },
    { gameModeId: 3, chaosLevel: 5, ruleText: "The Ultimate Dare: Sandy decides... Kiss the person you find most attractive in this room, or finish everyone's drinks." },
  ];

  for (const card of chaosCards) {
    const exists = await prisma.sandyChaosCard.findFirst({
      where: {
        gameModeId: card.gameModeId,
        chaosLevel: card.chaosLevel,
        ruleText: card.ruleText,
      },
    });

    if (!exists) {
      await prisma.sandyChaosCard.create({
        data: card,
      });
    }
  }

  console.log("Seed successful: Sandy Chaos cards created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
