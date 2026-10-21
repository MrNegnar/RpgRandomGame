declare module 'tournament-scheduler' {
  export class Participant {
    constructor(name: string, seed?: number | null)

    getName(): string
    getSeed(): number | null
    isSeeded(): boolean
  }

  export class Match {
    getHomeParticipant(): Participant
    getAwayParticipant(): Participant
    getWinner(): Participant | null
    recordResult(homeScore: number, awayScore: number): void
  }

  export class Round {
    getNumber(): number
    getMatches(): Match[]
  }

  export class SingleEliminationScheduler {
    createFirstRound(participants: Participant[]): Round
    createNextRound(): Round
  }
}