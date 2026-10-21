import { afterEach, describe, expect, it, vi } from 'vitest'
import { Game } from './game/Game.js'
import { Enemy } from './game/character/tournamentRpgCharacter/Enemy.js'
import { EnemyObject } from './game/character/tournamentRpgCharacter/enemies.js'
import { Player } from './game/character/tournamentRpgCharacter/Player.js'
import { CharacterClasses } from './game/character/tournamentRpgCharacter/characterClasses.js'
import { Races } from './game/character/tournamentRpgCharacter/Race.js'
import { createTournamentRoster } from './tournamentAdapter.js'
import { CombatantBehavior } from 'rpg-fight-encounter/src/character/V_02/CombatantBehavior.js'
import { FightEncounterHandler } from 'rpg-fight-encounter/src/encounters/fight/V_02/fightEncounterHandler.js'

function createTestPlayer(): Player {
  return new Player({
    name: 'Test Player',
    characterClass: CharacterClasses.FIGHTER,
    race: Races.HUMAN,
    armor: 1,
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
    },
    maxHealth: 10,
  })
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Player', () => {
  it('applies the class and race bonuses to the character stats', () => {
    const player = createTestPlayer()

    // Strength 10 + Fighter bonus 1 + Human bonus 1 = 12.
    expect(player.getStrengthModifier()).toBe(1)
  })

  it('starts with the configured name and hit points', () => {
    const player = createTestPlayer()

    expect(player.getName()).toBe('Test Player')
    expect(player.getCurrentHitpoints()).toBe(10)
  })
})

describe('Enemy', () => {
  it('uses the selected enemy definition', () => {
    const enemy = new Enemy(EnemyObject.Goblin)

    expect(enemy.getName()).toBe('Goblin')
    expect(enemy.getCurrentHitpoints()).toBe(16)
  })
})

describe('Game', () => {
  it('stores players and enemies that are added to it', () => {
    const game = new Game()
    const player = createTestPlayer()
    const enemy = new Enemy(EnemyObject.Goblin)

    game.addPlayer(player)
    game.addEnemy(enemy)

    expect(game.getPlayers()).toEqual([player])
    expect(game.getEnemies()).toEqual([enemy])
  })

  it('clears the previous tournament participants when reset', () => {
    const game = new Game()
    const player = createTestPlayer()
    const enemy = new Enemy(EnemyObject.Goblin)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    game.addPlayer(player)
    game.addEnemy(enemy)
    game.startTournament()
    game.resetParticipants()

    expect(game.getPlayers()).toEqual([])
    expect(game.getEnemies()).toEqual([])
    expect(game.getParticipants()).toEqual([])
  })
})

describe('createTournamentRoster', () => {
  it('maps each scheduler participant back to its original character', () => {
    const player = createTestPlayer()
    const enemy = new Enemy(EnemyObject.Goblin)
    const roster = createTournamentRoster([player, enemy])

    expect(roster.participants).toHaveLength(2)
    expect(roster.participants.map((participant) => participant.getName())).toEqual(['Test Player', 'Goblin'])
    expect(roster.characterByParticipant.get(roster.participants[0])).toBe(player)
    expect(roster.characterByParticipant.get(roster.participants[1])).toBe(enemy)
  })
})

describe('Character combat state', () => {
  it('reduces hit points when taking damage', () => {
    const player = createTestPlayer()

    player.takeDamage(3)

    expect(player.getCurrentHitpoints()).toBe(7)
    expect(player.isAlive()).toBe(true)
  })

  it('sets hit points to zero and marks the character dead when damage is lethal', () => {
    const player = createTestPlayer()

    player.takeDamage(20)

    expect(player.getCurrentHitpoints()).toBe(0)
    expect(player.isAlive()).toBe(false)
  })

  it('does not heal above the maximum hit points', () => {
    const player = createTestPlayer()

    player.takeDamage(4)
    player.takeHealing(20)

    expect(player.getCurrentHitpoints()).toBe(player.getMaxHealth())
  })

  it('raises armor and evasion by one', () => {
    const player = createTestPlayer()

    player.raiseArmor()
    player.raiseEvasion()

    expect(player.getArmor()).toBe(2)
    expect(player.getEvasion()).toBe(2)
  })
})

describe('Player derived stats', () => {
  it('uses race and class bonuses when calculating dexterity based values', () => {
    const player = new Player({
      name: 'Quick Player',
      characterClass: CharacterClasses.ROGUE,
      race: Races.ELF,
      armor: 1,
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
      },
      maxHealth: 10,
    })

    // Dexterity 10 + Rogue bonus 1 + Elf bonus 2 = 13, giving modifier 1.
    expect(player.getDexterityModifier()).toBe(1)
    expect(player.getSpeed()).toBe(2)
    expect(player.getEvasion()).toBe(2)
  })

  it('adds the constitution bonus to maximum hit points', () => {
    const player = new Player({
      name: 'Healthy Player',
      characterClass: CharacterClasses.FIGHTER,
      race: Races.GNOME,
      armor: 1,
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
      },
      maxHealth: 10,
    })

    // Constitution 10 + Gnome bonus 2 gives one extra maximum HP.
    expect(player.getMaxHealth()).toBe(11)
    expect(player.getCurrentHitpoints()).toBe(11)
  })
})

describe('Enemy definitions', () => {
  for (const enemySettings of Object.values(EnemyObject)) {
    it(`creates ${enemySettings.name} with its configured HP`, () => {
      const enemy = new Enemy(enemySettings)

      expect(enemy.getName()).toBe(enemySettings.name)
      expect(enemy.getCurrentHitpoints()).toBe(enemySettings.maxHealth)
    })
  }
})

describe('Game getters', () => {
  it('returns copies of its player and enemy arrays', () => {
    const game = new Game()
    const player = createTestPlayer()
    const enemy = new Enemy(EnemyObject.Goblin)

    game.addPlayer(player)
    game.addEnemy(enemy)

    game.getPlayers().pop()
    game.getEnemies().pop()

    expect(game.getPlayers()).toEqual([player])
    expect(game.getEnemies()).toEqual([enemy])
  })
})

describe('createTournamentRoster with duplicate character names', () => {
  it('keeps distinct characters linked to distinct participants', () => {
    const firstGoblin = new Enemy(EnemyObject.Goblin)
    const secondGoblin = new Enemy(EnemyObject.Goblin)
    const roster = createTournamentRoster([firstGoblin, secondGoblin])

    expect(roster.participants[0].getName()).toBe('Goblin')
    expect(roster.participants[1].getName()).toBe('Goblin')
    expect(roster.participants[0]).not.toBe(roster.participants[1])
    expect(roster.characterByParticipant.get(roster.participants[0])).toBe(firstGoblin)
    expect(roster.characterByParticipant.get(roster.participants[1])).toBe(secondGoblin)
  })
})

describe('Fight module integration', () => {
  it('continues to the enemy turn after the player misses', () => {
    const player = new Player({
      name: 'High HP player',
      characterClass: CharacterClasses.FIGHTER,
      race: Races.HUMAN,
      armor: 1,
      stats: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10 },
      maxHealth: 100,
    })
    const enemy = new Enemy(EnemyObject.Skeleton)
    const randomValues = [0, 0.999, 0.999, 0.999, 0.999]
    let randomIndex = 0
    vi.spyOn(Math, 'random').mockImplementation(() => randomValues[randomIndex++] ?? 0.999)
    const chooseAction = vi.fn((_character, _allies, opponents) => ({
      type: 'attack' as const,
      target: opponents[0],
    }))
    const fight = new FightEncounterHandler([player], [enemy])

    fight.goThroughFullFight(chooseAction)

    expect(chooseAction).toHaveBeenCalledTimes(5)
    expect(player.getCurrentHitpoints()).toBeLessThan(player.getMaxHealth())
  })

  it('reduces the target HP when an attack hits', () => {
    const attacker = createTestPlayer()
    const target = new Enemy(EnemyObject.Goblin)
    vi.spyOn(Math, 'random').mockReturnValue(0.999)
    const combatantBehavior = new CombatantBehavior()

    combatantBehavior.attack(attacker, target)

    // d4 roll 4 + strength modifier 1 - Goblin armor 1 = 4 damage.
    expect(target.getCurrentHitpoints()).toBe(12)
  })

  it('keeps a characters remaining HP when the character enters another fight', () => {
    const returningPlayer = createTestPlayer()
    const nextOpponent = new Enemy(EnemyObject.Goblin)
    returningPlayer.takeDamage(4)
    const hpBeforeNextFight = returningPlayer.getCurrentHitpoints()

    new FightEncounterHandler([returningPlayer], [nextOpponent])

    expect(returningPlayer.getCurrentHitpoints()).toBe(hpBeforeNextFight)
    expect(returningPlayer.getCurrentHitpoints()).toBe(6)
  })
})
