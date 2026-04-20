import { db } from '$lib/db';
import type { Card, ICard } from '$lib/db/Card';

export class CardStore {
	cards = $state<Card[]>([]);
	isLoading = $state(true);

	constructor() {
		this.load();
	}

	async load() {
		this.isLoading = true;
		try {
			this.cards = await db.cards.toArray();
		} catch (error) {
			console.error('Failed to load cards', error);
		} finally {
			this.isLoading = false;
		}
	}

	async add(card: ICard) {
		await db.cards.add(card);
		await this.load();
	}

	async update(id: string, card: Partial<ICard>) {
		await db.cards.update(id, { ...card });
		await this.load();
	}

	async remove(id: string) {
		await db.cards.delete(id);
		await this.load();
	}

	async getById(id: string) {
		return await db.cards.get(id);
	}

	// Export/import functionality for backup to be implemented here pls
}

export const cardStore = new CardStore();
