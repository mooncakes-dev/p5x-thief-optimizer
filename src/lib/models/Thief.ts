import type P5XDatabase from '$lib/P5XDatabase';
import { Entity } from 'dexie';
import type { ICard } from './Card';
import type { Rarity, ThiefAwareness, WeaponForge } from './types';
import {
	CHARACTER_WEIGHTS,
	type IAttributeWeights,
	type ICharacterWeights
} from '$lib/constants/character-weights';

export interface IThief {
	id: string;
	image: string;
	name: string | '';
	lvl: number | 0;
	awareness: ThiefAwareness;
	baseStats: IBaseStats | null;
	userStats: IBaseStats | null;
	recommendedStats: IBaseStats | null;
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
	sun: string | null;
	moon: string | null;
	star: string | null;
	sky: string | null;
	space: string | null;
}

export interface IWeapon {
	image: string;
	name: string;
	rariry: Rarity;
	lvl: number;
	forgeLvl: WeaponForge;
}

export class Thief extends Entity<P5XDatabase> implements IThief {
	id!: string;
	image!: string;
	name!: string;
	lvl!: number;
	awareness!: ThiefAwareness;
	baseStats!: IThief['baseStats'];
	userStats!: IThief['baseStats'];
	recommendedStats!: IThief['recommendedStats'];
	skills!: IThief['skills'];
	equippedCards!: IThief['equippedCards'];
	weapon!: IThief['weapon'];

	async updateLevel(newLevel: number) {
		this.lvl = newLevel;
		await this.db.thieves.update(this.id, { lvl: newLevel });
	}

	async updateAwareness(newAwareness: ThiefAwareness) {
		this.awareness = newAwareness;
		await this.db.thieves.update(this.id, { awareness: newAwareness });
	}

	async updateBaseStats(updatedStats: IBaseStats) {
		this.baseStats = updatedStats;
		await this.db.thieves.update(this.id, { baseStats: updatedStats });
	}

	/**
	 * Set a revelation card in a defined slot and create a db relationship between the card and the thief
	 * @param cardId card's id that links to the ICard object
	 * @param slot 'sun' | 'moon' | 'star' | 'sky' | 'space'
	 */
	async equipCard(cardId: string, slot: keyof IEquippedCards) {
		if (!this.equippedCards) {
			this.equippedCards = {
				sun: null,
				moon: null,
				star: null,
				sky: null,
				space: null
			};
		}

		const previousCardId = this.equippedCards[slot];
		if (previousCardId) {
			await this.db.cards.update(previousCardId, { equippedTo: null });
		}

		this.equippedCards[slot] = slot;
		await this.db.cards.update(cardId, { equippedTo: this.id });
		await this.db.thieves.update(this.id, { equippedCards: this.equippedCards });
	}

	/**
	 * Unequip a revelation card from a defined slot and remove a db relationship between the card and the thief
	 * @param slot 'sun' | 'moon' | 'star' | 'sky' | 'space'
	 * @returns void
	 */
	async unequipCard(slot: keyof IEquippedCards): Promise<void> {
		if (!this.equippedCards) return;

		const cardId = this.equippedCards[slot];
		if (cardId) {
			await this.db.cards.update(cardId, { equippedTo: null });
			this.equippedCards[slot] = null;
			await this.db.thieves.update(this.id, { equippedCards: this.equippedCards });
		}
	}

	/**
	 * Get all of the eqipped cards and their values
	 * @returns array of ICard objects with their respective values
	 */
	async getEquippedCards(): Promise<ICard[]> {
		if (!this.equippedCards) return [];

		const cardIds = Object.values(this.equippedCards).filter(Boolean) as string[];
		const cards = await this.db.cards.bulkGet(cardIds);

		return cards.filter(Boolean) as ICard[];
	}

	/**
	 * Get card information for a particular slot
	 * @param slot 'sun' | 'moon' | 'star' | 'sky' | 'space'
	 * @returns ICard object with values unique to that card
	 */
	async getCardInSlot(slot: keyof IEquippedCards): Promise<ICard | null> {
		const cardId = this.equippedCards?.[slot];
		if (!cardId) return null;

		return (await this.db.cards.get(cardId)) || null;
	}

	calculateCardScore(card: ICard, thief: IThief) {
		if (!card) return 0;

		const thiefWeights = this.getThiefWeights(thief);
		let totalScore = 0;

		for (const stat of [...card.mainStat, ...card.subStats]) {
			const weight = thiefWeights.attribute_weights[stat.type as keyof IAttributeWeights];

			if (weight) {
				const attributeScore = stat.value * weight;
				totalScore += attributeScore;
			}
		}

		totalScore = Math.round(totalScore * 100) / 100;

		return totalScore;
	}

	getThiefWeights(thief: IThief): ICharacterWeights {
		const name = thief.name;
		const weights = CHARACTER_WEIGHTS[name];

		return weights;
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
