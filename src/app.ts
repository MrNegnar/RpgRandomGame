#!/usr/bin/env node

import readlineSync from 'readline-sync'

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
        console.log("Loading demo character...")
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

function createDemoCharacter(): void {
    console.log("Creating demo character...")
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
