import type { Thief, IThief } from '$lib/db/Thief';
import { db } from '$lib/db';

export class ThiefStore {
	thieves = $state<Thief[]>([]);
	isLoading = $state(true);

	constructor() {
		this.load();
	}

	async load() {
		this.isLoading = true;
		try {
			this.thieves = await db.thieves.toArray();
		} catch (error) {
			console.error('Failed to load thieves', error);
		} finally {
			this.isLoading = false;
		}
	}

	async add(thief: IThief) {
		await db.thieves.add(thief);
		await this.load();
	}

	async update(id: string, thief: Partial<IThief>) {
		await db.thieves.update(id, { ...thief });
		await this.load();
	}

	async remove(id: string) {
		await db.thieves.delete(id);
		await this.load();
	}

	async getById(id: string) {
		return await db.thieves.get(id);
	}

	// Export/import functionality for backup to be implemented here pls
}

export const thiefStore = new ThiefStore();
