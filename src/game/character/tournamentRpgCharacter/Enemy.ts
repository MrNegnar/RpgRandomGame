import { Character } from './Character.js'
import type { EnemyObject } from './enemies.js'

/**
 * Represents an enemy character in the game, extending the base Character class.
 */
export class Enemy extends Character {

  /**
   * Constructs a new Enemy instance using the provided array of enemy information.
   *
   * @param characterSettings The settings used to configure the enemy character.
   */
  constructor(characterSettings: (typeof EnemyObject)[keyof typeof EnemyObject]) {
    super({ ...characterSettings })
  }
}