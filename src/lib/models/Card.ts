import type P5XDatabase from '$lib/P5XDatabase';
import { Entity } from 'dexie';
import type { CardSlot, Rarity, StatType } from './types';

export interface ICard {
	id: string;
	image: string;
	slot: CardSlot;
	rarity: Rarity;
	set: string;
	level: number;
	mainStat: IStat[];
	subStats: IStat[];
	locked: boolean;
	equippedTo: string | null;
}

interface IStat {
	type: StatType;
	value: number;
}

export class Card extends Entity<P5XDatabase> implements ICard {
	id!: string;
	image!: string;
	slot!: CardSlot;
	rarity!: Rarity;
	set!: string;
	level!: number;
	mainStat!: IStat[];
	subStats!: IStat[];
	locked!: boolean;
	equippedTo!: string | null;

	async toggleLocked() {
		this.locked = !this.locked;
		await this.db.cards.update(this.id, { locked: this.locked });
	}

	async getEquippedThief() {
		if (!this.equippedTo) return null;
		return await this.db.thieves.get(this.equippedTo);
	}

	toJSON() {
		return {
			id: this.id,
			slot: this.slot,
			rarity: this.rarity,
			set: this.set,
			level: this.level,
			mainStat: this.mainStat,
			subStats: this.subStats,
			locked: this.locked,
			equippedTo: this.equippedTo
		};
	}
}
