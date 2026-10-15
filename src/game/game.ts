export class Game {
  private players: any[] = [];
  private enemies: any[] = [];
  private participants: any[] = [];

  constructor() {
    this.players = [];
    this.enemies = [];
    this.participants = [];
  }

  public getParticipants(): any[] {
    return this.participants;
  }
  
  public addPlayer(player: any): void {
    this.players.push(player);
  }

  public addEnemy(enemy: any): void {
    this.enemies.push(enemy);
  }

  public startTournament(): void {
    this.participants = [...this.players, ...this.enemies];
    console.log("Tournament started with participants:", this.participants);
  }


}
