import Dexie, { type EntityTable } from 'dexie';
import { Thief } from './db/Thief';
import { Card } from './db/Card';

export default class P5XDatabase extends Dexie {
	thieves!: EntityTable<Thief, 'id'>;
	cards!: EntityTable<Card, 'id'>;

	constructor() {
		super('P5XOptimizerDB');

		this.version(1).stores({
			thieves: 'id, name, lvl',
			cards: 'id, slot, rarity, set, level, equippedTo, locked'
		});
		this.thieves.mapToClass(Thief);
		this.cards.mapToClass(Card);
	}
}
