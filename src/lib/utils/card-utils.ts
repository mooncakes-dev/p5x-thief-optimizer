import { STAT_CONFIG, type StatType } from '$lib/db/types';

const images = import.meta.glob('$lib/assets/**/*.{png,svg,webp}', {
	eager: true,
	query: '?url',
	import: 'default'
});

export const ALL_STAT_TYPES = Object.keys(STAT_CONFIG) as StatType[];

export function resolveAssetImage(name: string, folder: string): string | undefined {
	return Object.entries(images).find(([p]) => p.includes(folder) && p.includes(name))?.[1] as
		| string
		| undefined;
}

export function availableSubStats(
	rowIndex: number,
	mainStatType: StatType | '',
	subRows: { type: StatType | '' }[]
): StatType[] {
	const used = new Set<string>();
	if (mainStatType) used.add(mainStatType);
	subRows.forEach((r, i) => {
		if (i !== rowIndex && r.type) used.add(r.type);
	});
	return ALL_STAT_TYPES.filter((t) => !used.has(t));
}
