# RPG Random Game

RPG Random Game is a terminal game written in TypeScript. It uses two modules: `rpg-fight-encounter`, my TypeScript combat module, and `tournament-scheduler`, a JavaScript module created by a classmate.

Create a character, enter a single-elimination tournament, and fight randomly generated enemies. Each scheduled match is a one-on-one fight handled by version V_02 of the DnD combat module.

## System requirements

- Node.js 24.12.0 or later
- npm

## Functional requirements and test traceability

The IDs below are used in the root `TEST_REPORT.md` to connect each requirement to one or more test cases.

- **R1 — Player character setup:** A player created from character settings has the selected name, applies class and race bonuses to its stats, and calculates starting and maximum HP from Constitution.
- **R2 — Enemy setup:** An enemy created from an enemy definition uses that definition's name and starting HP.
- **R3 — Game roster management:** The game stores added players and enemies, returns copies of its roster arrays, and can reset the roster for a new tournament.
- **R4 — Character combat state:** Damage reduces HP without taking it below zero, lethal damage marks a character as dead, healing does not exceed maximum HP, and armor/evasion actions raise their values.
- **R5 — Attack resolution:** A missed attack allows the encounter to continue to the opponent's turn. A successful attack reduces the target's HP by damage after the strength modifier and target armor are applied.
- **R6 — Tournament participant mapping:** The tournament adapter maps each scheduler participant back to the correct character, including when characters share a name.
- **R7 — HP between fights:** A character keeps its remaining HP when the same character object is added to a subsequent fight.

## Install and run

```bash
npm install
npm start
```

The application asks for your name and then shows the main menu. Choose **1** to create a character and start a tournament.

## Playing the game

1. The game rolls three six-sided dice for each stat: Strength, Dexterity, Constitution, Intelligence, and Wisdom.
2. Choose a character class and race. Their bonuses are added to the rolled stats.
3. Choose a positive odd number of enemies. Each enemy is randomly selected from the available enemy definitions.
4. Your character and the enemies enter a single elimination tournament.
5. Each match is one-on-one. The player chooses actions on their turn; enemies act automatically.
6. The fight returns its winner to the tournament scheduler. The winner advances until the final produces a tournament champion.

The player can choose to attack, cast an offensive spell, raise armor, raise evasion, heal, or skip a turn. In a one-on-one match, attacks target the opponent and healing targets the acting character.

Character state carries between tournament matches. Winners keep their remaining HP and any armor or evasion increases gained in earlier fights. Starting another tournament from the menu resets the previous roster.

## Tournament size and byes

The game currently asks for an odd number of enemies. With one player, that creates an even total number of participants. However, an even number alone does not guarantee that every participant fights in every round. For example, six participants do not fit evenly into a single elimination bracket all the way to the final, so the scheduler advances some participants without a match in an early round. This is called a **bye**; it is not an elimination.

To have no byes in a single elimination bracket, the total number of participants must be a power of two: 2, 4, 8, 16, and so on. With one player, that means 1, 3, 7, or 15 enemies. The current input accepts any positive odd enemy count, so a bye can still happen for some choices.

## How the modules work together

The RPG characters and the scheduler use different objects for different jobs:

- `Player` and `Enemy` inherit from `Character`. These objects hold the character's stats and changing combat state, such as current HP, armor, and evasion.
- The tournament scheduler works with `Participant` objects. It creates rounds and matches but does not run combat.
- `tournamentAdapter.ts` creates one scheduler participant per character and keeps a map back to the original character object.
- The DnD fight module receives the two characters for a match, runs combat, and returns the winning character.
- The app records that character as the match winner. The scheduler then uses the result to create the next round.

The key handoff in `playTheGame` looks like this:

```ts
const homeCharacter = roster.characterByParticipant.get(homeParticipant)
const awayCharacter = roster.characterByParticipant.get(awayParticipant)

const fight = new FightEncounterHandler<Character, Character>(
  [firstFighter],
  [secondFighter]
)
const winner = fight.goThroughFullFight(choosingOptionDuringFight())

if (winner === homeCharacter) {
  match.recordResult(1, 0)
} else if (winner === awayCharacter) {
  match.recordResult(0, 1)
}
```

The scheduler only needs to know which participant won, so the app records a simple `1–0` or `0–1` result. The fight module is responsible for combat rules and the winner; the tournament scheduler is responsible for who advances.

## Main menu

- **1. Start character creation** — create a character and run a tournament.
- **2. View information about the game** — show a short description of the game and stats.
- **3. Exit** — close the application.

## Project structure

```text
src/
├── app.ts                                      # CLI menus, tournament rounds, and fights
├── tournamentAdapter.ts                       # Maps scheduler participants to RPG characters
├── tournament-scheduler.d.ts                  # TypeScript declarations for the scheduler package
└── game/
    ├── Game.ts                                # Stores and resets players, enemies, and participants
    └── character/tournamentRpgCharacter/
        ├── Character.ts                       # Shared stats, HP, and combat state
        ├── Player.ts                          # Player character and class/race bonuses
        ├── Enemy.ts                           # Enemy character
        ├── Race.ts                            # Race bonuses
        ├── characterClasses.ts                # Class bonuses
        └── enemies.ts                         # Enemy definitions
```

## Screenshots

### Start of app

When you start the game, you enter your name. The game rolls your stats and then offers class and race choices.

![Character creation screen](docs/images/startApp.png)

### End of tournament

During each fight, the player can choose from several actions.
When the tournament ends, the winner is announced.

![Tournament result screen](docs/images/winTournament.png)

## Dependencies

- [rpg-fight-encounter](https://github.com/MrNegnar/DnDModule) — runs V_02 combat and returns the fight winner.
- [tournament-scheduler](https://github.com/nordstrom-a/tournament-scheduler) — creates the single elimination bracket, records match results, and advances winners.
- [readline-sync](https://www.npmjs.com/package/readline-sync) — reads menu choices in the terminal.

## Development commands

```bash
npm run typecheck    # Check TypeScript types without producing files
npm run test:run     # Run tests once
npm test             # Run Vitest in watch mode
npm run build        # Build the application into dist/
npm run lint         # Check source files with ESLint
npm run format:check # Check formatting with Prettier
```

The RPG app has an automated Vitest suite. Run it with `npm run test:run`.

## Author

Created by:
Thomas Landin
Second year student at Linnaeus University, Kalmar.

## License

This project is released under the Unlicense. See [LICENSE](LICENSE) for details.
