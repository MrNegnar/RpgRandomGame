export const CharacterClasses = {
  FIGHTER: { strengthBonus: 1, dexterityBonus: 0, constitutionBonus: 0, intelligenceBonus: 0, wisdomBonus: 0 },
  ROGUE: { strengthBonus: 0, dexterityBonus: 1, constitutionBonus: 0, intelligenceBonus: 0, wisdomBonus: 0 },
  MAGE: { strengthBonus: 0, dexterityBonus: 0, constitutionBonus: 0, intelligenceBonus: 1, wisdomBonus: 0 },
  CLERIC: { strengthBonus: 0, dexterityBonus: 0, constitutionBonus: 0, intelligenceBonus: 0, wisdomBonus: 1 },
} as const;

export type CharacterClass = keyof typeof CharacterClasses