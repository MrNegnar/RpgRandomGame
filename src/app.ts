#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { Player } from './game/character/tournamentRpgCharacter/Player.js'
import { Enemy } from './game/character/tournamentRpgCharacter/Enemy.js'
import { characterClasses } from './game/character/tournamentRpgCharacter/characterClasses.js'
import { Races } from './game/character/tournamentRpgCharacter/race.js'
import { Game } from './game/Game.js'
import { Dice } from 'rpg-fight-encounter'

export const characterSettings = {
  name: "",
  characterClasses,
  Races,
  stats: {}
}

const game = new Game()

/**
 * The main function serves as the entry point for the application.
 * It attempts to display the start menu and handle user input.
 * If an unexpected error occurs, it logs the error and sets the process exit code to 1.
 *
 * @returns {void} This function does not return a value.
 */
function main(): void {

  try {
    console.log("Hello user, what is your name?")
    const userName = readlineSync.question("Enter your name: ")
    console.log(`Welcome, ${userName}!`)
    getStartMenuChoice()
  } catch (error) {
    console.error('An unexpected error occurred during execution:', (error as Error).message)
    process.exitCode = 1
  }
}

/**
 * Displays the start menu and handles the user's choice.
 *
 * @throws {Error} If the user enters an invalid choice.
 * @returns {void} This function does not return a value.
 */
function getStartMenuChoice() {
    console.log("Prepare for a tournament fight!")
    console.log("What do you want to do?")
    console.log("1. Start character creation")
    console.log("2. Exit")

    const startMenuChoice = parseInt(readlineSync.keyIn(readlineSync.question("Enter your choice: ")))

    switch (startMenuChoice) {
      case 1:
        charactercreation()
        startTheGame()
        break
      case 2:
        console.log("Exiting game...")
        process.exit(0)
        break
      default:
        console.log("Invalid choice. Please try again.")
        throw new Error("Invalid choice")
    }
    return startMenuChoice
}

/**
 * Handles the overall character creation process, including class, stats, and race selection, and adds the player to the game.
 */
function charactercreation() {
  chooseCharacterClass()
  createCharacterStats()
  chooseCharacterRace()
  const player = new Player({ characterSettings })
  game.addPlayer(player)
  decideEnemyNumber()
}

/**
 * Displays the character class selection menu and handles the user's choice.
 *
 * @throws {Error} If the user enters an invalid choice.
 * @returns {void} This function does not return a value.
 */
  function chooseCharacterClass() {
    for (let i = 0; i < characterClasses.length; i++) {
      console.log(`${i + 1}. ${characterClasses[i]} has the statbonuses applied`)
      console.log(`strength: ${characterClasses[i].stats.strength}`)
      console.log(`dexterity: ${characterClasses[i].stats.dexterity}`)
      console.log(`constitution: ${characterClasses[i].stats.constitution}`)
      console.log(`intelligence: ${characterClasses[i].stats.intelligence}`)
      console.log(`wisdom: ${characterClasses[i].stats.wisdom}`)
    }
    const characterClassChoice = parseInt(readlineSync.question("Enter your choice: "))

  switch (characterClassChoice) {
    case 1:
      characterSettings.characterClasses = "Fighter";
      createCharacterStats()
      break
    case 2:
      characterSettings.characterClasses = "Mage";
      createCharacterStats()
      break
    case 3:
      characterSettings.characterClasses = "Cleric";
      createCharacterStats()
      break
    case 4:
      characterSettings.characterClasses = "Rogue";
      createCharacterStats()
      break
    default:
      console.log("Invalid choice. Please try again.")
      break
  }
}

/**
 * Generates and assigns character stats using dice rolls.
 */
function createCharacterStats() {
  const dice = new Dice()
  characterSettings.stats = {
    strength: dice.rollDice(3, 6),
    dexterity: dice.rollDice(3, 6),
    constitution: dice.rollDice(3, 6),
    intelligence: dice.rollDice(3, 6),
    wisdom: dice.rollDice(3, 6)
  }
  console.log("Character stats have been generated:", characterSettings.stats)
  chooseCharacterRace()
}

/**
 * Displays the character race selection menu and handles the user's choice.
 */
function chooseCharacterRace() {
  for (let i = 0; i < Races.length; i++) {
    console.log(`${i + 1}. ${Races[i]} has the statbonuses applied: `)
    console.log(`strength: ${Races[i].stats.strength}`)
    console.log(`dexterity: ${Races[i].stats.dexterity}`)
    console.log(`constitution: ${Races[i].stats.constitution}`)
    console.log(`intelligence: ${Races[i].stats.intelligence}`)
    console.log(`wisdom: ${Races[i].stats.wisdom}`)
  }

  const raceChoice = parseInt(readlineSync.question("Enter your choice: ")) 

  switch (raceChoice) {
    case 1:
      characterSettings.Races = Races.HUMAN;
      break
    case 2:
      characterSettings.Races = Races.ELF;
      break
    case 3:
      characterSettings.Races = Races.DWARF;
      break
    case 4:
      characterSettings.Races = Races.ORC;
      break
    default:
      console.log("Invalid choice. Please try again.")
      break
  }
}

/**
 * Prompts the user to decide the number of enemies for the game and updates the enemy settings accordingly.
 */
function decideEnemyNumber() {
  console.log("This is a tournament fighter, so it need to be balanced.")
  const numberOfEnemies = parseInt(readlineSync.question("Enter the number of enemies: "))
  console.log(`Number of enemies set to: ${numberOfEnemies}`)
  createEnemys(numberOfEnemies)
}

/**
 * Creates enemy characters for the game based on the enemy settings.
 *
 * @param numberOfEnemies The number of enemy characters to create.
 */
function createEnemys(numberOfEnemies: number) {
  for (let i = 0; i < numberOfEnemies; i++) {
}

/**
 * Starts the game.
 * This function is called after all character and enemy setup is complete.
 * This is where the main game loop or logic would be implemented.
 */
function startTheGame() {
  console.log("The game is starting...")

}

main()
