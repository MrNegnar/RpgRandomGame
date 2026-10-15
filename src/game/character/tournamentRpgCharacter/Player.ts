import { Character } from './Character.js'

/**
 * Represents a player character in the game, extending the base Character class.
 */
export class Player extends Character {

  constructor(PlayerArray: playerinfo[]) {
    super(...PlayerArray)
  }

}