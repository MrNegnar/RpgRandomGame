import { Player } from './character/tournamentRpgCharacter/Player.js'
import { Enemy } from './character/tournamentRpgCharacter/Enemy.js'
import { EnemyObject } from './character/tournamentRpgCharacter/enemies.js'
import { SingleEliminationScheduler } from 'tournament-scheduler'
import { createTournamentRoster } from '../tournamentAdapter.js'

import type { CharacterSettings } from './character/CharacterCreation.js'

/**
 * Represents the main game logic for managing players, enemies, and tournament participants.
 */
export class Game {
  private players: any[] = []
  private enemies: any[] = []
  private participants: any[] = []

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
    for (let i = 0; i < numberOfEnemies; i++) {
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
  }

  /**
   * Plays the tournament.
   */
  public playTournament(): void {
    // TODO: Implementation
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
