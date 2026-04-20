# Decisions

Keeping myself accountable with the changes that I make and remembering why I make certain decisions.

## [2026-04-19]

- Moving icons assignment into the components folder.
     - This file is concerned with assigning stats to appropriate icons and should live on the presentation level, not on the logic level. 

- Moved STAT_CONFIG into shared.ts for clarity and common language across stats.
    - Part of the migration from the db folder.
    - It is now using a common interface as well to help keep everything consistent.

- All of the types are moved into a folder and are broken down by game, user and shared to keep them separate and avoid cross-pollunation.
    - Separating Thief into a game reference layer vs a user reference layer helps keep data clean. Game reference rarely changes and should be pulled from the defined constants independently from the user saved data. Mixing two has been causing a lot of friction issues.

- Renaming models into a db folder since it is really a DB functionality folder and it has no business storing Thief Interfaces.