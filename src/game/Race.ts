export enum Race {
  HUMAN(0, 0, 0, 1, 0, 1),
  ELF(0, 2, 0, 0, 0, 0),
  DWARF(1, 0, 1, 0, 0, 0),
  GNOME(0, 0, 2, 0, 0, 0),
  ORC(2, 0, 0, 0, 0, 0);

  private final int strengthBonus;
  private final int dexterityBonus;
  private final int constitutionBonus;
  private final int intelligenceBonus;
  private final int wisdomBonus;
  private final int charismaBonus;

  Race(int strengthBonus, int dexterityBonus, int constitutionBonus, int intelligenceBonus, int wisdomBonus, int charismaBonus) {
    this.strengthBonus = strengthBonus;
    this.dexterityBonus = dexterityBonus;
    this.constitutionBonus = constitutionBonus;
    this.intelligenceBonus = intelligenceBonus;
    this.wisdomBonus = wisdomBonus;
    this.charismaBonus = charismaBonus;
  }
}
