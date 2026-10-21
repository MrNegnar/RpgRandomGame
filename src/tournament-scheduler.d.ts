declare module 'tournament-scheduler' {
  export class Participant {
    constructor(name: string, seed?: number | null)

    getName(): string
    getSeed(): number | null
    isSeeded(): boolean
  }
}