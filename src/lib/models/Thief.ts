import type P5XDatabase from '$lib/P5XDatabase';
import { Entity } from 'dexie';
import type { ICard } from './BaseCardData';

export interface IThief {
	id: string;
	image: string;
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
	image: string;
	name: string;
	rariry: 2 | 3 | 4 | 5;
	lvl: number;
	forgeLvl: number;
}

export class Thief extends Entity<P5XDatabase> implements IThief {
	id!: string;
	image!: string;
	name!: string;
	lvl!: number;
	awareness!: number;
	baseStats!: IThief['baseStats'];
	skills!: IThief['skills'];
	equippedCards!: IThief['equippedCards'];
	weapon!: IThief['weapon'];

	async updateLevel(newLevel: number) {
		this.lvl = newLevel;
		await this.db.thieves.update(this.id, { lvl: newLevel });
	}

	async updateAwareness(newAwareness: number) {
		this.awareness = newAwareness;
		await this.db.thieves.update(this.id, { awareness: newAwareness });
	}

	async updateBaseStats(updatedStats: IBaseStats) {
		this.baseStats = updatedStats;
		await this.db.thieves.update(this.id, { baseStats: updatedStats });
	}

	toJSON() {
		return {
			id: this.id,
			image: this.image,
			name: this.name,
			lvl: this.lvl,
			awareness: this.awareness,
			baseStats: this.baseStats,
			skills: this.skills,
			equippedCards: this.equippedCards,
			weapon: this.weapon
		};
	}
}
