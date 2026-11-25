#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { CharacterClasses } from './game/character/tournamentRpgCharacter/characterClasses.js'
import { Races } from './game/character/tournamentRpgCharacter/Race.js'
import { Charactercreation } from './game/character/CharacterCreation.js'
import { Game } from './game/Game.js'
import { EnemyObject } from './game/character/tournamentRpgCharacter/enemies.js'
import {
  FightEncounterHandlerV02 as FightEncounterHandler,
  type ChoosePlayerActionV02 as ChoosePlayerAction,
} from 'rpg-fight-encounter'

import { SingleEliminationScheduler } from 'tournament-scheduler'
import { createTournamentRoster } from './tournamentAdapter.js'

const game = new Game()
const characterCreator = new Charactercreation()
let userName = ''

/**
 * The main function serves as the entry point for the application.
 * It attempts to display the start menu and handle user input.
 * If an unexpected error occurs, it logs the error and sets the process exit code to 1.
 *
 * @returns {void} This function does not return a value.
 */
function main(): void {
  try {
    console.log('Hello user, what is your name?')
    userName = readlineSync.question('Enter your name: ')
    console.log(`Welcome, ${userName}!`)
    startMenu()
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
function startMenu() {
  let startMenuChoice: number
  do {
    console.log('\nPrepare for a tournament fight!')
    console.log('What do you want to do?')
    console.log('1. Start character creation')
    console.log('2. view information about the game')
    console.log('3. Exit')

    startMenuChoice = parseInt(readlineSync.question('Enter your choice: '))

    switch (startMenuChoice) {
      case 1:
        prepareGame()
        playTheGame(game.getPlayers(), game.getEnemies())
        game.playTournament
        break
      case 2:
        console.log(
          '\nThis is a tournament RPG game where you create a character, fight enemies, and progress through fights.'
        )
        console.log(
          'You can create your character, choose their class and race, and then engage in battles against enemies.'
        )
        console.log(
          "strength, dexterity, constitution, intelligence, and wisdom are the primary stats that define your character's abilities."
        )
        console.log("Your character's race and class will provide additional bonuses and abilities.")
        console.log("\nThe stat strength determines your character's physical power and adds damage to attacks.")
        console.log("The stat dexterity affects your character's ability to hit the enemy and evade attacks.")
        console.log("The stat constitution affects your character's health.")
        console.log("The stat intelligence affects your character's magical abilities.")
        console.log("The stat wisdom affects your character's ability to heal.\n")
        break
      case 3:
        console.log('Exiting game...')
        break
      default:
        console.log('Invalid choice. Please try again.')
        throw new Error('Invalid choice')
    }
  } while (startMenuChoice !== 3)
}

/**
 * Setting up the game before start
 */
function prepareGame() {
  // Reset the game state before starting character creation.
  // This is necessary to ensure that any previous game state does not interfere with the new character creation process.
  game.resetParticipants()

  charactercreating()
  const howManyEnemies = decideEnemyNumber()
  game.createEnemy(howManyEnemies)
}

/**
 * Handles the overall character creation process,
 * including class, stats, and race selection, and adds the player to the game.
 */
function charactercreating() {

  console.log(characterCreator.createStats())
  characterCreator.setName(userName)
  characterCreator.setRace(chooseRace())
  characterCreator.setClass(chooseClass())
  game.createPlayer(characterCreator.getCharacterSettings())
}

/**
 * logs a list of races and lets the user choose which it wants.
 *
 * @returns The choosen race of the user.
 */
function chooseRace() {
  let raceCounter = 1
        for (const [Race, raceData] of Object.entries(Races)) {
          console.log(`${raceCounter}: ${Race}:`)
          console.log(`strengthbonus: ${raceData.strengthBonus}`)
          console.log(`dexteritybonus: ${raceData.dexterityBonus}`)
          console.log(`constitutionbonus: ${raceData.constitutionBonus}`)
          console.log(`intelligencebonus: ${raceData.intelligenceBonus}`)
          console.log(`wisdombonus: ${raceData.wisdomBonus}\n`)
          raceCounter++
        }
  const raceChoice = parseInt(readlineSync.question('Enter your choice: '))

  return Object.values(Races)[raceChoice -1]
}

/**
 * logs a list of classes and lets the user choose which it wants.
 *
 * @returns The choosen class of the user.
 */
function chooseClass() {
  let classCounter = 1
  for (const [characterClass, classData] of Object.entries(CharacterClasses)) {
    console.log(`${classCounter}: ${characterClass}:`)
    console.log(`strengthbonus: ${classData.strengthBonus}`)
    console.log(`dexteritybonus: ${classData.dexterityBonus}`)
    console.log(`constitutionbonus: ${classData.constitutionBonus}`)
    console.log(`intelligencebonus: ${classData.intelligenceBonus}`)
    console.log(`wisdombonus: ${classData.wisdomBonus}\n`)
    classCounter++
  }
  const classChoice = parseInt(readlineSync.question('Enter your choice: '))

  return Object.values(CharacterClasses)[classChoice -1]
}

/**
 * Prompts the user to decide the number of enemies for the game and updates the enemy settings accordingly.
 *
 * @returns The number of enemies decided by the user.
 */
function decideEnemyNumber(): number {
  let numberOfEnemies = 0
  do {
    try {
      console.log('This is a tournament fighter, so it needs to be balanced.')
      numberOfEnemies = Number(readlineSync.question('Enter a positive, uneven number of enemies: '))
      if (!Number.isInteger(numberOfEnemies) || numberOfEnemies <= 0 || numberOfEnemies % 2 == 0) {
        throw Error('Invalid number of enemies')
      }
    } catch (error) {
      console.error('Cannot choose this number of enemies:', (error as Error).message)
    }
  } while (!Number.isInteger(numberOfEnemies) || numberOfEnemies <= 0 || numberOfEnemies % 2 == 0)

  console.log(`Number of enemies set to: ${numberOfEnemies}`)
  return numberOfEnemies
}

/**
 * This will start the actual gameplay of the game.
 *
 * @param players The array of player characters participating in the game.
 * @param enemies The array of enemy characters participating in the game.
 */
function playTheGame(players: Player[], enemies: Enemy[]): void {

}

/**
 * Handles the player's action choice during a fight encounter.
 *
 * @returns {ChoosePlayerAction<Character, Character>} The function that determines the player's actions during their turn.
 */
function choosingOptionDuringFight(): ChoosePlayerAction<Character, Character> {
  /**
   * Handles the player's action choice during a fight encounter.
   *
   * @param character The player character whose turn is being handled.
   * @param livingAllies The array of living allies of the player.
   * @param livingOpponents The array of living opponents of the player.
   * @returns The action chosen by the player for their turn.
   */
  const choosePlayerAction: ChoosePlayerAction<Character, Character> = (character, livingAllies, livingOpponents) => {
    if (!(character instanceof Player)) {
      return {
        type: 'attack',
        target: livingOpponents[0],
      }
    }
    console.log('\n--- Fight status ---')
    console.log(`${character.getName()}: ${character.getCurrentHitpoints()} HP`)

    for (const enemy of livingOpponents) {
      console.log(`${enemy.getName()}: ${enemy.getCurrentHitpoints()} HP`)
    }
    let choice: string

    do {
      console.log('\nChoose your action:')
      console.log('1. Attack')
      console.log('2. Offensive spell')
      console.log('3. Raise armor')
      console.log('4. Raise evasion')
      console.log('5. Heal')
      console.log('6. Skip turn')

      choice = readlineSync.question('Enter your choice: ')

      if (!['1', '2', '3', '4', '5', '6'].includes(choice)) {
        console.log('Choose a number from 1 to 6.')
      }
    } while (!['1', '2', '3', '4', '5', '6'].includes(choice))

    switch (choice) {
      case '1':
        return { type: 'attack', target: livingOpponents[0] }
      case '2':
        return { type: 'offensiveSpell', target: livingOpponents[0] }
      case '3':
        return { type: 'raiseArmor' }
      case '4':
        return { type: 'raiseEvasion' }
      case '5':
        return { type: 'heal', target: livingAllies[0] }
      default:
        return { type: 'skipTurn' }
    }
  }
  return choosePlayerAction
}

main()
