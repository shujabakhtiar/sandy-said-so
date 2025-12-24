import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const modes = [
    { id: 1, name: "Sandy's Confession" },
    { id: 2, name: "Pure Provocation" },
    { id: 3, name: "The Verdict" },
  ];

  for (const mode of modes) {
    await prisma.gameMode.upsert({
      where: { id: mode.id },
      update: { name: mode.name },
      create: { id: mode.id, name: mode.name },
    });
  }

  console.log("Game modes updated successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
