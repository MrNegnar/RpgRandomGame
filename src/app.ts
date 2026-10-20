#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { Player } from './game/character/tournamentRpgCharacter/Player.js'
import { Enemy } from './game/character/tournamentRpgCharacter/Enemy.js'
import { CharacterClasses } from './game/character/tournamentRpgCharacter/characterClasses.js'
import { Races } from './game/character/tournamentRpgCharacter/Race.js'
import { Game } from './game/Game.js'
import { Dice } from 'rpg-fight-encounter'
import { EnemyObject } from './game/character/tournamentRpgCharacter/enemies.js'

export const characterSettings = {
  name: "",
  characterClass: undefined as
    (typeof CharacterClasses)[keyof typeof CharacterClasses] | undefined,
  race: undefined as
    (typeof Races)[keyof typeof Races] | undefined,
  armor: 1,
  stats: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
  },
  maxHealth: 10,
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
    characterSettings.name = readlineSync.question("Enter your name: ")
    console.log(`Welcome, ${characterSettings.name}!`)
    startMenuChoice()
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
function startMenuChoice() {
    console.log("Prepare for a tournament fight!")
    console.log("What do you want to do?")
    console.log("1. Start character creation")
    console.log("2. Exit")

    const startMenuChoice = parseInt(readlineSync.question("Enter your choice: "))

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
  const player = new Player(characterSettings)
  game.addPlayer(player)
  const howMamyEnemies = decideEnemyNumber()
  for (let i = 0; i < howMamyEnemies; i++) {
    createEnemy()
  }
}

/**
 * This will start the actual gameplay of the game.
 */
function playTheGame() {

}

/**
 * Displays the character class selection menu and handles the user's choice.
 *
 * @throws {Error} If the user enters an invalid choice.
 * @returns {void} This function does not return a value.
 */
  function chooseCharacterClass() {
    for (const [characterClass, classData] of Object.entries(CharacterClasses)) {
        console.log(`${characterClass}:`)
        console.log(`strengthbonus: ${classData.strengthBonus}`)
        console.log(`dexteritybonus: ${classData.dexterityBonus}`)
        console.log(`constitutionbonus: ${classData.constitutionBonus}`)
        console.log(`intelligencebonus: ${classData.intelligenceBonus}`)
        console.log(`wisdombonus: ${classData.wisdomBonus}`)
    }
   let characterClassChoice;
    do {
      characterClassChoice = parseInt(readlineSync.question("Enter your choice: "))
      if (isNaN(characterClassChoice) || characterClassChoice < 1 || characterClassChoice > 4) {
        console.log("Invalid choice. Please try again.")
      }
    } while (isNaN(characterClassChoice) || characterClassChoice < 1 || characterClassChoice > 4)

  switch (characterClassChoice) {
    case 1:
      characterSettings.characterClass = CharacterClasses.FIGHTER;
      break
    case 2:
      characterSettings.characterClass = CharacterClasses.ROGUE;
      break
    case 3:
      characterSettings.characterClass = CharacterClasses.MAGE;
      break
    case 4:
      characterSettings.characterClass = CharacterClasses.CLERIC;
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
    const strengthArr = dice.rollDice(3, 6)
    const dexterityArr = dice.rollDice(3, 6)
    const constitutionArr = dice.rollDice(3, 6)
    const intelligenceArr = dice.rollDice(3, 6)
    const wisdomArr = dice.rollDice(3, 6)
  characterSettings.stats = {
    strength: strengthArr.reduce((a, b) => a + b, 0),
    dexterity: dexterityArr.reduce((a, b) => a + b, 0),
    constitution: constitutionArr.reduce((a, b) => a + b, 0),
    intelligence: intelligenceArr.reduce((a, b) => a + b, 0),
    wisdom: wisdomArr.reduce((a, b) => a + b, 0)
  }
  console.log("Character stats have been generated:", characterSettings.stats)
}

/**
 * Displays the character race selection menu and handles the user's choice.
 */
function chooseCharacterRace() {
    for (const [Race, raceData] of Object.entries(Races)) {
        console.log(`${Race}:`)
        console.log(`strengthbonus: ${raceData.strengthBonus}`)
        console.log(`dexteritybonus: ${raceData.dexterityBonus}`)
        console.log(`constitutionbonus: ${raceData.constitutionBonus}`)
        console.log(`intelligencebonus: ${raceData.intelligenceBonus}`)
        console.log(`wisdombonus: ${raceData.wisdomBonus}`)
    }
    let raceChoice;
    do {
      raceChoice = parseInt(readlineSync.question("Enter your choice: "))
      if (isNaN(raceChoice) || raceChoice < 1 || raceChoice > 5) {
        console.log("Invalid choice. Please try again.")
      }
    } while (isNaN(raceChoice) || raceChoice < 1 || raceChoice > 5)


  switch (raceChoice) {
    case 1:
      characterSettings.race = Races.HUMAN;
      break
    case 2:
      characterSettings.race = Races.ELF;
      break
    case 3:
      characterSettings.race = Races.DWARF;
      break
    case 4:
      characterSettings.race = Races.GNOME;
      break
    case 5:
      characterSettings.race = Races.ORC;
      break
    default:
      console.log("Invalid choice. Please try again.")
      break
  }
}

/**
 * Prompts the user to decide the number of enemies for the game and updates the enemy settings accordingly.
 * 
 * @returns The number of enemies decided by the user.
 */
function decideEnemyNumber(): number {
  console.log("This is a tournament fighter, so it needs to be balanced.")
  let numberOfEnemies: number;
  do {
    numberOfEnemies = Number(
    readlineSync.question('Enter a positive, uneven number of enemies: '),
  )

  if (!Number.isInteger(numberOfEnemies) || numberOfEnemies <= 0 || numberOfEnemies % 2 == 0
  ) {
    console.log('Enter a positive, uneven whole number.')
  }
  } while (!Number.isInteger(numberOfEnemies) || numberOfEnemies <= 0 || numberOfEnemies % 2 == 0)

  console.log(`Number of enemies set to: ${numberOfEnemies}`)
  return numberOfEnemies;
}

/**
 * Creates enemy characters for the game based on the enemy settings.
 * Creates a single enemy character and adds it to the game.
 */
function createEnemy() {
  const enemyNames = Object.keys(EnemyObject) as Array<keyof typeof EnemyObject>
  const name = enemyNames[Math.floor(Math.random() * enemyNames.length)]
  const enemy = new Enemy(EnemyObject[name])
  game.addEnemy(enemy)
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
