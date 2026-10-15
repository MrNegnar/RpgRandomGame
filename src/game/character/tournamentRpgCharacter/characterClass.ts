export const CharacterClasses = {
  WARRIOR: { strengthBonus: 1, intelligenceBonus: 0, wisdomBonus: 0 },
  MAGE: { strengthBonus: 0, intelligenceBonus: 1, wisdomBonus: 0 },
  CLERIC: { strengthBonus: 0, intelligenceBonus: 0, wisdomBonus: 1 },
} as const;

export type CharacterClass = keyof typeof CharacterClasses
