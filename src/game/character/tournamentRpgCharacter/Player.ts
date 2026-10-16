import { Character } from './Character.js'

/**
 * Represents a player character in the game, extending the base Character class.
 */
export class Player extends Character {

  /**
   * Constructs a new Player instance using the provided array of player information.
   *
   * @param PlayerArray An array containing the player's information, which will be passed to the Character constructor.
   */
  constructor(PlayerArray: playerinfo[]) {
    super(...PlayerArray)
    }
}