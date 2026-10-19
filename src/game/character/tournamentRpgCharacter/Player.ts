import { Character } from './Character.js'
import type { StatBonuses } from './statBonuses.js'
import { Races } from './Race.js'
import { CharacterClasses } from './characterClasses.js'

/**
 * Represents a player character in the game, extending the base Character class.
 */
export class Player extends Character {

  private race: typeof Races[keyof typeof Races];
  private class: typeof CharacterClasses[keyof typeof CharacterClasses];

  /**
   * Constructs a new Player instance using the provided array of player information.
   *
   * @param characterSettings The settings used to configure the player character.
   */
  constructor(characterSettings: CharacterSettings) {
    super(characterSettings)
    this.race = Races[race]
    this.class = CharacterClasses[characterClass]
  }
}