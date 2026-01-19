import Dexie, { type EntityTable } from 'dexie';
import type { ICard } from './models/BaseCardData';
import { Thief } from './models/Thief';

export default class P5XDatabase extends Dexie {
	thieves!: EntityTable<Thief, 'id'>;
	cards!: EntityTable<ICard, 'id'>;

	constructor() {
		super('P5XOptimizerDB');

		this.version(1).stores({
			thieves: 'id, name, lvl',
			cards: 'id, slot, rarity, set, level, equippedTo, locked'
		});
		this.thieves.mapToClass(Thief);
	}
}
