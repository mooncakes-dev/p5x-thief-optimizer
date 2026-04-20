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
  sp_recovery_percent: IStatConfigDescription;
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

// Stats dictionary. Used for deriving a StatType, and display purposes to keep it consistent.
export const STAT_CONFIG: IStatConfig = {
  hp: { name: "HP", isPercent: false },
  hp_recovery: { name: "Hp Recovery %", isPercent: true },
  hp_percent: { name: 'HP%', isPercent: true },
  atk: { name: 'ATK', isPercent: false },
  atk_percent: { name: 'ATK %', isPercent: true },
  def: { name: 'DEF', isPercent: false },
  def_percent: { name: 'DEF', isPercent: true },
  speed: { name: 'Speed', isPercent: false },
  sp: { name: 'SP', isPercent: false },
  sp_recovery_percent: { name: 'SP Recovery %', isPercent: true },
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
