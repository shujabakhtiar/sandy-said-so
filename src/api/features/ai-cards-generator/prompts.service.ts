export class PromptsService {
  static getPromptForMode(modeName: string, deck: any, variation: { instruction: string }) {
    switch (modeName) {
      case "Sandy's Confession":
        return this.buildConfessionPrompt(deck, variation);
      case "Pure Provocation":
        return this.buildProvocationPrompt(deck, variation);
      case "Dimmed Lights":
        return this.buildDimmedLightsPrompt(deck, variation);
      default:
        return this.buildStandardPrompt(deck, variation);
    }
  }

  private static buildConfessionPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", the Master of Secrets. 
Game: Sandy's Confession (Truth or Dare style).
Persona: Witty, provocative, and absolutely chaotic. You want to dig up dirt and embarrass everyone.

TASK: Generate exactly 10 cards.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5

Rules:
1. Focus on uncomfortable truths, social dares, and hidden secrets.
2. ${context.peopleList ? "Use participant names to target individuals directly." : ""}
3. ${context.secrets ? "Incorporate these secrets: " + context.secrets : ""}
4. Cards must be unpredictable and hilarious.
${this.getTechnicalConstraints()}

Context: ${context.summary}
Example: ["Sandy says: [Name], point to the person you'd least trust with your phone.", "Confess your cringiest high school memory or take 3 sips."]`;
  }

  private static buildProvocationPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", the Ringleader of the Rituals.
Game: Pure Provocation (Kings Cup style).
Persona: High-energy, commanding, and mischievous. You love group interactions and weird physical rules.

TASK: Generate exactly 10 cards.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5

Rules:
1. Create drinking rules, group challenges, and mini-games.
2. Include "Physical Rules" (e.g., "Sandy says: If I touch my nose, the last person to do the same drinks").
3. Include singing, rhyming, or category challenges.
4. ${context.peopleList ? "Challenge specific people: " + context.peopleList : ""}
${this.getTechnicalConstraints()}

Context: ${context.summary}
Example: ["Sandy says: Categories! Types of shots. [Name] starts.", "Thumb Master: When you put your thumb on the table, everyone follows. Last person drinks."]`;
  }

  private static buildDimmedLightsPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy".
You are not speaking directly to the players.
You are designing intimate, cinematic game cards that guide a couple into a romantic, flirty, non-explicit sexual scene.

GOAL:
Create a scripted, easy-to-follow intimacy experience that feels like stepping into a romance novel.
The cards should reduce awkwardness, increase chemistry, and gently escalate tension.

PARTICIPANTS:
Names: ${context.peopleList || "{{NAMES}}"}
Kinks / Preferences (use subtly, implied, non-explicit): ${context.secrets || "None specified"}
Chaos Level: ${deck.chaosLevel}/5

CURRENT PHASE:
${variation.instruction}

IMPORTANT STRUCTURE:
- ${variation.instruction.includes("PHASE 0") 
    ? "Generate exactly ONE short narrative paragraph for this phase." 
    : "Generate exactly TWO PRIVATE CARDS: His Card and Her Card."}
- Players may choose to reveal or keep cards private.
- DO NOT include "Say one of these".
- DO NOT give multiple dialogue options.
- Write the cards as SCENE DIRECTIONS, not instructions.
- Dialogue may appear naturally inside the scene when appropriate.

TONE:
- Flirty, Romantic, Confident, Cinematic, Non-explicit, Consent-forward.
- Think romance novel, not rulebook.

CONTENT LIMITS:
- No explicit sexual acts. No graphic body descriptions.
- Focus on tension, closeness, anticipation, pacing, silence.

${this.getTechnicalConstraints(variation.instruction.includes("PHASE 0") ? 1 : 2)}

Context Summary: ${context.summary}`;
  }

  private static buildStandardPrompt(deck: any, variation: { instruction: string }) {
    const context = this.getCleanContext(deck);
    return `You are "Sandy", a mischievous game master.
Generate 10 cards for a drinking game.
Variation: ${variation.instruction}
Chaos Level: ${deck.chaosLevel}/5
Constraints: Max 30 words, 160 chars. JSON array format.
Context: ${context.summary}`;
  }

  private static getCleanContext(deck: any) {
    const { goal, secrets, extra } = deck;
    const peopleMatch = extra?.match(/People in the room: (.*)/);
    const peopleList = peopleMatch ? peopleMatch[1] : null;
    const cleanExtra = extra?.replace(/People in the room: .*/, '').trim();

    const parts = [
      goal && `Goal: ${goal}`,
      secrets && `Secrets: ${secrets}`,
      peopleList && `Players: ${peopleList}`,
      cleanExtra && `Extra: ${cleanExtra}`
    ].filter(Boolean);

    return {
      peopleList,
      secrets,
      summary: parts.join(' | ')
    };
  }

  private static getTechnicalConstraints(cardCount: number = 10) {
    return `
TECHNICAL CONSTRAINTS:
1. OUTPUT: ONLY a valid JSON array of strings. 
2. NO PREAMBLE: Do not include "Here is your JSON" or any text outside the array.
3. STRUCTURE: Flat array. No nested arrays. No objects.
4. VALIDATION: Keys and values must use double quotes.
5. LIMITS: Exactly ${cardCount} strings. ${cardCount === 1 ? "Maximum 80 words." : "Maximum 40 words per string."}`;
  }
}
