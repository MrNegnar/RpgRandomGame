# Test Report

## Summary

The application was tested automatically with Vitest. The test suite covers the functional requirements listed as R1–R7 in the README. It checks character setup, enemy definitions, roster management, combat state, attacks through the DnD fight module, tournament participant mapping, and HP persistence between fights.

The hardest part is just to decide what to acually have as a requierment. Make a test for it is mostly fun, even though it can take some time because how mocking is kind of new to me still.
The manual test are a lot of fun, sadly i made it a little to much of a last minute thing. I want to test the app more, because thats the game, right.

Run the tests and TypeScript type check from the project root:

```bash
npm run test:run
npm run typecheck
```

The latest run completed with 23 passing tests, and TypeScript type checking completed without errors. The interactive menu and a complete tournament were not exercised by this automated test suite.

## Test Results

| Test case | Requirement | Input | Expected outcome | Actual outcome |
| --------- | ----------- | ----- | ---------------- | -------------- |
| Player name and starting HP | R1 | Create a player with a name and character settings | The player has the configured name and calculated starting HP | ✅ Passed |
| Player class/race bonuses and derived stats | R1 | Create Fighter/Human, Rogue/Elf, and Fighter/Gnome players with known base stats | Modifiers, speed, evasion, and maximum HP include the applicable bonuses | ✅ Passed |
| Every enemy definition | R2 | Create an enemy from each entry in `EnemyObject` | Each enemy has the configured name and starting HP | ✅ All enemy definitions passed |
| Add and reset roster | R3 | Add a player and enemy, then reset the game | The game returns the added characters and all roster lists are empty after reset | ✅ Passed |
| Roster getters return copies | R3 | Remove entries from arrays returned by the game | The game's internal player and enemy lists remain unchanged | ✅ Passed |
| Character damage, death, healing, armor, and evasion | R4 | Apply ordinary and lethal damage, healing above maximum HP, and armor/evasion actions | HP and defensive values update correctly; HP stays between zero and maximum HP | ✅ Passed |
| Missed attack advances the encounter | R5 | Force the player's first attack roll to miss during a fight | The encounter continues, the opponent gets a turn, and the player later gets further turns | ✅ Passed |
| Successful attack applies damage | R5 | Force an attack to hit against a Goblin | Target HP decreases by the d4 roll plus strength modifier, minus target armor | ✅ Passed |
| Map scheduler participants to characters | R6 | Convert a player and an enemy into tournament participants | Each participant maps back to its original character | ✅ Passed |
| Map characters with duplicate names | R6 | Convert two Goblins with the same name | Participants remain distinct and each maps to the correct Goblin object | ✅ Passed |
| Keep HP between fights | R7 | Damage a character, then construct another fight with that same object | The character retains its remaining HP; it does not regain full HP | ✅ Passed |

## Known Issues in Third-Party Modules

The `tournament-scheduler` package does not provide TypeScript declaration files. The application uses a local declaration file to describe the package API to TypeScript. No runtime issue with the scheduler was identified by the tests listed above.

## Manual testing notes

Fill in this section with any manual checks performed through the application. No requirement ID is needed here unless the check corresponds to one of the functional requirements above.

| Scenario | Input and actions | Expected outcome | Actual outcome |
| -------- | ----------------- | ---------------- | -------------- |
|  invalid input in main menu  | put in text instead of a number | new chance to write a correct number input | app threw error. i have not put validation around menu |
| invalid input in class choice menu | put in text instead of a number | new chance to write a correct number input | re-promt, i got to make the choice again. |
| invalid input in race choice menu | put in text instead of a number | new chance to write a correct number input | re-promt, i got to make the choice again. |
| invalid input in how many enemies to fight in tournament | put in text instead of a number | new chance to write a correct number input | re-promt, i got to make the choice again. |