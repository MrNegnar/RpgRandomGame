/**
 * Represents the main game logic for managing players, enemies, and tournament participants.
 */
export class Game {
  private players: any[] = [];
  private enemies: any[] = [];
  private participants: any[] = [];

  /**
   * Initializes a new instance of the Game class, setting up empty arrays for players, enemies, and participants.
   */
  constructor() {
    this.players = [];
    this.enemies = [];
    this.participants = [];
  }

  /**
   * Returns an array copy of participants currently registered for the tournament.
   *
   * @returns The array of participants in the tournament.
   */
  public getParticipants(): any[] {
    return [...this.participants];
  }

  /**
   * Returns an array copy of players currently added to the game.
   *
   * @returns The array of players in the game.
   */
  public getPlayers(): any[] {
    return [...this.players];
  }

  /**
   * Returns an array copy of enemies currently added to the game.
   *
   * @returns The array of enemies in the game.
   */
  public getEnemies(): any[] {
    return [...this.enemies];
  }

  /**
   * Resets the participants, players, and enemies arrays to empty arrays.
   */
  public resetParticipants(): void {
    this.participants = [];
    this.players = [];
    this.enemies = [];
  }
  
  /**
   * Adds a player to the game.
   *
   * @param player The player to be added to the game.
   */
  public addPlayer(player: {}): void {
    this.players.push(player);
  }

  /**
   * Adds an enemy to the game.
   *
   * @param enemy The enemy to be added to the game.
   */
  public addEnemy(enemy: any): void {
    this.enemies.push(enemy);
  }

  /**
   * Starts the tournament by combining all players and enemies into the participants array.
   * Logs the participants to the console.
   */
  public startTournament(): void {
    this.participants = [...this.players, ...this.enemies];
    console.log("Tournament started with participants:", this.participants);
  }

  /**
   * Starts a fight between the first two participants in the tournament. Logs the fight details to the console.
   * If there are fewer than two participants, the fight will not start.
   */
  public startFight(): void {
    if (this.participants.length < 2) {
      console.log("Not enough participants to start a fight.");
      return;
    }
    const [first, second] = this.participants;
    console.log(`Starting fight between ${first} and ${second}`);
  }

}
