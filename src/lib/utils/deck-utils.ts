/**
 * Injects player names into a deck's card text by replacing {player} placeholders.
 * @param deck The template deck object.
 * @param players Array of player names string.
 * @returns A deep copy of the deck with names injected.
 */
export function injectPlayerNames(deck: any, players: string[]) {
  if (!deck || !players || players.length === 0) return deck;

  // Deep clone the deck to avoid mutating the template
  const newDeck = JSON.parse(JSON.stringify(deck));

  newDeck.gameCards = newDeck.gameCards.map((card: any) => {
    let text = card.ruleText;
    
    // Replace all occurrences of {player} with a random player
    // We use a regex with a replacer function to pick a new random player for EACH occurrence
    // This allows a card like "{player} must kiss {player}" to have two different people (statistically)
    text = text.replace(/{player}/g, () => {
      const randomIndex = Math.floor(Math.random() * players.length);
      return players[randomIndex];
    });

    return {
      ...card,
      ruleText: text
    };
  });

  return newDeck;
}
