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
  private equipment: Equipment;

  Constructor(Race: race, Class: class, maxHealth: number, speed: number, armorClass: number, strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number, alignment: Alignment, gender: Gender) {

  }

}