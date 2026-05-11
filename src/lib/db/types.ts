
export const STAT_CONFIG = {
	hp: { name: 'HP', isPercent: false },
	hp_recovery_percent: { name: "Hp Recovery %", isPercent: true },
	atk: { name: 'ATK', isPercent: false },
	def: { name: 'DEF', isPercent: false },
	speed: { name: 'Speed', isPercent: false },
	hp_percent: { name: 'HP%', isPercent: true },
	atk_percent: { name: 'ATK%', isPercent: true },
	def_percent: { name: 'DEF%', isPercent: true },
	crit_rate: { name: 'Crit Rate', isPercent: true },
	crit_mult: { name: 'Crit Mult', isPercent: true },
	damage_mult: { name: 'Damage Mult', isPercent: true },
	ailment_accuracy: { name: 'Ailment Accuracy', isPercent: true },
	sp_recovery: { name: 'SP Recovery %', isPercent: true },
	pierce_rate: { name: 'Pierce Rate %', isPercent: true },
	effect_hit: { name: 'Effect Hit', isPercent: true },
	effect_res: { name: 'Effect RES', isPercent: true }
} as const;

export type StatType = keyof typeof STAT_CONFIG;
export type StatTypeName = (typeof STAT_CONFIG)[StatType]['name'];

export type CardSlot = 'sun' | 'moon' | 'star' | 'sky' | 'space';
export type ThiefAwareness = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type WeaponForge = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const SlotMainStats: Partial<Record<CardSlot, StatType[]>> = {
	sun: ['hp'],
	moon: ['atk_percent', 'def_percent', 'hp_percent', 'damage_mult', 'hp_recovery_percent'],
	star: [
		'atk_percent',
		'def_percent',
		'hp_percent',
		'crit_rate',
		'crit_mult',
		'ailment_accuracy'
	],
	sky: ['atk_percent', 'def_percent', 'hp_percent', 'speed', 'sp_recovery']
} as const;

// Helper functions
export function getStatTypeName(statType: StatType): StatTypeName {
	return STAT_CONFIG[statType].name;
}

export function isPercentStat(statType: StatType): boolean {
	return STAT_CONFIG[statType].isPercent;
}

