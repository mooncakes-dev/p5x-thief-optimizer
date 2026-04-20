// revelation-card.schema.ts
import * as v from 'valibot';
import type { StatType, Rarity, CardSlot } from '$lib/db/types';

const statTypeSchema = v.picklist([
	'hp',
	'hp_recovery_percent',
	'atk',
	'def',
	'speed',
	'hp_percent',
	'atk_percent',
	'def_percent',
	'crit_rate',
	'crit_mult',
	'damage_mult',
	'ailment_accuracy',
	'sp_recovery_percent',
	'pierce_rate_percent',
	'effect_hit',
	'effect_res'
] as const) satisfies v.BaseSchema<unknown, StatType, v.BaseIssue<unknown>>;

const raritySchema = v.union([
	v.literal(1),
	v.literal(2),
	v.literal(3),
	v.literal(4),
	v.literal(5)
]) satisfies v.BaseSchema<unknown, Rarity, v.BaseIssue<unknown>>;

const cardSlotSchema = v.picklist([
	'sun',
	'moon',
	'star',
	'sky',
	'space'
] as const) satisfies v.BaseSchema<unknown, CardSlot, v.BaseIssue<unknown>>;

const statSchema = v.object({
	type: statTypeSchema,
	value: v.pipe(v.number(), v.minValue(0, 'Stat value must be non-negative'))
});

export const revelationCardSchema = v.object({
	id: v.optional(v.string()),
	name: v.pipe(v.string(), v.minLength(1, 'Card name is required'), v.maxLength(100)),
	rarity: raritySchema,
	level: v.optional(
		v.pipe(
			v.number(),
			v.integer(),
			v.minValue(0),
			v.maxValue(25, 'Level must be between 0 and 25')
		),
		0
	),

	slot: cardSlotSchema,

	mainStat: v.pipe(
		v.array(statSchema),
		v.minLength(1, 'At least one main stat is required'),
		v.maxLength(2, 'Maximum two main stats allowed')
	),

	subStats: v.optional(
		v.pipe(v.array(statSchema), v.maxLength(4, 'Maximum four substats allowed')),
		[]
	),

	locked: v.optional(v.boolean(), false),
	equipped: v.optional(v.boolean(), false),
	equippedBy: v.optional(v.string()),

	createdAt: v.optional(v.date()),
	updatedAt: v.optional(v.date())
});

export type RevelationCardFormData = v.InferOutput<typeof revelationCardSchema>;

export const revelationCardUpdateSchema = v.partial(revelationCardSchema);

export type RevelationCardUpdateData = v.InferOutput<typeof revelationCardUpdateSchema>;
