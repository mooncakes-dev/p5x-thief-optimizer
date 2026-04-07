import type { StatType } from '$lib/models/types';

// interface ICharacterWeights {
// 	base_attributes: IBaseAttributes;
// 	attribute_goals: IAttributeGoals[];
// 	attribute_weights: IAttributeWeights[];
// }

// interface IBaseAttributes {
// 	hidden_ability: IHiddenAbility;
// 	a0: IBaseStats[];
// }

// interface IBaseStats {
// 	StatType: number;
// }

// interface IHiddenAbility {
// 	gained_lvl: number;
// 	stat: {
// 		type: StatType,
// 		value: number
//     };
// }

// interface IAttributeGoals {
// 	a0: IAttributeGoalsStats;
// }

// interface IAttributeGoalsStats {
//     StatType?: number;
// }

interface IAttributeWeights {
	StatType?: number;
}

export type { IAttributeWeights };

const JOKER = {
	base_attributes: {
		hidden_ability: {
			gained_lvl: 7,
			stat: {
				type: 'atk_percent',
				value: 29
			}
		},
		a0: [{ hp: 3270 }, { atk: 1180 }, { def: 560 }]
	},
	attribute_goals: {
		a0: {
			atk: 2960,
			damage_mult: 43,
			crit_rate: 37,
			crit_mult: 177
		}
	},
	attribute_weights: {
		crit_rate: 2.0,
		crit_mult: 2.0,
		atk: 0.5,
		atk_percent: 1.5,
		damage_mult: 1.5,
		pierce_rate_percent: 1.5
	}
};

const VIOLET = {
		base_attributes: {
		hidden_ability: {
			gained_lvl: 7,
			stat: {
				type: 'atk_percent',
				value: 29
			}
		},
		a0: [{ hp: 3390 }, { atk: 1160 }, { def: 560 }]
	},
	attribute_goals: {
		a0: {
			atk: 1160,
			damage_mult: 43,
			crit_rate: 37,
			crit_mult: 177
		}
	},
	attribute_weights: {
		crit_mult: 2.0,
		pierce_rate_percent: 1.5,
		crit_rate_percent: 1.5,
		atk: 1.0,
		damage_mult: 1.0,
	}
}

export const CHARACTER_WEIGHTS: Record<string, any> = {
	Joker: JOKER,
	Vilet: VIOLET
};
