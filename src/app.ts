#!/usr/bin/env node

import readlineSync from 'readline-sync'
import { Character } from './game/character/tournamentRpgCharacter/Character.js'
import { Player } from './game/character/tournamentRpgCharacter/Player.js'
import { Enemy } from './game/character/tournamentRpgCharacter/Enemy.js'
import { CharacterClasses } from './game/character/tournamentRpgCharacter/characterClasses.js'
import { Races } from './game/character/tournamentRpgCharacter/Race.js'
import { Game } from './game/Game.js'
import { Dice } from 'rpg-fight-encounter'
import { EnemyObject } from './game/character/tournamentRpgCharacter/enemies.js'
import { FightEncounterHandlerV02 as FightEncounterHandler,
  type ChoosePlayerActionV02 as ChoosePlayerAction } from 'rpg-fight-encounter'
import { SingleEliminationScheduler } from 'tournament-scheduler'
import { createTournamentRoster } from './tournamentAdapter.js'



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
    console.log("\nPrepare for a tournament fight!")
    console.log("What do you want to do?")
    console.log("1. Start character creation")
    console.log("2. view information about the game")
    console.log("3. Exit")

    startMenuChoice = parseInt(readlineSync.question("Enter your choice: "))

    switch (startMenuChoice) {
      case 1:
        charactercreation()
        break
      case 2:
        console.log("\nThis is a tournament RPG game where you create a character, fight enemies, and progress through fights.")
        console.log("You can create your character, choose their class and race, and then engage in battles against enemies.")
        console.log("strength, dexterity, constitution, intelligence, and wisdom are the primary stats that define your character's abilities.")
        console.log("Your character's race and class will provide additional bonuses and abilities.")
        console.log("\nThe stat strength determines your character's physical power and adds damage to attacks.")
        console.log("The stat dexterity affects your character's ability to hit the enemy and evade attacks.")
        console.log("The stat constitution affects your character's health.")
        console.log("The stat intelligence affects your character's magical abilities.")
        console.log("The stat wisdom affects your character's ability to heal.\n")
        break
      case 3:
        console.log("Exiting game...")
        break
      default:
        console.log("Invalid choice. Please try again.")
        throw new Error("Invalid choice")
    }
  } while (startMenuChoice !== 3)
}

/**
 * Handles the overall character creation process, including class, stats, and race selection, and adds the player to the game.
 */
function charactercreation() {
  // Reset the game state before starting character creation.
  // This is necessary to ensure that any previous game state does not interfere with the new character creation process.
  game.resetParticipants()
  createCharacterStats()
  chooseCharacterClass()
  chooseCharacterRace()
  const player = new Player(characterSettings)
  game.addPlayer(player)
  const howMamyEnemies = decideEnemyNumber()
  for (let i = 0; i < howMamyEnemies; i++) {
    createEnemy()
  }
  playTheGame(game.getPlayers(), game.getEnemies())
}

/**
 * This will start the actual gameplay of the game.
 * 
 * @param players The array of player characters participating in the game.
 * @param enemies The array of enemy characters participating in the game.
 */
function playTheGame(players: Player[], enemies: Enemy[]): void {
  const characters: Character[] = [...players, ...enemies]

  if (characters.length < 2) {
    throw new Error("Not enough characters to start the tournament")
  }

  const roster = createTournamentRoster(characters)
  const scheduler = new SingleEliminationScheduler()
  const totalRounds = Math.ceil(Math.log2(characters.length))
  let round = scheduler.createFirstRound(roster.participants)

  while (true) {
    console.log(`\n--- Round ${round.getNumber()} ---`)

    // Den här loopen spelar alla matcher i den aktuella rundan.
    for (const match of round.getMatches()) {
      const homeParticipant = match.getHomeParticipant()
      const awayParticipant = match.getAwayParticipant()

      const homeCharacter =
        roster.characterByParticipant.get(homeParticipant)
      const awayCharacter =
        roster.characterByParticipant.get(awayParticipant)

      if (!homeCharacter || !awayCharacter) {
        throw new Error('Could not find both characters for this match')
      }

      // Fightmodulens valfunktion används av första sidan.
      // Flytta spelaren dit om hen annars är matchens bortadeltagare.
      let firstFighter = homeCharacter
      let secondFighter = awayCharacter

      if (
        awayCharacter instanceof Player &&
        !(homeCharacter instanceof Player)
      ) {
        firstFighter = awayCharacter
        secondFighter = homeCharacter
      }

      console.log(
        `Match: ${homeParticipant.getName()} vs ${awayParticipant.getName()}`
      )

      const fight = new FightEncounterHandler<Character, Character>(
        [firstFighter],
        [secondFighter]
      )

      const winner = fight.goThroughFullFight(
        choosingOptionDuringFight()
      )

      if (winner === homeCharacter) {
        match.recordResult(1, 0)
      } else if (winner === awayCharacter) {
        match.recordResult(0, 1)
      } else {
        throw new Error('Fight returned a winner outside this match')
      }
    }

    // Alla matcher i sista rundan är spelade.
    if (round.getNumber() === totalRounds) {
      break
    }

    // Schemaläggaren tar vinnarna och skapar nästa runda.
    round = scheduler.createNextRound()
  }

  const finalMatch = round.getMatches()[0]
  const champion = finalMatch.getWinner()

  if (!champion) {
    throw new Error('The final match has no winner')
  }

  console.log(`\nTournament winner: ${champion.getName()}`)

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
    const choosePlayerAction: ChoosePlayerAction<Character, Character> = (
    character,
    livingAllies,
    livingOpponents
  ) => {
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
        console.log(`wisdombonus: ${classData.wisdomBonus}\n`)
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
        console.log(`wisdombonus: ${raceData.wisdomBonus}\n`)
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
 *
 */
function createEnemy(): void {
  const enemyNames = Object.keys(EnemyObject) as Array<keyof typeof EnemyObject>
  const name = enemyNames[Math.floor(Math.random() * enemyNames.length)]
  const enemy = new Enemy(EnemyObject[name])
  game.addEnemy(enemy)
}

main()
