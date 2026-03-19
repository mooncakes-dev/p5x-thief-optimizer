<script lang="ts">
	import { Field, Control, Label, FieldErrors, Description } from 'formsnap';
	import * as Form from '$lib/components/ui/form/index.js';
	import type { ICard } from '$lib/models/Card';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { STAT_CONFIG, type CardSlot } from '$lib/models/types';
	import { Star } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input/index.js';

	import {
		revelationCardSchema,
		type RevelationCardFormData
	} from '$lib/schemas/revelation-card.schema';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	const cardSlot = '' as CardSlot;

	const defaults: Partial<RevelationCardFormData> = {
		name: '',
		rarity: 4,
		level: 0,
		slot: 'sky',
		mainStat: [],
		subStats: [],
		locked: false,
		equipped: false
	};

	const { form, errors, enhance, constraints } = superForm(defaults, {
		validators: valibotClient(revelationCardSchema),
		SPA: true,
		onUpdate: ({ form }) => {
			if (form.valid) {
				console.log('Valid form data:', form.data);
			}
		}
	});
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			{#snippet children({ props })}
				<Form.Label>Card Level</Form.Label>
				<Input
					{...props}
					bind:value={RevelationCardFormData.level}
					type="number"
					min="0"
					max="25"
				/>
			{/snippet}
		</Form.Control>
	</Form.Field>
</form>

<div class="revelation-card">
	<Card.Root class="-my-4 w-full max-w-sm">
		<Card.Header class="flex h-8 items-center space-x-4">
			<Card.Title class="capitalize">
				{cardSlot}
			</Card.Title>
			<Separator orientation="vertical" />
		</Card.Header>
		<Separator />
		<Card.Content>
			<div class="revelation-card--body">
				<div class="revelation-card--main-stats">
					{#each card.mainStat as stat}
						<div class="revelation-card--stat-container">
							<div class="revelation-card--stat-container--label">
								<p class="revelation-card--stat-container--label--text">
									{STAT_CONFIG[stat.type].name}
								</p>
							</div>
							<p class="revelation-card--stat-container--value">
								{stat.value}
								{STAT_CONFIG[stat.type].isPercent ? '%' : ''}
							</p>
						</div>
					{/each}
				</div>
				<Separator />
				<div class="revelation-card--sub-stats">
					{#each card.subStats as stat}
						<div class="revelation-card--stat-container">
							<div class="revelation-card--stat-container--label {getStatPriorityClass(stat.type)}">
								{#if getStatPriorityClass(stat.type) === 'priority-high' || getStatPriorityClass(stat.type) === 'priority-medium'}
									<Star size={16} aria-label="Prioritized stat" />
								{/if}
								<p class="revelation-card--stat-container--label--text">
									{STAT_CONFIG[stat.type].name}
								</p>
							</div>
							<p class="revelation-card--stat-container--value">
								{stat.value}
								{STAT_CONFIG[stat.type].isPercent ? '%' : ''}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</Card.Content>
	</Card.Root>
</div>

<style lang="scss">
	.revelation-card {
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.revelation-card--image {
		height: 60px;
	}

	.revelation-card--body {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.revelation-card--main-stats {
		font-weight: var(--font-weight-semibold);
	}

	.revelation-card--sub-stats {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.revelation-card--stat-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: var(--text-sm);

		&--label {
			display: flex;
			gap: 8px;
			align-items: center;
		}

		&--value {
			font-weight: var(--font-weight-semibold);
		}
	}
</style>
