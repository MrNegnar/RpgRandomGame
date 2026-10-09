export enum CharacterClass {
  WARRIOR(1, 0, 0),
  MAGE(0, 1, 0),
  CLERIC(0, 0, 1);

  private final int strengthBonus;
  private final int intelligenceBonus;
  private final int wisdomBonus;

  private CharacterClass(int strengthBonus, int intelligenceBonus, int wisdomBonus) {
    this.strengthBonus = strengthBonus;
    this.intelligenceBonus = intelligenceBonus;
    this.wisdomBonus = wisdomBonus;
  }
}
