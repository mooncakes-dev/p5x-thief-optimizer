export interface ICard {
	id: string;
	image: string;
	slot: 'sun' | 'moon' | 'star' | 'sky' | 'space';
	rarity: 2 | 3 | 4 | 5;
	set: string;
	level: number;
	mainStat: IMainStat;
	substats: ISubStat[];
	locked: boolean;
	equippedTo: string | null;
}

interface IMainStat {
	type: string;
	value: number;
}

interface ISubStat {
	type: string;
	value: number;
}
