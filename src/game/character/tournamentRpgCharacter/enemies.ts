export const EnemyObject = {
  Goblin: {name: "Goblin", maxHealth: 16, speed: 1, armor: 1, evasion: 1, strength: 11, dexterity: 9, constitution: 7, intelligence: 1, wisdom: 1},
  Rat: {name: "Rat", maxHealth: 8, speed: 2, armor: 0, evasion: 2, strength: 5, dexterity: 13, constitution: 6, intelligence: 1, wisdom: 1},
  Skeleton: {name: "Skeleton", maxHealth: 12, speed: 1, armor: 2, evasion: 0, strength: 12, dexterity: 8, constitution: 10, intelligence: 1, wisdom: 1},
  Zombie: {name: "Zombie", maxHealth: 20, speed: 1, armor: 3, evasion: 0, strength: 10, dexterity: 6, constitution: 12, intelligence: 1, wisdom: 1},
  Orc: {name: "Orc", maxHealth: 18, speed: 1, armor: 2, evasion: 1, strength: 14, dexterity: 10, constitution: 12, intelligence: 1, wisdom: 1},
  Troll: {name: "Troll", maxHealth: 30, speed: 1, armor: 3, evasion: 1, strength: 14, dexterity: 8, constitution: 16, intelligence: 1, wisdom: 1},
} as const;