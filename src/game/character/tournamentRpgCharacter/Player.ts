import { Character } from './Character.js'
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
   * @param characterSettings The settings used to configure the player character, of type `settings`.
   */
  constructor(characterSettings: any) {
    super(
      characterSettings.name,
      characterSettings.armor,
      {
        strength:
          characterSettings.stats.strength +
          characterSettings.race.strengthBonus +
          characterSettings.characterClass.strengthBonus,
        dexterity:
          characterSettings.stats.dexterity +
          characterSettings.race.dexterityBonus +
          characterSettings.characterClass.dexterityBonus,
        constitution:
          characterSettings.stats.constitution +
          characterSettings.race.constitutionBonus +
          characterSettings.characterClass.constitutionBonus,
        intelligence:
          characterSettings.stats.intelligence +
          characterSettings.race.intelligenceBonus +
          characterSettings.characterClass.intelligenceBonus,
        wisdom:
          characterSettings.stats.wisdom +
          characterSettings.race.wisdomBonus +
          characterSettings.characterClass.wisdomBonus
      }
    )
    this.race = characterSettings.race
    this.class = characterSettings.characterClass
  }

  /**
   * Returns the race  of the character
   *
   * @returns Returns the race of the character
   */
  public getRace(): typeof Races[keyof typeof Races] {
    return this.race
  }
  
  /**
   * Returns the class of the character
   *
   * @returns Returns the class of the character
   */
  public getClass(): typeof CharacterClasses[keyof typeof CharacterClasses] {
    return this.class
  }
}