import { CharacterClasses } from './tournamentRpgCharacter/characterClasses.js'
import { Races } from './tournamentRpgCharacter/Race.js'
import { Dice } from 'rpg-fight-encounter'
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
   * The Counstructor goes through the process of creating a character.
   *
   * @param name - The name of the user given to the character.
   */
  constructor(name: string) {
    this.characterSettings.name = name
    this.createStats()
    this.chooseClass()
    this.chooseRace()
  }

  /**
   * Gives away the object of the character.
   *
   * @returns The settings of the character
   */
  public getCharacterSettings() {
    return this.characterSettings
  }

  /**
   * Creates
   */
  createStats() {
    const dice = new Dice()
      this.characterSettings.stats = {
        strength: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        dexterity: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        constitution: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        intelligence: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
        wisdom: dice.rollDice(3, 6).reduce((a, b) => a + b, 0),
      }
  }

  /**
   *
   */
  chooseClass() {
    for (const [characterClass, classData] of Object.entries(CharacterClasses)) {
      console.log(`${characterClass}:`)
      console.log(`strengthbonus: ${classData.strengthBonus}`)
      console.log(`dexteritybonus: ${classData.dexterityBonus}`)
      console.log(`constitutionbonus: ${classData.constitutionBonus}`)
      console.log(`intelligencebonus: ${classData.intelligenceBonus}`)
      console.log(`wisdombonus: ${classData.wisdomBonus}\n`)
    }
    let characterClassChoice
    do {
      characterClassChoice = parseInt(readlineSync.question('Enter your choice: '))
      if (isNaN(characterClassChoice) || characterClassChoice < 1 || characterClassChoice > 4) {
        console.log('Invalid choice. Please try again.')
      }
    } while (isNaN(characterClassChoice) || characterClassChoice < 1 || characterClassChoice > 4)

    switch (characterClassChoice) {
      case 1:
        characterSettings.characterClass = CharacterClasses.FIGHTER
        break
      case 2:
        characterSettings.characterClass = CharacterClasses.ROGUE
        break
      case 3:
        characterSettings.characterClass = CharacterClasses.MAGE
        break
      case 4:
        characterSettings.characterClass = CharacterClasses.CLERIC
        break
      default:
        console.log('Invalid choice. Please try again.')
        break
    }
  }

  /**
   *
   */
  chooseRace() {
      for (const [Race, raceData] of Object.entries(Races)) {
        console.log(`${Race}:`)
        console.log(`strengthbonus: ${raceData.strengthBonus}`)
        console.log(`dexteritybonus: ${raceData.dexterityBonus}`)
        console.log(`constitutionbonus: ${raceData.constitutionBonus}`)
        console.log(`intelligencebonus: ${raceData.intelligenceBonus}`)
        console.log(`wisdombonus: ${raceData.wisdomBonus}\n`)
      }
      let raceChoice
      do {
        raceChoice = parseInt(readlineSync.question('Enter your choice: '))
        if (isNaN(raceChoice) || raceChoice < 1 || raceChoice > 5) {
          console.log('Invalid choice. Please try again.')
        }
      } while (isNaN(raceChoice) || raceChoice < 1 || raceChoice > 5)

      switch (raceChoice) {
        case 1:
          this.characterSettings.race = Races.HUMAN
          break
        case 2:
          this.characterSettings.race = Races.ELF
          break
        case 3:
          this.characterSettings.race = Races.DWARF
          break
        case 4:
          this.characterSettings.race = Races.GNOME
          break
        case 5:
          this.characterSettings.race = Races.ORC
          break
        default:
          console.log('Invalid choice. Please try again.')
          break
      }
  }

}
