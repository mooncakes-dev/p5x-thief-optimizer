<script lang="ts">
	import { type StatType, type CardSlot, SlotMainStats } from '$lib/models/types';
	import { slotToIcon, availableSubStats } from '$lib/utils/card-utils';

	import {
		revelationCardSchema,
		type RevelationCardFormData
	} from '$lib/schemas/revelation-card.schema';

	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import StatInputRow from '$lib/components/stat-input-row.svelte';

	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import * as v from 'valibot';

	let { cardSlot, prefilledName }: { cardSlot: CardSlot; prefilledName: string } = $props();

	const isFixed = $derived(cardSlot === 'sun' || cardSlot === 'space');
	const mainStatOptions = $derived(SlotMainStats[cardSlot] ?? []);

	type SubRow = { type: StatType | ''; value: number | '' };
	let subRows = $state<SubRow[]>([
		{ type: '', value: '' },
		{ type: '', value: '' },
		{ type: '', value: '' },
		{ type: '', value: '' }
	]);

	let selectedMainStatType = $derived<StatType | ''>(mainStatOptions[0] ?? '');
	let mainStatValue = $state(0);

	const initialMainStat = $derived<RevelationCardFormData['mainStat']>(
		cardSlot === 'sun'
			? [{ type: 'hp', value: 1080 }]
			: cardSlot === 'space'
				? [
						{ type: 'atk', value: 359 },
						{ type: 'def', value: 359 }
					]
				: [{ type: mainStatOptions[0] ?? 'atk_percent', value: 0 }]
	);

	const form = superForm<RevelationCardFormData>(
		{
			name: prefilledName,
			rarity: 5,
			level: 25,
			slot: cardSlot,
			mainStat: [],
			subStats: [],
			locked: false,
			equipped: false
		},
		{
			validators: valibotClient(revelationCardSchema),
			SPA: true,
			dataType: 'json',
			onUpdate: ({ cancel }) => {
				const cardData = {
					name: prefilledName ?? '',
					rarity: 5 as const,
					level: 25,
					slot: cardSlot,
					mainStat: isFixed
						? initialMainStat
						: [{ type: selectedMainStatType as StatType, value: mainStatValue }],
					subStats: subRows
						.filter((r) => r.type !== '')
						.map((r) => ({ type: r.type as StatType, value: Number(r.value) || 0 })),
					locked: false,
					equipped: false
				};

				const result = v.safeParse(revelationCardSchema, cardData);

				if (!result.success) {
					cancel();
					toast.error(result.issues[0]?.message ?? 'Please fix the errors before saving');
					return;
				}

				console.log('Submit:', result.output);
				// TODO: upsert by slot, not add — e.g. cardStore.set(cardSlot, result.output)
				// Each card slot is rendered as its own instance, so saving the same slot
				// twice should replace the existing entry rather than append a duplicate.
				toast.success('Card saved successfully');
			}
		}
	);

	const { form: formData, enhance, submitting, errors } = form;

	$effect(() => {
		$formData.name = prefilledName ?? '';
	});
</script>

<Card.Root class="w-72 flex-shrink-0">
	<form method="POST" use:enhance>
		<Card.Header class="px-3 pt-3 pb-2">
			<div class="flex items-center gap-2">
				<img
					src={slotToIcon(cardSlot, 'slot_icons')}
					alt={`${cardSlot} card slot`}
					class="h-5 w-5"
				/>
				<span class="text-sm font-semibold capitalize">{cardSlot}</span>
				{#if prefilledName}
					<span class="ml-auto text-xs text-muted-foreground">{prefilledName}</span>
				{/if}
			</div>
		</Card.Header>

		<Separator />

		<Card.Content class="space-y-3 px-3 py-3">
			<div class="space-y-1.5">
				<p class="text-xs font-medium text-muted-foreground">Main Stat</p>

				{#if cardSlot === 'sun'}
					<div class="flex items-center justify-between rounded-md bg-muted/50 px-3 py-1.5">
						<span class="text-sm">HP</span>
						<span class="text-sm font-semibold">1080</span>
					</div>
				{:else if cardSlot === 'space'}
					<div class="space-y-1">
						<div class="flex items-center justify-between rounded-md bg-muted/50 px-3 py-1.5">
							<span class="text-sm">ATK / DEF</span>
							<span class="text-sm font-semibold">359</span>
						</div>
					</div>
				{:else}
					<div class="space-y-1">
						<StatInputRow
							bind:statType={selectedMainStatType}
							bind:value={mainStatValue}
							options={mainStatOptions}
							error={!!$errors.mainStat}
						/>
						{#if $errors.mainStat?._errors}
							<p class="text-[10px] text-destructive">{$errors.mainStat._errors[0]}</p>
						{/if}
					</div>
				{/if}
			</div>

			<Separator />

			<div class="space-y-1.5">
				<p class="text-xs font-medium text-muted-foreground">Sub Stats</p>

				{#each subRows as row, i}
					<StatInputRow
						bind:statType={subRows[i].type}
						bind:value={subRows[i].value}
						options={availableSubStats(i, selectedMainStatType, subRows)}
						placeholder="Sub {i + 1}…"
						disabled={!row.type}
					/>
				{/each}
			</div>
		</Card.Content>

		<Card.Footer class="flex flex-col gap-1.5 px-3 pt-0 pb-3">
			{#if !prefilledName}
				<p class="text-center text-sm text-muted-foreground">Select a card set above to save</p>
			{/if}
			<Button type="submit" size="sm" class="w-full" disabled={$submitting || !prefilledName}>
				Save Card
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
