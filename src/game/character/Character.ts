import { Races, type Race } from './Race.js';
import { CharacterClass } from './characterClass.js';
import { Alignment } from './alignment.js';


export abstract class Character {
  
  private race: Race;
  private class: CharacterClass;
  private name: string;
  private health: number;
  private maxHealth: number;
  private currentHitPoints: number;
  private speed: number;
  private armor: number;
  private strength: number;
  private dexterity: number;
  private constitution: number;
  private intelligence: number;
  private wisdom: number;
  private charisma: number;
  private alignment: Alignment;
  private gender: Gender;
  private equipment: Equipment{head{}, body{}, legs{}, feet{}, hands{}, PrimaryWeapon{}, SecondaryWeapon{}};

  constructor(race: Race, characterClass: CharacterClass, maxHealth: number, speed: number, armor: number,
    strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number,
    alignment: Alignment, gender: Gender) {
    if (race == null || characterClass == null || maxHealth == null || isNaN(maxHealth) ||speed == null || armor == null ||
    strength == null || dexterity == null || constitution == null || intelligence == null || wisdom == null || charisma == null ||
    alignment == null || gender == null) {
      throw new Error("Invalid Character initialization, all parameters must be provided");
    }
    this.race = race
    this.class = characterClass
    this.maxHealth = maxHealth
    this.speed = speed
    this.armor = armor
    this.strength = strength
    this.dexterity = dexterity
    this.constitution = constitution
    this.intelligence = intelligence
    this.wisdom = wisdom
    this.charisma = charisma
    this.alignment = alignment
    this.gender = gender
    this.currentHitPoints = maxHealth
    this.equipment = {head: null, body: null, legs: null, feet: null, hands: null, PrimaryWeapon: null, SecondaryWeapon: null};
  }

  public getRace(): Race {
    return this.race
  }

  public getClass(): Class {
    return this.class
  }
  public getName(): string {
    return this.name
  }

  public getMaxHealth(): number {
    return this.maxHealth
  }

  public getCurrentHitPoints(): number {
    return this.currentHitPoints
  }

  public getSpeed(): number {
    return this.speed
  }

  public getArmor(): number {
    return this.armor
  }

  public getStrength(): number {
    return this.strength
  }

  public getDexterity(): number {
    return this.dexterity
  }

  public getConstitution(): number {
    return this.constitution
  }

  public getIntelligence(): number {
    return this.intelligence
  }

  public getWisdom(): number {
    return this.wisdom
  }

  public getCharisma(): number {
    return this.charisma
  }

  public getAlignment(): Alignment {
    return this.alignment
  }

  public getGender(): Gender {
    return this.gender
  }

  public getEquipment(): Equipment{} {
    return this.equipment
  }

  /**
   * composes a string representation of the character's attributes and equipment.
   * 
   * @returns A string representation of the character's attributes and equipment.
   */
  public toString(): string {
    return `Name: ${this.name}, Race: ${this.race}, Class: ${this.class},
    Health: ${this.currentHitPoints}/${this.maxHealth}, Speed: ${this.speed}, Armor Class: ${this.armor},
    Strength: ${this.strength}, Dexterity: ${this.dexterity}, Constitution: ${this.constitution}, Intelligence: ${this.intelligence}, Wisdom: ${this.wisdom}, Charisma: ${this.charisma},
    Alignment: ${this.alignment}, Gender: ${this.gender}, Equipment: ${this.equipment.map(e => e.toString()).join(', ')}`
  }

  /**
   * Equips the specified item for the character.
   *
   * @param item The item to be equipped and used.
   */
  private equipItem(item: Equipment): void {
    if (!item || !item.slot || item.isNull()) {
      throw new Error("Invalid item")
    }
    if (this.equipment[item.slot]) {
      this.unequipItem(this.equipment[item.slot])
    }
    this.equipment[item.slot] = item
  }

  /**
   * Unequips the specified item for the character.
   *
   * @param item The item to be unequipped.
   */
  private unequipItem(item: Equipment): void {
    if (!item || !item.slot || item.isNull()) {
      throw new Error("Invalid item")
    }
    if (this.equipment[item.slot] !== item) {
      throw new Error(`Item in slot ${item.slot} does not match the specified item`)
    }
    this.equipment[item.slot] = null
  }

  /**
   * Changes the alignment of the character to the specified value.
   *
   * @param alignment The new alignment to be set for the character.
   */
  private changeAlignment (alignment: Alignment) {
    if (!alignment || alignment.isNull()) {
      throw new Error("Invalid alignment")
    }
    this.alignment = alignment
  }

  /**
   * Validates whether the character is still alive based on current hit points.
   * 
   * @returns True if the character is alive (current hit points are greater than 0), otherwise false.
   */
  private isAlive(): boolean {
    return this.currentHitPoints > 0
  }
}
