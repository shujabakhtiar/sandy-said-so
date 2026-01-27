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
      { id: 5, ruleText: "{player}, choose another player. For the next round, you ARE them. Speak, act, and drink as them. If you fail, drink! Embrace the role-play!", orderIndex: 20 },
      { id: 6, ruleText: "{player} must speak in an accent for the next round or finish their drink.", orderIndex: 5 },
      { id: 7, ruleText: "Waterfall! {player} starts.", orderIndex: 6 },
      { id: 8, ruleText: "Sandy says: If I dramatically point at someone, everyone else must point at the person to their left. Last one to point drinks! Failure to point also drinks!", orderIndex: 7 },
      { id: 9, ruleText: "Silent Standoff! Everyone stare intensely at one person. The first person to break eye contact or laugh, drinks. Last one standing is safe... for now!", orderIndex: 8 },
      { id: 10, ruleText: "Switcheroo! Everyone immediately swap seats with the person whose clothing color is most similar to yours. Last two left without a match, drink both your drinks!", orderIndex: 9 },
      { id: 11, ruleText: "{player}, the Mimic Mirror! The person to your left makes a bizarre facial expression. You must perfectly mimic it within 3 seconds, or drink. No blinking allowed!", orderIndex: 10 },
      { id: 12, ruleText: "The Jester's Decree! From now on, whenever anyone laughs out loud, the person to their immediate right must give them a dramatic, loud compliment or drink!", orderIndex: 11 },
      { id: 13, ruleText: "The Floor Is Lava! Until someone draws another 'Sandy's Rule Card,' no feet on the floor. Anyone caught with feet flat on the ground drinks. Get creative!", orderIndex: 12 },
      { id: 14, ruleText: "Who can hold it? Everyone take a deep breath and hold it until I say 'exhale.' Last person to exhale, or cracks, drinks. Show me your willpower, folks!", orderIndex: 13 },
      { id: 15, ruleText: "{player}, if you've ever ghosted someone, take a shot. If you've been ghosted, pick someone to drink 2 sips for you.", orderIndex: 14 },
      { id: 16, ruleText: "{player}, the person to your right gives you a *genuine* compliment. If it feels fake to you, they drink 2. If it's real, you sip.", orderIndex: 15 },
      { id: 17, ruleText: "{player}, become the game's dramatic narrator! For the next 3 sentences spoken, theatrically narrate them. If they laugh, they drink! If you miss, you drink.", orderIndex: 16 },
      { id: 18, ruleText: "{player}, pick a player. Give them a unique sound effect. Every time *they* drink, *you* must make that sound. The weirder, the better, darling!", orderIndex: 17 },
      { id: 19, ruleText: "{player}, you're the rule master! Invent a silly new rule for everyone. First to break it (or forget it) drinks! Make it a good one, darling.", orderIndex: 18 },
      { id: 20, ruleText: "{player}, secret mission! Perform a covert high-five with anyone. If caught, you drink twice. Shhh!", orderIndex: 19 },
      { id: 21, ruleText: "{player}, choose another player. For the next round, you ARE them. Speak, act, and drink as them. If you fail, drink! Embrace the role-play!", orderIndex: 20 },
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
