import type { ICard } from './BaseCardData';

enum StatLabel {
	Hp = 'HP',
	Attack = 'Attack',
	Defence = 'Defence',
	Speed = 'Speed',
	SPRecovery = 'SP Recovery',
	DmgMult = 'Damage Multiplier',
	CritRate = 'Crit Rate',
	CritDmg = 'Crit Dmg',
	PierceRate = 'Pierce Rate',
	EffectHit = 'Effective Hit',
	EffectRes = 'Effective Resistance'
}

export interface IThief {
	id: string;
	name: string | '';
	lvl: number | 0;
	awareness: number | 0;
	baseStats: IBaseStats | null;
	skills: ISkill[] | [];
	equippedCards: IEquippedCards | null;
	weapon: IWeapon | null;
}

export interface IBaseStats {
	hp: number;
	attack: number;
	def: number;
	speed: number;
	spRecovery: number;
	dmgMult: number;
	critRate: number;
	critDmg: number;
	pierceRate: number;
	effectHit: number;
	effectRes: number;
}

interface ISkill {
	name: string;
	level: number;
}

interface IEquippedCards {
	sun: ICard | null;
	moon: ICard | null;
	star: ICard | null;
	sky: ICard | null;
	space: ICard | null;
}

export interface IWeapon {
	name: string;
	rariry: 2 | 3 | 4 | 5;
	lvl: number;
	forgeLvl: number;
}
