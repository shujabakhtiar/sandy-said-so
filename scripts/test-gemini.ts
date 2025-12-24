import { prisma } from '../src/lib/prisma';
import { AICardsGeneratorService } from '../src/api/features/ai-cards-generator/ai-cards-generator.service';

async function main() {
  console.log('Starting Gemini test with new @google/genai package...');
  const key = process.env.GOOGLE_AI_API_KEY;
  console.log(`API Key present: ${!!key}, Starts with: ${key ? key.substring(0, 4) : 'N/A'}`);
  
  // 1. Get or create a User
  let user = await prisma.user.findFirst();
  if (!user) {
    console.log('No User found, creating one...');
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'hashedpassword',
        name: 'Test User',
      },
    });
  }
  console.log(`Using User: ${user.email} (${user.id})`);

  // 2. Get or create a GameMode
  let mode = await prisma.gameMode.findFirst();
  if (!mode) {
    console.log('No GameMode found, creating one...');
    try {
        mode = await prisma.gameMode.create({
        data: {
            name: 'Test Mode',
        },
        });
    } catch (e) {
        console.error("Error creating mode. Assuming name unique constraint.", e);
        mode = await prisma.gameMode.findFirst();
    }
  }

  if (!mode) {
      console.error("Could not find or create a GameMode.");
      return;
  }
  console.log(`Using GameMode: ${mode.name} (${mode.id})`);

  // 3. Get or create a GameDeck
  let deck = await prisma.gameDeck.findFirst({
    where: { 
        gameModeId: mode.id,
        userId: user.id 
    }
  });
  
  if (!deck) {
    console.log('No GameDeck found, creating one...');
    deck = await prisma.gameDeck.create({
      data: {
        userId: user.id,
        gameModeId: mode.id,
        title: 'Test Deck',
        chaosLevel: 3,
        goal: 'Testing Gemini with new API',
        secrets: 'We love AI',
        extra: 'Be creative and funny',
      },
    });
  }
  console.log(`Using GameDeck: ${deck.title || 'Untitled'} (${deck.id})`);

  // 4. Call the generator service
  console.log('Calling generateCards with new @google/genai...');
  try {
    const cards = await AICardsGeneratorService.generateCards(deck.id);
    console.log(`\n✅ Success! Generated ${cards.length} cards:\n`);
    cards.forEach((c, i) => console.log(`${i+1}. ${c.ruleText}`));
  } catch (error) {
    console.error('❌ Error generating cards:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
