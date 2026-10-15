import { Race, type Race } from './Race.js';
import { CharacterClass, type CharacterClass } from './characterClass.js';

/**
 * An abstract class representing a character in the tournament RPG game.
 */
export abstract class Character {
  
  private race: typeof Race[keyof typeof Race];
  private class: typeof CharacterClass[keyof typeof CharacterClass];
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

  /**
   * Constructs a new Character instance with the specified attributes.
   *
   * @param name The name of the character
   * @param race The race (object) of the character
   * @param characterClass the class (object) of the character
   * @param maxHealth The maximum health of the character
   * @param speed The speed attribute of the character
   * @param armor The armor attribute of the character
   * @param strength The strength attribute of the character
   * @param dexterity The dexterity attribute of the character
   * @param constitution The constitution attribute of the character
   * @param intelligence The intelligence attribute of the character
   * @param wisdom The wisdom attribute of the character
   */
  constructor(name: string, race: typeof Race, characterClass: typeof CharacterClass, maxHealth: number, speed: number, armor: number,
    strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number){

    if (name == null || race == null || characterClass == null || maxHealth == null || isNaN(maxHealth) ||speed == null || armor == null ||
    strength == null || dexterity == null || constitution == null || intelligence == null || wisdom == null) {
      throw new Error("Invalid Character initialization, all parameters must be provided");
    }
    this.name = name
    this.race = Race[race]
    this.class = CharacterClass[characterClass]
    this.maxHealth = maxHealth
    this.currentHitpoints = maxHealth;
    this.speed = 1;
    this.armor = 0;
    this.evasion = (dexterity-9)/2;
    this.strength = strength
    this.dexterity = dexterity
    this.constitution = constitution
    this.intelligence = intelligence
    this.wisdom = wisdom
  }

  /**
   * Returns the race  of the character
   *
   * @returns Returns the race of the character
   */
  public getRace(): typeof Race[keyof typeof Race] {
    return this.race
  }

  /**
   * Returns the class of the character
   *
   * @returns Returns the class of the character
   */
  public getClass(): typeof CharacterClass[keyof typeof CharacterClass] {
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

  /**
   * Validates whether the character is still alive based on current hit points.
   * 
   * @returns True if the character is alive (current hit points are greater than 0), otherwise false.
   */
  private isAlive(): boolean {
    return this.currentHitpoints > 0
  }
}
