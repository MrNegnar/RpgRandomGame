#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { Character } from './game/character/Character.js'

/**
 * Extracts the name argument from the command line.
 *
 * @example
 * parseArgs(['Ada Lovelace']) // Returns 'Ada Lovelace'
 * parseArgs([]) // Returns undefined
 * @param argv - Command-line arguments, excluding the node executable and
 *   script path (i.e. `process.argv.slice(2)`).
 * @returns The first positional argument, if any.
 */
export function parseArgs(argv: string[]): string | undefined {
  return argv[0]
}

function chooseDemoFighter(){
  console.log("Here are the demo character that can be coosen from")
  console.log("1. Fighter")
  console.log("2. Mage")
  console.log("3. Exit to main menu")

  const demoCharacterChoice = readlineSync.question("Enter your choice: ")
  switch (demoCharacterChoice) {
    case "1":
      createDemoCharacter("Fighter")
      break
    case "2":
      createDemoCharacter("Mage")
      break
    case "3":
      return;
      break
    default:
      console.log("Invalid choice. Please try again.")
      break
  }
}

function createDemoCharacter(choiceOfCharacter: string): void {
  switch (choiceOfCharacter) {
    case "Fighter" :
      let character = new Character("Human", "Fighter",/*Magic number hp*/ 100,/*Magic number speed*/ 2, /*Magic number armor*/ */ 2, /*set good stats for fighter */ 16, 14, 16, 8, 6, 5, "Neutral Good", "Male")
      break
    case "Mage" :
      let character = new Character("Human", "Mage",/*Magic number hp*/ 80,/*Magic number speed*/ 2, /*Magic number armor*/ */ 1, /*set good stats for mage */ 8, 14, 10, 16, 12, 10, "Neutral Good", "Male")
      break
    default:
      console.log("Invalid character choice.")
      break
  }
}


function getStartMenuChoice(): string {
    console.log("Hello gamer!")
    console.log("Prepare for an epic adventure!")
    console.log("What do you want to do?")
    console.log("1. Start character creation")
    console.log("2. Load demo character")
    console.log("3. Exit")

    const startMenuChoice = readlineSync.question("Enter your choice: ")

    switch (startMenuChoice) {
      case "1":
        console.log("Starting character creation...")
        break
      case "2":
        
        break
      case "3":
        console.log("Exiting game...")
        process.exit(0)
      default:
        console.log("Invalid choice. Please try again.")
        throw new Error("Invalid choice")
    }
    return startMenuChoice
}

/**
 * Execution entry point.
 */
function main(): void {

  try {
    getStartMenuChoice()
  } catch (error) {
    console.error('An unexpected error occurred during execution:', (error as Error).message)
    process.exitCode = 1
  }
}

main()
