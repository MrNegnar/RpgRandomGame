import { Character } from './Character.js'
import type { StatBonuses } from './statBonuses.js'

/**
 * Represents a player character in the game, extending the base Character class.
 */
export class Player extends Character {

  /**
   * Constructs a new Player instance using the provided array of player information.
   *
   * @param characterSettings The settings used to configure the player character.
   */
  constructor({ characterSettings }: { characterSettings: any }) {
    super({ characterSettings })
    this.maxHealth = 12 + constitutionModifier
    this.currentHitpoints = this.maxHealth
  }
}