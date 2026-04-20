# Changelog

## [Unreleased]

### Added

- v1.0 Add domain level folder for all of the types.
- v1.0 Add common stat and icon mappings.

### Changed

- Moved STAT_CONFIG into a shared domain folder to allow for common language between types.
- Moved Thief interface into the `IGameThief` on the domain level `domain/types/game.ts`.
- Renamed `models` to `db` since all of the functionality there is scoped to Dexie and DB interactions.

### Removed

- Removed effective hit and effective resistances because those are no longer on the in-game stats.