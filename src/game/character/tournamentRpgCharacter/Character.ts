import type { CombatantInterface } from 'rpg-fight-encounter/src/index.js'

/**
 * An abstract class representing a character in the tournament RPG game.
 */
export abstract class Character implements CombatantInterface {


  private name: string;
  private maxHealth: number;
  private currentHitpoints: number;
  private speed: number;
  private armor: number;
  private evasion: number;

  private strength: number;
  private dexterity: number;
  private constitution: number;
  private intelligence: number;
  private wisdom: number;

  private strengthModifier: number;
  private dexterityModifier: number;
  private constitutionModifier: number;
  private intelligenceModifier: number;
  private wisdomModifier: number;

  /**
   * Constructs a new Character instance with the specified attributes.
   *
   * @param characterSettings The settings used to configure the character.
   * @param characterSettings.name The name of the character.
   * @param characterSettings.armor The armor attribute of the character.
   * @param characterSettings.strength The strength attribute of the character.
   * @param characterSettings.dexterity The dexterity attribute of the character.
   * @param characterSettings.constitution The constitution attribute of the character.
   * @param characterSettings.intelligence The intelligence attribute of the character.
   * @param characterSettings.wisdom The wisdom attribute of the character.
   * @param characterSettings.maxHealth The maximum health of the character.
   */
  constructor(characterSettings: {
    name: string;
    armor: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    maxHealth: number;
  }) {
    this.name = characterSettings.name
    this.armor = characterSettings.armor
    this.strength = characterSettings.strength
    this.dexterity = characterSettings.dexterity
    this.constitution = characterSettings.constitution
    this.intelligence = characterSettings.intelligence
    this.wisdom = characterSettings.wisdom
    this.strengthModifier = Math.floor((this.strength - 10) / 2)
    this.dexterityModifier = Math.floor((this.dexterity - 10) / 2)
    this.constitutionModifier = Math.floor((this.constitution - 10) / 2)
    this.intelligenceModifier = Math.floor((this.intelligence - 10) / 2)
    this.wisdomModifier = Math.floor((this.wisdom - 10) / 2)
    this.evasion = 1 + this.dexterityModifier
    this.speed = 1 + this.dexterityModifier
    this.maxHealth = characterSettings.maxHealth
    this.currentHitpoints = characterSettings.maxHealth
  }

  /**
   * Returns the name of the character
   *
   * @returns Returns the name of the character
   */
  public getName(): string {
    return this.name
  }

  /**
   * Returns the maximum health of the character
   *
   * @returns Returns the maximum health of the character
   */
  public getMaxHealth(): number {
    return this.maxHealth
  }

  /**
   * Returns the current hitpoints of the character
   *
   * @returns Returns the current hitpoints of the character
   */
  public getCurrentHitpoints(): number {
    return this.currentHitpoints
  }

  /**
   * Returns the speed attribute of the character.
   *
   * @returns The speed attribute of the character.
   */
  public getSpeed(): number {
    return this.speed
  }

  /**
   * Returns the armor attribute of the character
   *
   * @returns Returns the armor attribute of the character
   */
  public getArmor(): number {
    return this.armor
  }

  /**
   * Returns the evasion attribute of the character
   *
   * @returns Returns the evasion attribute of the character
   */
  public getEvasion(): number {
    return this.evasion
  }

  /**
   * Returns the strength modifier of the character.
   *
   * @returns The strength modifier of the character.
   */
  public getStrengthModifier(): number {
    return this.strengthModifier
  }

  /**
   * Returns the dexterity modifier of the character.
   *
   * @returns The dexterity modifier of the character.
   */
  public getDexterityModifier(): number {
    return this.dexterityModifier
  }

  /**
   * Returns the constitution modifier of the character.
   *
   * @returns The constitution modifier of the character.
   */
  public getConstitutionModifier(): number {
    return this.constitutionModifier
  }

  /**
   * Returns the intelligence modifier of the character.
   *
   * @returns The intelligence modifier of the character.
   */
  public getIntelligenceModifier(): number {
    return this.intelligenceModifier
  }

  /**
   * Returns the wisdom modifier of the character.
   *
   * @returns The wisdom modifier of the character.
   */
  public getWisdomModifier(): number {
    return this.wisdomModifier
  }

  /**
   * Reduces the character's current hit points by the specified damage amount. If the resulting hit points are less than 0, they are set to 0.
   *
   * @param damage The amount of damage to apply to the character's current hit points.
   */
  public takeDamage(damage: number): void {
    this.currentHitpoints -= damage
    if (this.currentHitpoints < 0) {
      this.currentHitpoints = 0
    }
  }

  /**
   * Applies healing to the character, increasing their current hit points by the specified amount.
   * Ensures that the current hit points do not exceed the maximum health.
   *
   * @param healAmount The amount of healing to apply to the character's current hit points.
   */
  public takeHealing(healAmount: number): void {
    this.currentHitpoints += healAmount
    if (this.currentHitpoints > this.maxHealth) {
      this.currentHitpoints = this.maxHealth
    }
  }

  /**
   * Increases the character's evasion attribute by 1.
   */
  public raiseEvasion(): void {
    this.evasion += 1
  }

  /**
   * Increases the character's armor attribute by 1.
   */
  public raiseArmor(): void {
    this.armor += 1
  }

  /**
   * Validates whether the character is still alive based on current hit points.
   * 
   * @returns True if the character is alive (current hit points are greater than 0), otherwise false.
   */
  public isAlive(): boolean {
    return this.currentHitpoints > 0
  }

  /**
   * composes a string representation of the character's attributes and equipment.
   * 
   * @returns A string representation of the character's attributes and equipment.
   */
  public toString(): string {
    return `Name: ${this.name}\n\
    Health: ${this.currentHitpoints}/${this.maxHealth}, Speed: ${this.speed}, Armor: ${this.armor}, Evasion: ${this.evasion},\n\
    Strength: ${this.strength}, Dexterity: ${this.dexterity}, Constitution: ${this.constitution}, Intelligence: ${this.intelligence}`
  }
}
