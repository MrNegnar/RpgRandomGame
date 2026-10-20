import { Races, type Race } from './Race.js';
import { CharacterClasses, type CharacterClass } from './characterClasses.js';

/**
 * An abstract class representing a character in the tournament RPG game.
 */
export abstract class Character {


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
   * @param characterSettings.speed The speed attribute of the character.
   * @param characterSettings.armor The armor attribute of the character.
   * @param characterSettings.evasion The evasion attribute of the character.
   * @param characterSettings.strength The strength attribute of the character.
   * @param characterSettings.dexterity The dexterity attribute of the character.
   * @param characterSettings.constitution The constitution attribute of the character.
   * @param characterSettings.intelligence The intelligence attribute of the character.
   * @param characterSettings.wisdom The wisdom attribute of the character.
   * @param characterSettings.raceBonus The race bonus applied to the character's attributes.
   * @param characterSettings.characterClassBonus The character class bonus applied to the character's attributes.
   */
  constructor(characterSettings: {
    name: string;
    speed: number;
    armor: number;
    evasion: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    raceBonus?: Race;
    characterClassBonus?: CharacterClass;
  }) {
    this.name = characterSettings.name
    this.speed = characterSettings.speed
    this.armor = characterSettings.armor
    this.evasion = characterSettings.evasion
    this.strength = characterSettings.strength + (characterSettings.raceBonus?.strengthBonus + characterSettings.characterClassBonus?.strengthBonus ?? 0)
    this.dexterity = characterSettings.dexterity + (characterSettings.raceBonus?.dexterityBonus + characterSettings.characterClassBonus?.dexterityBonus ?? 0)
    this.constitution = characterSettings.constitution + (characterSettings.raceBonus?.constitutionBonus + characterSettings.characterClassBonus?.constitutionBonus ?? 0)
    this.intelligence = characterSettings.intelligence + (characterSettings.raceBonus?.intelligenceBonus + characterSettings.characterClassBonus?.intelligenceBonus ?? 0)
    this.wisdom = characterSettings.wisdom + (characterSettings.raceBonus?.wisdomBonus + characterSettings.characterClassBonus?.wisdomBonus ?? 0)
    this.strengthModifier = Math.floor((this.strength - 10) / 2)
    this.dexterityModifier = Math.floor((this.dexterity - 10) / 2)
    this.constitutionModifier = Math.floor((this.constitution - 10) / 2)
    this.intelligenceModifier = Math.floor((this.intelligence - 10) / 2)
    this.wisdomModifier = Math.floor((this.wisdom - 10) / 2)
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
   * Returns the strength attribute of the character.
   *
   * @returns The strength attribute of the character.
   */
  public getStrength(): number {
    return this.strength
  }

  /**
   * Returns the dexterity attribute of the character.
   *
   * @returns The dexterity attribute of the character.
   */
  public getDexterity(): number {
    return this.dexterity
  }

  /**
   * Returns the constitution attribute of the character.
   *
   * @returns The constitution attribute of the character.
   */
  public getConstitution(): number {
    return this.constitution
  }

  /**
   * Returns the intelligence attribute of the character.
   *
   * @returns The intelligence attribute of the character.
   */
  public getIntelligence(): number {
    return this.intelligence
  }

  /**
   * Returns the wisdom attribute of the character.
   *
   * @returns The wisdom attribute of the character.
   */
  public getWisdom(): number {
    return this.wisdom
  }

  /**
   * Validates whether the character is still alive based on current hit points.
   * 
   * @returns True if the character is alive (current hit points are greater than 0), otherwise false.
   */
  private isAlive(): boolean {
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
