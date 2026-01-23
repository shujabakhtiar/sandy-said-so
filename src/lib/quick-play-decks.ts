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
    id: 3, // Matches Dimmed Lights ID
    title: "Dimmed Lights",
    gameMode: { name: "Dimmed Lights" },
    gameCards: [
      { id: 1, cardType: "PHASE_0", ruleText: "Remember how it started. Before the world got loud, there was just this. A history written in glances.", orderIndex: 0 },
      { id: 2, cardType: "PHASE_1", targetPerson: "Him", ruleText: "{player}, lean in and whisper what you first thought when you saw her.", orderIndex: 1 },
      { id: 3, cardType: "PHASE_1", targetPerson: "Her", ruleText: "{player}, name one thing he's wearing today that you'd like to take off.", orderIndex: 2 },
      { id: 4, cardType: "PHASE_2", targetPerson: "Him", ruleText: "{player}, trace a line from her shoulder to her wrist. Don't break eye contact.", orderIndex: 3 },
      { id: 5, cardType: "PHASE_2", targetPerson: "Her", ruleText: "{player}, what is a part of his body you've been wanting to touch all night?", orderIndex: 4 },
      { id: 6, cardType: "PHASE_3", targetPerson: "Him", ruleText: "{player}, if you could take her anywhere right now, no questions asked, where would it be?", orderIndex: 5 },
      { id: 7, cardType: "PHASE_3", targetPerson: "Her", ruleText: "{player}, show him exactly how you want to be kissed later.", orderIndex: 6 },
      { id: 8, cardType: "PHASE_4", targetPerson: "Him", ruleText: "{player}, let her lead you to a different spot in the room. Just you two.", orderIndex: 7 },
      { id: 9, cardType: "PHASE_4", targetPerson: "Her", ruleText: "{player}, tell him a secret that makes your heart race just thinking about it.", orderIndex: 8 },
      { id: 10, cardType: "PHASE_5", targetPerson: "Him", ruleText: "{player}, Sandy gives you permission. Take her hand and don't let go.", orderIndex: 9 },
      { id: 11, cardType: "PHASE_5", targetPerson: "Her", ruleText: "{player}, it's time. Tell him what you want him to do to you next.", orderIndex: 10 },
    ]
  }
];
