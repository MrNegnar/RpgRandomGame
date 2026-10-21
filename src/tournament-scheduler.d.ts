declare module 'tournament-scheduler' {
  /**
   * Represents a participant in the tournament.
   */
  export class Participant {
    /**
     * Creates a new participant with the given name and optional seed.
     *
     * @param name The name of the participant.
     * @param seed The seed of the participant, if any.
     */
    constructor(_name: string, _seed?: number | null)

    /**
     * Gets the name of the participant.
     */
    getName(): string

    /**
     * Gets the seed of the participant, if any.
     */
    getSeed(): number | null

    /**
     * Checks if the participant is seeded.
     */
    isSeeded(): boolean
  }

  /**
   * Represents a match between two participants in the tournament.
   */
  export class Match {
    /**
     * Gets the home participant of the match.
     */
    getHomeParticipant(): Participant

    /**
     * Gets the away participant of the match.
     */
    getAwayParticipant(): Participant

    /**
     * Gets the winner of the match, if any.
     */
    getWinner(): Participant | null

    /**
     * Records the result of the match.
     *
     * @param homeScore The score of the home participant.
     * @param awayScore The score of the away participant.
     */
    recordResult(_homeScore: number, _awayScore: number): void
  }

  /**
   * Represents a round in the tournament, containing multiple matches.
   */
  export class Round {

    /**
     * Gets the number of the round.
     */
    getNumber(): number

    /**
     * Gets the matches in the round.
     */
    getMatches(): Match[]
  }

  /**
   * Schedules the rounds for a single-elimination tournament.
   */
  export class SingleEliminationScheduler {
    /**
     * Creates the first round of the tournament with the given participants.
     *
     * @param participants The participants in the first round.
     */
    createFirstRound(_participants: Participant[]): Round

    /**
     * Creates the next round of the tournament based on the results of the previous round.
     */
    createNextRound(): Round
  }
}