import type { IStatEntry, Rarity, StatType } from "$lib/domain/types/shared";

export interface IGameSubstatScaling {
  cardType: 'revelation' | 'space';
  statType: StatType;
  rollValues: [number, number, number, number, number];
}

/**
 * THIEFS
 */

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

/**
 * Stats that do not change with awareness level
 * Only HP, ATK, and DEF are scaling with awareness
 */

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

/**
 * WEAPONS
 */

export interface IGameWeapon {
  id: string;
  name: string;
  thiefId: string;
  rarity: Rarity;
}

/**
 * Revelation Cards
 */

export interface IGameHeavensSet {
  id: string;
  name: string;
  twoPiece: IGameRevelationTwoPiece;
  fourPiece: IGameRevelationFourPiece;
}

export interface IGameRevelationTwoPiece {
  description: string;
  statBoost?: IStatEntry;
}

export interface IGameRevelationFourPiece {
  description: string;
  statBoost?: IStatEntry;
}

export interface IGameSpaceSet {
  id: string;
  name: string;
  compatibleHeavens: IGameSpaceCompatibleHeavensBonus[];
}

export interface IGameSpaceCompatibleHeavensBonus {
  heavensSetId: string;
  description: string;
  statBoost?: IStatEntry;
}

/**
 * Mindscape
 */

export interface IGameMindscapeOuterRing {
  nodes: IGameMindscapeNode[];
}

export interface IGameMindscapeInnerRing {
  thiefId: string;
  statUpgradeOne: IGameMindscapeInnerNode[];
  statUpgradeTwo: IGameMindscapeInnerNode[];
  bellOfStars: IGameMindscapeInnerNode[];
  skillScalingOne: IGameMindscapeInnerNode[];
  skillScalingTwo: IGameMindscapeInnerNode[];
  coreActivation: null;
}

export interface IGameMindscapeNode {
  position: number;
  boosts: IStatEntry[];
}

export interface IGameMindscapeInnerNode {
  level: number;
  boosts: IStatEntry[]
}
