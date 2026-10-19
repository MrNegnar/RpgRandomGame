import { Character } from './Character.js'

/**
 * Represents an enemy character in the game, extending the base Character class.
 */
export class Enemy extends Character {

  /**
   * Constructs a new Enemy instance using the provided array of enemy information.
   *
   * @param characterSettings The settings used to configure the enemy character.
   */
  constructor({ characterSettings }: { characterSettings: any }) {
    super({ characterSettings })
  }
}