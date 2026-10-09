import { Character } from './Character.js'

/**
 * Represents an enemy character in the game, extending the base Character class.
 */
export class Enemy extends Character {


  constructor(EnemyArray: CharacterInfo[]) {
    super(...EnemyArray)
  }
}