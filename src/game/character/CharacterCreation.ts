import { CharacterClasses } from './tournamentRpgCharacter/characterClasses.js'
import { Races } from './tournamentRpgCharacter/Race.js'
import { Dice } from 'rpg-fight-encounter'

  export interface CharacterSettings {
    name: string
    characterClass: (typeof CharacterClasses)[keyof typeof CharacterClasses]
    race: (typeof Races)[keyof typeof Races]
    armor: number
    stats: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
  }
  maxHealth: number
  }

/**
 * Creates full record for a new character
 */
export class Charactercreation {
  private characterSettings = {
    name: '',
    characterClass: undefined as (typeof CharacterClasses)[keyof typeof CharacterClasses] | undefined,
    race: undefined as (typeof Races)[keyof typeof Races] | undefined,
    armor: 1,
    stats: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
  },
  maxHealth: 10
  }

  /**
   * Gives away the object of the character.
   *
   * @returns The settings of the character
   */
  public getCharacterSettings(): object {
    return this.characterSettings
  }

  /**
   * Creates the stats of the charater.
   *
   * @returns stats - the stats of the character.
   */
  createStats(): object {
    const dice = new Dice()
      this.characterSettings.stats = {
        strength: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        dexterity: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        constitution: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        intelligence: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        wisdom: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
      }
    return this.characterSettings.stats
  }

  /**
   * Setting the choosen race as a race in the characterSetting
   *
   * @param classChoice - the choosen class that will be set
   */
  public setClass(classChoice: (typeof CharacterClasses)[keyof typeof CharacterClasses]): void {
    this.characterSettings.characterClass = classChoice
  }

  /**
   * Setting the choosen race as a race in the characterSetting
   *
   * @param raceChoice - the choosen race that will be set
   */
  public setRace(raceChoice: (typeof Races)[keyof typeof Races]): void {
    this.characterSettings.race = raceChoice
  }

}
