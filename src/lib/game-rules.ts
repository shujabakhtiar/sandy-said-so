export interface GameRule {
  step: number;
  title: string;
  description: string;
}

export interface GameModeRules {
  [key: string]: {
    description: string;
    rules: GameRule[];
  };
}

export const GAME_MODE_RULES: GameModeRules = {
  "Sandy's Confession": {
    description: "The ultimate ice-breaker where honesty is the only way out. Sandy knows your secrets, and she's not afraid to share.",
    rules: [
      { step: 1, title: "The Setup", description: "Gather your friends in a circle. Ensure everyone has their drink of choice ready." },
      { step: 2, title: "The Reveal", description: "Tap the deck to reveal a confession prompt. These are things Sandy 'heard' about someone in the room." },
      { step: 3, title: "The Accusation", description: "Read the prompt aloud. On the count of three, everyone points to the person they think the prompt fits best." },
      { step: 4, title: "The Penalty", description: "The person with the most fingers pointed at them must take a drink and 'confess' if the prompt is true." }
    ]
  },
  "Pure Provocation": {
    description: "A high-stakes mode designed to push buttons and start friendly fires. Not for the faint of heart.",
    rules: [
      { step: 1, title: "Pick a Target", description: "Each round, the group chooses one person to be the 'Main Subject' before the card is revealed." },
      { step: 2, title: "The Dare", description: "Reveal the card. It will contain a provocative prompt or dare specifically for the subject." },
      { step: 3, title: "Accept or Drink", description: "The subject must either perform the prompt/answer the question or take 3 large gulps of their drink to buy Sandy's silence." },
      { step: 4, title: "The Twist", description: "If the subject completes the dare, they get to pick the next target. If they drink, the group decides." }
    ]
  },
  "Dimmed Lights": {
    description: "The courtroom is in session. Sandy is the judge, and your friends are the jury.",
    rules: [
      { step: 1, title: "The Case", description: "Reveal a card. It presents a hypothetical scenario or a 'Most Likely To' situation." },
      { step: 2, title: "The Debate", description: "The group has 30 seconds to debate who is 'guilty' of the prompt based on past behavior." },
      { step: 3, title: "The Vote", description: "Everyone votes at once. In case of a tie, both 'defendants' drink." },
      { step: 4, title: "The Sentence", description: "The guilty party takes the 'Sandy Sentence'—usually a designated number of sips specified on the card." }
    ]
  },
  "Standard Mode": {
    description: "Classic Sandy. A mix of everything to keep the night moving and the drinks flowing.",
    rules: [
      { step: 1, title: "Tap to Play", description: "Simply tap the deck to reveal your next instruction." },
      { step: 2, title: "Follow Sandy", description: "Read the rule aloud. Sandy's word is law—everyone mentioned in the rule must comply." },
      { step: 3, title: "Drink Up", description: "Most cards involve drinking. If you can't or won't follow the rule, take a double penalty drink." },
      { step: 4, title: "Keep it Going", description: "Pass the phone to the next person and keep the energy high!" }
    ]
  }
};

export const getRulesForMode = (modeName: string) => {
  return GAME_MODE_RULES[modeName] || GAME_MODE_RULES["Standard Mode"];
};
