import { Player } from './character/tournamentRpgCharacter/Player.js'
import { Enemy } from './character/tournamentRpgCharacter/Enemy.js'
import { Character } from './character/tournamentRpgCharacter/Character.js'
import { EnemyObject } from './character/tournamentRpgCharacter/enemies.js'
import { SingleEliminationScheduler } from 'tournament-scheduler'
import { createTournamentRoster } from '../tournamentAdapter.js'
import {
  FightEncounterHandlerV02 as FightEncounterHandler,
  type ChoosePlayerActionV02 as ChoosePlayerAction,
} from 'rpg-fight-encounter'

import type { CharacterSettings } from './character/CharacterCreation.js'

/**
 * Represents the main game logic for managing players, enemies, and tournament participants.
 */
export class Game {
  private players: any[] = []
  private enemies: any[] = []
  private participants: any[] = []

  private roster: any
  private scheduler: SingleEliminationScheduler
  private totalRounds: number = 0
  private currentRound: any

  /**
   * Initializes a new instance of the Game class, setting up empty arrays for players, enemies, and participants.
   */
  constructor() {
    this.players = []
    this.enemies = []
    this.participants = []
  }

  /**
   * Returns an array copy of participants currently registered for the tournament.
   *
   * @returns The array of participants in the tournament.
   */
  public getParticipants(): any[] {
    return [...this.participants]
  }

  /**
   * Returns an array copy of players currently added to the game.
   *
   * @returns The array of players in the game.
   */
  public getPlayers(): any[] {
    return [...this.players]
  }

  /**
   * Returns an array copy of enemies currently added to the game.
   *
   * @returns The array of enemies in the game.
   */
  public getEnemies(): any[] {
    return [...this.enemies]
  }

  /**
   * Resets the participants, players, and enemies arrays to empty arrays.
   */
  public resetParticipants(): void {
    this.participants = []
    this.players = []
    this.enemies = []
  }

  /**
   * Creates an instance of the a character
   *
   * @param characterSettings - settings used for creating a character
   */
  public createPlayer(characterSettings: CharacterSettings): void {
    const player = new Player(characterSettings)
    this.addPlayer(player)
  }
  /**
   * Adds a player to the game.
   *
   * @param player The player to be added to the game.
   */
  private addPlayer(player: object): void {
    this.players.push(player)
  }

  /**
   * Creates enemy characters for the game based on the enemy settings.
   * Creates a single enemy character and adds it to the game.
   *
   * @param numberOfEnemies - How many enemies that will be created.
   */
  public createEnemy(numberOfEnemies: number): void {
    for (let i = 0; i <= numberOfEnemies; i++) {
      const enemyNames = Object.keys(EnemyObject) as Array<keyof typeof EnemyObject>
      const name = enemyNames[Math.floor(Math.random() * enemyNames.length)]
      const enemy = new Enemy(EnemyObject[name])
      this.addEnemy(enemy)
    }
  }
  /**
   * Adds an enemy to the game.
   *
   * @param enemy The enemy to be added to the game.
   */
  private addEnemy(enemy: any): void {
    this.enemies.push(enemy)
  }

  /**
   * Prepares the tournament by combining all players and enemies into the participants array.
   */
  public prepareTournament(): void {
    this.participants = [...this.players, ...this.enemies]
    if (this.participants.length < 2) {
      throw new Error('Not enough characters to start the tournament')
    }

    this.roster = createTournamentRoster(this.participants)
    this.scheduler = new SingleEliminationScheduler()
    this.totalRounds = Math.ceil(Math.log2(this.participants.length))
    this.currentRound = this.scheduler.createFirstRound(this.roster.participants)
  }




  /**
   *
   */
  public playTournament(choosePlayerAction: ChoosePlayerAction<Character, Character>): any {


  while (true) {
    console.log(`\n--- Round ${this.currentRound.getNumber()} ---`)

    // Den här loopen spelar alla matcher i den aktuella rundan.
    for (const match of this.currentRound.getMatches()) {
      const homeParticipant = match.getHomeParticipant()
      const awayParticipant = match.getAwayParticipant()

      const homeCharacter = this.roster.characterByParticipant.get(homeParticipant)
      const awayCharacter = this.roster.characterByParticipant.get(awayParticipant)

      if (!homeCharacter || !awayCharacter) {
        throw new Error('Could not find both characters for this match')
      }

      // Fightmodulens valfunktion används av första sidan.
      // Flytta spelaren dit om hen annars är matchens bortadeltagare.
      let firstFighter = homeCharacter
      let secondFighter = awayCharacter

      if (awayCharacter instanceof Player && !(homeCharacter instanceof Player)) {
        firstFighter = awayCharacter
        secondFighter = homeCharacter
      }

      console.log(`Match: ${homeParticipant.getName()} vs ${awayParticipant.getName()}`)

      const fight = new FightEncounterHandler<Character, Character>([firstFighter], [secondFighter])

      const winner = fight.goThroughFullFight(choosingOptionDuringFight())

      if (winner === homeCharacter) {
        match.recordResult(1, 0)
      } else if (winner === awayCharacter) {
        match.recordResult(0, 1)
      } else {
        throw new Error('Fight returned a winner outside this match')
      }
    }

    // Alla matcher i sista rundan är spelade.
    if (this.currentRound.getNumber() === this.totalRounds) {
      break
    }

    // Schemaläggaren tar vinnarna och skapar nästa runda.
    this.currentRound = this.scheduler.createNextRound()
  }

  const finalMatch = this.currentRound.getMatches()[0]
  const champion = finalMatch.getWinner()

  if (!champion) {
    throw new Error('The final match has no winner')
  }

  console.log(`\nTournament winner: ${champion.getName()}`)
  }

  /**
   * Starts a fight between the first two participants in the tournament. Logs the fight details to the console.
   * If there are fewer than two participants, the fight will not start.
   */
  public startFight(): void {
    if (this.participants.length < 2) {
      console.log('Not enough participants to start a fight.')
      return
    }
    const [first, second] = this.participants
    console.log(`Starting fight between ${first} and ${second}`)
  }
}
