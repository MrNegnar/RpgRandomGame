export abstract class Character {
  
  private race: Race;
  private class: Class;
  private name: string;
  private health: number;
  private maxHealth: number;
  private currentHitPoints: number;
  private speed: number;
  private armorClass: number;
  private strength: number;
  private dexterity: number;
  private constitution: number;
  private intelligence: number;
  private wisdom: number;
  private charisma: number;
  private alignment: Alignment;
  private gender: Gender;
  private equipment: Equipment[];

  constructor(Race: race, Class: class, maxHealth: number, speed: number, armorClass: number, strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number, alignment: Alignment, gender: Gender) {
    this.race = Race
    this.class = Class
    this.maxHealth = maxHealth
    this.speed = speed
    this.armorClass = armorClass
    this.strength = strength
    this.dexterity = dexterity
    this.constitution = constitution
    this.intelligence = intelligence
    this.wisdom = wisdom
    this.charisma = charisma
    this.alignment = alignment
    this.gender = gender
    this.currentHitPoints = maxHealth
    this.equipment = []
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

  public getArmorClass(): number {
    return this.armorClass
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

  public getEquipment(): Equipment[] {
    return this.equipment
  }

  public toString(): string {
    return `Name: ${this.name}, Race: ${this.race}, Class: ${this.class}, Health: ${this.currentHitPoints}/${this.maxHealth}, Speed: ${this.speed}, Armor Class: ${this.armorClass}, Strength: ${this.strength}, Dexterity: ${this.dexterity}, Constitution: ${this.constitution}, Intelligence: ${this.intelligence}, Wisdom: ${this.wisdom}, Charisma: ${this.charisma}, Alignment: ${this.alignment}, Gender: ${this.gender}, Equipment: ${this.equipment.map(e => e.toString()).join(', ')}`
  }

  private addEquipment(item: Equipment): void {

  }

  private removeEquipment(item: Equipment): void {

  }

  
}
