<script lang="ts">
	import type { ICard } from '$lib/models/Card';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { STAT_CONFIG, type StatType, SlotMainStats } from '$lib/models/types';
	import { availableSubStats, resolveAssetImage } from '$lib/utils/card-utils';
	import type { Thief } from '$lib/models/Thief';
	import type { IAttributeWeights } from '$lib/constants/character-weights';
	import { Star, Pencil } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import StatInputRow from '$lib/components/stat-input-row.svelte';

	interface Props {
		card: ICard;
		thief: Thief;
	}

	const { card, thief }: Props = $props();

	let isEditing = $state(false);

	const isFixed = $derived(card.slot === 'sun' || card.slot === 'space');
	const mainStatOptions = $derived(SlotMainStats[card.slot] ?? []);

	type SubRow = { type: StatType | ''; value: number | '' };

	let editMainStatType = $state<StatType | ''>('');
	let editMainStatValue = $state<number | ''>(0);
	let editSubRows = $state<SubRow[]>([
		{ type: '', value: '' },
		{ type: '', value: '' },
		{ type: '', value: '' },
		{ type: '', value: '' }
	]);

	function startEdit() {
		editMainStatType = card.mainStat[0]?.type ?? '';
		editMainStatValue = card.mainStat[0]?.value ?? 0;
		editSubRows = [
			{ type: card.subStats[0]?.type ?? '', value: card.subStats[0]?.value ?? '' },
			{ type: card.subStats[1]?.type ?? '', value: card.subStats[1]?.value ?? '' },
			{ type: card.subStats[2]?.type ?? '', value: card.subStats[2]?.value ?? '' },
			{ type: card.subStats[3]?.type ?? '', value: card.subStats[3]?.value ?? '' }
		];
		isEditing = true;
	}

	function cancelEdit() {
		isEditing = false;
	}

	function saveEdit() {
		// TODO: actually update the stored cards
		isEditing = false;
	}

	function calculateCardScore(c: ICard) {
		if (!c) return 0;
		return thief.calculateCardScore(c, thief);
	}

	function getStatPriorityClass(statType: StatType): string {
		const thiefWeights = thief.getThiefWeights(thief);
		const weight = thiefWeights.attribute_weights[statType as keyof IAttributeWeights];
		if (!weight) return '';
		if (weight >= 2) return 'text-amber-600';
		if (weight > 1) return 'text-amber-400';
		return '';
	}
</script>

<Card.Root class="">
	<Card.Header>
		<div class="flex items-center gap-2">
			<img
				src={resolveAssetImage(card.slot, 'slot_icons')}
				alt={`${card.slot} card slot`}
				class="h-5 w-5"
			/>
			<div class="">
				<Card.Title>{card.slot}</Card.Title>
				<Card.Description>{card.set}</Card.Description>
			</div>
		</div>
		<Card.Action>
			{#if !isEditing}
				<Button variant="ghost" size="icon" class="ml-auto h-6 w-6" onclick={startEdit}>
					<Pencil size={12} />
				</Button>
			{/if}
		</Card.Action>
	</Card.Header>
	<Separator />

	<Card.Content class="px-3">
		<div class="space-y-3">
			<div class="flex items-center justify-between">
				<span class="text-xs font-medium text-muted-foreground">Rating</span>
				<span class="text-sm font-semibold">{calculateCardScore(card)}%</span>
			</div>

			<Separator />

			<div class="space-y-1.5">
				<p class="text-xs font-medium text-muted-foreground">Main Stat</p>

				{#if isEditing && !isFixed}
					<StatInputRow
						bind:statType={editMainStatType}
						bind:value={editMainStatValue}
						options={mainStatOptions}
					/>
				{:else}
					{#each card.mainStat as stat}
						<div class="flex items-center justify-between rounded-md bg-muted/50 px-3 py-1.5">
							<div class="flex items-center gap-1.5 {getStatPriorityClass(stat.type)}">
								{#if getStatPriorityClass(stat.type)}
									<Star size={12} />
								{/if}
								<span class="text-sm font-semibold">{STAT_CONFIG[stat.type].name}</span>
							</div>
							<span class="text-sm font-semibold"
								>{stat.value}{STAT_CONFIG[stat.type].isPercent ? '%' : ''}</span
							>
						</div>
					{/each}
				{/if}
			</div>

			<Separator />

			<div class="space-y-3">
				<p class="text-xs font-medium text-muted-foreground">Sub Stats</p>
				{#if isEditing}
					{#each editSubRows as row, i}
						<StatInputRow
							bind:statType={editSubRows[i].type}
							bind:value={editSubRows[i].value}
							options={availableSubStats(i, editMainStatType, editSubRows)}
							placeholder="Sub {i + 1}…"
							disabled={!row.type}
						/>
					{/each}
				{:else}
					{#each card.subStats as stat}
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-1.5 {getStatPriorityClass(stat.type)}">
								{#if getStatPriorityClass(stat.type)}
									<Star size={12} />
								{/if}
								<span class="text-sm">{STAT_CONFIG[stat.type].name}</span>
							</div>
							<span class="text-sm font-semibold"
								>{stat.value}{STAT_CONFIG[stat.type].isPercent ? '%' : ''}</span
							>
						</div>
					{/each}
				{/if}
			</div>
			{#if isEditing}
				<div class="flex gap-1.5 pb-3">
					<Button variant="outline" size="sm" class="flex-1" onclick={cancelEdit}>Cancel</Button>
					<Button size="sm" class="flex-1" onclick={saveEdit}>Save</Button>
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>
