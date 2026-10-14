import readlineSync from 'readline-sync'
import { Character } from './Character.js'
import { CharacterClass } from './characterClass.js'
import { Race, type Races } from './Race.js'
import { Alignment } from './alignment.js'
import { Gender } from './gender.js'
import { Dice } from 'rpg-fight-encounter'

/**
 * Creates a new character by prompting the user for various attributes.
 * This includes the character's name, race, class, attributes, alignment, gender, and starting health.
 *
 * @returns {Character} The newly created character.
 */
export function createCharacter(): Character {
  const name = setCharacterName()
  const race = setCharacterRace()
  const characterClass = setCharacterClass()
  const stats: {strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number} = setCharacterAttributes()
  const alignment = setCharacterAlignment()
  const gender = setCharacterGender()
  const startHealth = setCharacterStartingMaxHealth(race, stats.constitution)
  return {name, race, characterClass, stats, alignment, gender, startHealth}
}

/**
 * Prompts the user to enter a name for the character.
 * Checks that the entered name is not empty.
 *
 * @returns {string} The name of the character.
 */
function setCharacterName(): string {
  let name;
  do {
    name = readlineSync.question("Enter your character's name: ")
  } while (name.trim().length === 0)
  return name
}

/**
 * Prompts the user to select a race for the character.
 *
 * @returns {Race} The selected character race.
 */
function setCharacterRace(): Race {
  const races = Object.values(Race)
  for (const race of races) {
    console.log(race)
  }
  const chosenRace = readlineSync.question("Choose your character's race: ")
  return Race[chosenRace as keyof typeof Race]
}

/**
 * Prompts the user to select a class for the character.
 *
 * @returns {CharacterClass} The selected character class.
 */
function setCharacterClass(): CharacterClass {
  const classes = Object.values(CharacterClass)
  for (const characterClass of classes) {
    console.log(characterClass)
  }
  const chosenClass = readlineSync.question("Choose your character's class: ")
  return CharacterClass[chosenClass as keyof typeof CharacterClass]
}

/**
 * Rolls dice to be used for determining the character's attributes.
 *
 * @returns {Object} An object containing the rolled character attributes: strength, dexterity, constitution, intelligence, wisdom, and charisma.
 */
function setCharacterAttributes(): {strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number} {
  let Dice = new Dice();
  let statsDice;
  statsDice = Dice.rollDice(3, 6);
  const characterStrenght = statsDice;
  statsDice = Dice.rollDice(3, 6);
  const characterDexterity = statsDice;
  statsDice = Dice.rollDice(3, 6);
  const characterConstitution = statsDice;
  statsDice = Dice.rollDice(3, 6);
  const characterIntelligence = statsDice;
  statsDice = Dice.rollDice(3, 6);
  const characterWisdom = statsDice;
  statsDice = Dice.rollDice(3, 6);
  const characterCharisma = statsDice;

  const stats = {strength: characterStrenght, dexterity: characterDexterity, constitution: characterConstitution, intelligence: characterIntelligence, wisdom: characterWisdom, charisma: characterCharisma}

  return stats
}

/**
 * Prompts the user to select an alignment for the character.
 *
 * @returns {Alignment} The selected character alignment.
 */
function setCharacterAlignment(): Alignment {
  const alignments = Object.values(Alignment)
  for (const alignment of alignments) {
    console.log(alignment)
  }
  const chosenAlignment = readlineSync.question("Choose your character's alignment: ")
  return Alignment[chosenAlignment as keyof typeof Alignment]
}

/**
 * Prompts the user to select a gender for the character.
 *
 * @returns {string} The selected character gender.
 */
function setCharacterGender() {
  const genders = Object.values(Gender)
  for (const gender of genders) {
    console.log(gender)
  }
  const chosenGender = readlineSync.question("Choose your character's gender: ")
  return Gender[chosenGender as keyof typeof Gender]
}

/**
 * Calculates the starting maximum health for a base value of 5, choosen race and rolled constitution stats.
 *
 * @param race - The chosen character race, can contain a constitution bonus.
 * @param stats.constitution - The rolled character constitution stat.
 * @param stats - An object containing the rolled character stats, including constitution.
 * @returns The calculated starting maximum health.
 */
function setCharacterStartingMaxHealth(race: Race, stats: {constitution: number}): number {
  let Dice = new Dice();
  const baseValue = 5
  const healthFromDice = Dice.rollDice(2, 4);
  const healthFromRace = race.constitutionBonus;
  const healthFromConstitution = stats.constitution;
  const startHealth = baseValue + healthFromDice + healthFromRace + healthFromConstitution
  return startHealth
}
