import { Character } from './Character.js'

/**
 * Represents an enemy character in the game, extending the base Character class.
 */
export class Enemy extends Character {

  /**
   * Constructs a new Enemy instance using the provided array of enemy information.
   *
   * @param EnemyArray An array containing the enemy's information, which will be passed to the Character constructor.
   */
  constructor(EnemyArray: CharacterInfo[]) {
    super(...EnemyArray)
  }
}