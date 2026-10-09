import readlineSync from 'readline-sync'
import { Character } from './Character.js'
import { CharacterClass } from '../CharacterClass.js'
import { CharacterRace } from '../CharacterRace.js'
import { Dice } from 'rpg-fight-encounter'
import { Race } from './Race.js'

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
  const stats = setCharacterAttributes()
  const alignment = setCharacterAlignment()
  const gender = setCharacterGender()
  const startHealth = setCharacterStartingMaxHealth(race, stats)
  return (name, race, characterClass, stats, alignment, gender, startHealth)
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

function setCharacterRace(): CharacterRace {
  const races = Object.values(CharacterRace)
  for (const race of races) {
    console.log(race)
  }
  const chosenRace = readlineSync.question("Choose your character's race: ")
  return CharacterRace[chosenRace as keyof typeof CharacterRace]
}

function setCharacterClass(): CharacterClass {
  const classes = Object.values(CharacterClass)
  for (const characterClass of classes) {
    console.log(characterClass)
  }
  const chosenClass = readlineSync.question("Choose your character's class: ")
  return CharacterClass[chosenClass as keyof typeof CharacterClass]
}

function setCharacterAttributes(): number[] {
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
  statsDice = Dice.rollDice(3, 6);

  const stats = [characterStrenght, characterDexterity, characterConstitution, characterIntelligence, characterWisdom, characterCharisma]

  return stats
}

function setCharacterAlignment() {
  const alignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"]
  for (const alignment of alignments) {
    console.log(alignment)
  }
  const chosenAlignment = readlineSync.question("Choose your character's alignment: ")
  return chosenAlignment
}

function setCharacterGender() {
  const genders = ["Male", "Female"]
  for (const gender of genders) {
    console.log(gender)
  }
  const chosenGender = readlineSync.question("Choose your character's gender: ")
  return chosenGender
}

/**
 * Calculates the starting maximum health for a base value of 5, choosen race and rolled constitution stats.
 *
 * @param race - The chosen character race.
 * @param stats - The rolled character stats array.
 * @returns The calculated starting maximum health.
 */
function setCharacterStartingMaxHealth(race: CharacterRace, stats: number[]): number {
  let Dice = new Dice();
  const baseValue = 5
  const healthFromDice = Dice.rollDice(2, 4);
  const healthFromRace = race[2]
  const healthFromConstitution = stats[2]; // Assuming Constitution is the third attribute in the stats array
  const startHealth = baseValue + healthFromDice + healthFromRace + healthFromConstitution
  return startHealth
}
