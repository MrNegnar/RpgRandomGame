export const Race = {
  HUMAN: { strengthBonus: 0, dexterityBonus: 0, constitutionBonus: 0, intelligenceBonus: 1, wisdomBonus: 0 },
  ELF: { strengthBonus: 0, dexterityBonus: 2, constitutionBonus: 0, intelligenceBonus: 0, wisdomBonus: 0 },
  DWARF: { strengthBonus: 1, dexterityBonus: 0, constitutionBonus: 1, intelligenceBonus: 0, wisdomBonus: 0 },
  GNOME: { strengthBonus: 0, dexterityBonus: 0, constitutionBonus: 2, intelligenceBonus: 0, wisdomBonus: 0 },
  ORC: { strengthBonus: 2, dexterityBonus: 0, constitutionBonus: 0, intelligenceBonus: 0, wisdomBonus: 0 },
} as const;
