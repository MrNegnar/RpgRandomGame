#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { Character } from './game/character/tournamentRpgCharacter/Character.js'
import { Player } from './game/character/tournamentRpgCharacter/Player.js'
import { Enemy } from './game/character/tournamentRpgCharacter/Enemy.js'
import { characterClasses } from './game/character/tournamentRpgCharacter/characterClasses.js'
import { races } from './game/character/tournamentRpgCharacter/races.js'
import { Game } from './game/Game.js'

/**
 * The main function serves as the entry point for the application.
 * It attempts to display the start menu and handle user input.
 * If an unexpected error occurs, it logs the error and sets the process exit code to 1.
 *
 * @returns {void} This function does not return a value.
 */
function main(): void {

  try {
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
    console.log("Hello gamer!")
    console.log("Prepare for a tournament fight!")
    console.log("What do you want to do?")
    console.log("1. Start character creation")
    console.log("2. Exit")

    const startMenuChoice = parseInt(readlineSync.keyIn(readlineSync.question("Enter your choice: ")))

    switch (startMenuChoice) {
      case 1:
        chooseCharacterClass()
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
 * Displays the character class selection menu and handles the user's choice.
 *
 * @throws {Error} If the user enters an invalid choice.
 * @returns {void} This function does not return a value.
 */
  function chooseCharacterClass() {
    for (let i = 0; i < characterClasses.length; i++) {
      console.log(`${i + 1}. ${characterClasses[i]}`)
    }
    const characterClassChoice = parseInt(readlineSync.question("Enter your choice: "))

  switch (characterClassChoice) {
    case 1:
      chooseCharacterRace("Fighter")
      break
    case 2:
      chooseCharacterRace("Mage")
      break
    case 3:
      chooseCharacterRace("Cleric")
      break
    case 4:
      chooseCharacterRace("Rogue")
      break
    case 5:
      return;
    default:
      console.log("Invalid choice. Please try again.")
      break
  }
}

/**
 * Displays the character race selection menu and handles the user's choice.
 *
 * @param choosenClass the class chosen by the user.
 * @returns {void} This function does not return a value.
 */
function chooseCharacterRace(choosenClass: string) {
  for (let i = 0; i < races.length; i++) {
    console.log(`${i + 1}. ${races[i]}`)
  }

  const raceChoice = parseInt(readlineSync.question("Enter your choice: ")) 

  const game = new Game()
  switch (raceChoice) {
    case 1:
      game.addPlayer({ class: choosenClass, race: "Human" })
      break
    case 2:
      game.addPlayer({ class: choosenClass, race: "Elf" })
      break
    case 3:
      game.addPlayer({ class: choosenClass, race: "Dwarf" })
      break
    case 4:
      game.addPlayer({ class: choosenClass, race: "Orc" })
      break
    case 5:
      return;
    default:
      console.log("Invalid choice. Please try again.")
      break
  }
}

main()
