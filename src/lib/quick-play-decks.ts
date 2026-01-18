export const QUICK_PLAY_DECKS = [
  {
    id: 1, // Matches Sandy's Confession ID
    title: "Sandy's Confession",
    gameMode: { name: "Sandy's Confession" },
    gameCards: [
      { id: 1, ruleText: "{player}, what is the pettiest thing you've ever done to someone in this room?", orderIndex: 0 },
      { id: 2, ruleText: "Take a drink if you've ever stalked {player}'s location.", orderIndex: 1 },
      { id: 3, ruleText: "{player}, who in this room would you trust least with your unlocked phone?", orderIndex: 2 },
      { id: 4, ruleText: "Everyone vote: Who is the worst texter? They must drink.", orderIndex: 3 },
      { id: 5, ruleText: "{player}, show the last photo in your camera roll or finish your drink.", orderIndex: 4 },
      { id: 6, ruleText: "{player}, what is a secret you know about {player} that they don't know you know?", orderIndex: 5 },
      { id: 7, ruleText: "If you've ever had a crush on {player}, take a drink. Don't reveal who.", orderIndex: 6 },
    ]
  },
  {
    id: 2, // Matches Pure Provocation ID
    title: "Pure Provocation",
    gameMode: { name: "Pure Provocation" },
    gameCards: [
      { id: 1, ruleText: "{player} is the King. They can make up a rule that lasts for 3 rounds.", orderIndex: 0 },
      { id: 2, ruleText: "{player}, choose a drinking buddy. They drink when you drink.", orderIndex: 1 },
      { id: 3, ruleText: "Everyone touch the floor. Last person drinks.", orderIndex: 2 },
      { id: 4, ruleText: "{player}, start a rhyme. Going clockwise, whoever messes up drinks.", orderIndex: 3 },
      { id: 5, ruleText: "Categories: {player} chooses a category. First to hesitate drinks.", orderIndex: 4 },
      { id: 6, ruleText: "{player} must speak in an accent for the next round or finish their drink.", orderIndex: 5 },
      { id: 7, ruleText: "Waterfall! {player} starts.", orderIndex: 6 },
    ]
  },
  {
    id: 3, // Matches The Verdict ID
    title: "The Verdict",
    gameMode: { name: "The Verdict" },
    gameCards: [
      { id: 1, ruleText: "{player}, send a risky text to the third person in your recent contacts.", orderIndex: 0 },
      { id: 2, ruleText: "Two Truths and a Lie: {player} goes first. Group votes. Losers drink.", orderIndex: 1 },
      { id: 3, ruleText: "{player}, choose someone to give you a lap dance for 10 seconds.", orderIndex: 2 },
      { id: 4, ruleText: "Everyone swap an item of clothing with the person to your right.", orderIndex: 3 },
      { id: 5, ruleText: "{player}, kiss the cheek of the person to your left.", orderIndex: 4 },
      { id: 6, ruleText: "{player}, let the group DM anyone from your Instagram.", orderIndex: 5 },
      { id: 7, ruleText: "Spicy Question: {player}, have you ever hooked up with anyone in this room?", orderIndex: 6 },
    ]
  }
];
