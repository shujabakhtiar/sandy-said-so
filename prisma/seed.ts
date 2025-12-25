import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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

  console.log("Seed successful: Game Modes created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
