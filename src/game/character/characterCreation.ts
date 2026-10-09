import readlineSync from 'readline-sync'
import { Character } from './Character.js'
import { CharacterClass } from '../CharacterClass.js'
import { CharacterRace } from '../CharacterRace.js'


export function createCharacter(): Character {
  const name = setCharacterName()
  const race = setCharacterRace()
  const characterClass = setCharacterClass()
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

function setCharacterAttributes() {
  // TODO: Implement character attribute with dice from module.
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
