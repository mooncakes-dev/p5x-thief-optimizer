export interface IStatConfig {
  hp: IStatConfigDescription;
  hp_recovery: IStatConfigDescription;
  hp_percent: IStatConfigDescription;
  atk: IStatConfigDescription;
  atk_percent: IStatConfigDescription;
  def: IStatConfigDescription;
  def_percent: IStatConfigDescription;
  speed: IStatConfigDescription;
  sp: IStatConfigDescription;
  sp_recovery: IStatConfigDescription;
  damage_mult: IStatConfigDescription;
  crit_rate: IStatConfigDescription;
  crit_mult: IStatConfigDescription;
  pierce_rate: IStatConfigDescription;
  ailment_accuracy: IStatConfigDescription;
}

interface IStatConfigDescription {
  name: string;
  isPercent: boolean;
}

/**
 * Stats definitions
 * Used for deriving a StatType
 * Also used for display purposes
 */
export const STAT_CONFIG: IStatConfig = {
  hp: { name: "HP", isPercent: false },
  hp_recovery: { name: "Hp Recovery %", isPercent: true },
  hp_percent: { name: 'HP%', isPercent: true },
  atk: { name: 'ATK', isPercent: false },
  atk_percent: { name: 'ATK %', isPercent: true },
  def: { name: 'DEF', isPercent: false },
  def_percent: { name: 'DEF %', isPercent: true },
  speed: { name: 'Speed', isPercent: false },
  sp: { name: 'SP', isPercent: false },
  sp_recovery: { name: 'SP Recovery %', isPercent: true },
  damage_mult: { name: 'Damage Mult', isPercent: true },
  crit_rate: { name: 'Crit Rate', isPercent: true },
  crit_mult: { name: 'Crit Mult', isPercent: true },
  pierce_rate: { name: 'Pierce Rate', isPercent: false },
  ailment_accuracy: { name: 'Ailment Accuracy', isPercent: true },
} as const;

export type StatType = keyof typeof STAT_CONFIG;

// A single stat entry used by card substats, set bonuses, mindscape boosts etc.
export interface IStatEntry {
  type: StatType;
  value: number;
}

export type Rarity = 1 | 2 | 3 | 4 | 5;
export type CardSlot = 'sun' | 'moon' | 'star' | 'sky' | 'space';
export type ThiefAwareness = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type WeaponForge = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const SlotMainStats: Record<CardSlot, StatType[]> = {
  sun: ['hp'],
  moon: ['atk_percent', 'def_percent', 'hp_percent', 'damage_mult', 'hp_recovery'],
  star: [
    'atk_percent',
    'def_percent',
    'hp_percent',
    'crit_rate',
    'crit_mult',
    'ailment_accuracy'
  ],
  sky: ['atk_percent', 'def_percent', 'hp_percent', 'speed', 'sp_recovery'],
  space: ['atk', 'def']
} as const;

export const SubStatsPool: readonly StatType[] = [
  'atk', 'atk_percent',
  'def', 'def_percent',
  'hp', 'hp_percent',
  'damage_mult',
  'ailment_accuracy',
  'crit_rate', 'crit_mult',
  'speed', 'sp_recovery',
  'pierce_rate'
] as const;