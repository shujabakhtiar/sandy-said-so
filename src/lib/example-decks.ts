export const EXAMPLE_DECKS = [
  {
    id: 101,
    title: "Alex's Skeletons",
    gameMode: { name: "Sandy's Confession" },
    gameCards: [
      { id: 1, ruleText: "Jordan must reveal the last person they stalked on Instagram or take 2 drinks.", orderIndex: 0 },
      { id: 2, ruleText: "Alex, what's a secret you haven't told Sam yet? Spill or finish your drink.", orderIndex: 1 },
      { id: 3, ruleText: "Taylor, who in this group is most likely to end up in jail? Everyone else drinks.", orderIndex: 2 },
      { id: 4, ruleText: "Truth: Sam, what's the most embarrassing thing you've done for a crush?", orderIndex: 3 },
      { id: 5, ruleText: "Dare: Jordan, let Taylor send a text to anyone in your contacts.", orderIndex: 4 },
    ]
  },
  {
    id: 102,
    title: "The Chaos Crew",
    gameMode: { name: "Pure Provocation" },
    gameCards: [
      { id: 6, ruleText: "Everyone who has ever lied to Jordan, take a shot.", orderIndex: 0 },
      { id: 7, ruleText: "Sam, nominate someone to drink every time you laugh for the next 5 minutes.", orderIndex: 1 },
      { id: 8, ruleText: "Taylor and Alex are now drink-buddies. What happens to one, happens to both.", orderIndex: 2 },
      { id: 9, ruleText: "Whoever is wearing the most black must drink until they are told to stop.", orderIndex: 3 },
      { id: 10, ruleText: "Rhyme Time: Taylor starts with a word. Go around. First to fail drinks.", orderIndex: 4 },
    ]
  },
  {
    id: 103,
    title: "Spicy Night Out",
    gameMode: { name: "Dimmed Lights" },
    gameCards: [
      { id: 11, cardType: "PHASE_0", ruleText: "Sandy senses the electricity in the room. This isn't just another night out. It's a collision waiting to happen.", orderIndex: 0 },
      { id: 12, cardType: "PHASE_1", targetPerson: "Him", ruleText: "Taylor, point to the person you'd most want to be stranded on an island with.", orderIndex: 1 },
      { id: 13, cardType: "PHASE_1", targetPerson: "Her", ruleText: "Alex and Sam, exchange a piece of clothing or finish your drinks.", orderIndex: 2 },
      { id: 14, cardType: "PHASE_2", targetPerson: "Him", ruleText: "Jordan, rate everyone's kissing potential on a scale of 1-10.", orderIndex: 3 },
      { id: 15, cardType: "PHASE_2", targetPerson: "Her", ruleText: "Whoever has the best 'moves' must demonstrate them now for 30 seconds.", orderIndex: 4 },
      { id: 16, cardType: "PHASE_3", targetPerson: "Him", ruleText: "Sandy says: Sam and Taylor must hold hands until someone takes a drink.", orderIndex: 5 },
    ]
  }
];
