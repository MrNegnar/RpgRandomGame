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
   */
  constructor(){
    this.name = name
    this.speed = speed
    this.armor = armor
    this.evasion = evasion
    this.strength = strength + (raceBonus?.strengthBonus + characterClassBonus?.strengthBonus ?? 0)
    this.dexterity = dexterity + (raceBonus?.dexterityBonus + characterClassBonus?.dexterityBonus ?? 0)
    this.constitution = constitution + (raceBonus?.constitutionBonus + characterClassBonus?.constitutionBonus ?? 0)
    this.intelligence = intelligence + (raceBonus?.intelligenceBonus + characterClassBonus?.intelligenceBonus ?? 0)
    this.wisdom = wisdom + (raceBonus?.wisdomBonus + characterClassBonus?.wisdomBonus ?? 0)
    this.strengthModifier = Math.floor((this.strength - 10) / 2)
    this.dexterityModifier = Math.floor((this.dexterity - 10) / 2)
    this.constitutionModifier = Math.floor((this.constitution - 10) / 2)
    this.intelligenceModifier = Math.floor((this.intelligence - 10) / 2)
    this.wisdomModifier = Math.floor((this.wisdom - 10) / 2)
  }

  /**
   * Returns the race  of the character
   *
   * @returns Returns the race of the character
   */
  public getRace(): typeof Races[keyof typeof Races] {
    return this.race
  }

  /**
   * Returns the class of the character
   *
   * @returns Returns the class of the character
   */
  public getClass(): typeof CharacterClasses[keyof typeof CharacterClasses] {
    return this.class
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
    Race: ${this.race}, Class: ${this.class},\n\
    Health: ${this.currentHitpoints}/${this.maxHealth}, Speed: ${this.speed}, Armor: ${this.armor}, Evasion: ${this.evasion},\n\
    Strength: ${this.strength}, Dexterity: ${this.dexterity}, Constitution: ${this.constitution}, Intelligence: ${this.intelligence}`
  }
}
