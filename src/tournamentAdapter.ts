import { Participant } from 'tournament-scheduler'
import type { Character } from './game/character/tournamentRpgCharacter/Character.js'

export type TournamentRoster = {
  participants: Participant[]
  characterByParticipant: Map<Participant, Character>
}

/**
 * Creates a tournament roster from an array of characters.
 *
 * @param characters The array of characters to be included in the tournament.
 * @returns {TournamentRoster} The tournament roster containing participants and a mapping of participants to characters.
 */
export function createTournamentRoster(characters: Character[]): TournamentRoster {
  const characterByParticipant = new Map<Participant, Character>()

  const participants = characters.map((character) => {
    const participant = new Participant(character.getName())
    characterByParticipant.set(participant, character)
    return participant
  })

  return { participants, characterByParticipant }
}
