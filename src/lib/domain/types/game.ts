import type { IStatEntry } from "./shared";

export interface IGameThief {
  id: string;
  name: string;
  element: string;
  role: string;
  weaponIds: string[];
  fixedStats: IFixedStats;
  scalingStats: IScalingStats;
  hiddenAbility: IHiddenAbility;
}

export interface IFixedStats {
  sp: number;
  damage_mult: number;
  crit_rate: number;
  crit_mult: number;
  speed: number;
  pierce_rate: number;
  ailment_accuracy: number;
}

export interface IScalingStats {
  a0: IScalingStatsLvl;
  a1: IScalingStatsLvl;
  a2: IScalingStatsLvl;
  a3: IScalingStatsLvl;
  a4: IScalingStatsLvl;
  a5: IScalingStatsLvl;
  a6: IScalingStatsLvl;
}

export interface IScalingStatsLvl {
  lvl80: { hp: number, atk: number, def: number };
  lvl100: { hp: number, atk: number, def: number };
}

export interface IHiddenAbility {
  unlockedAtLevel: number;
  boosts: IStatEntry[];
}
