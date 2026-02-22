<script lang="ts">
	import type { ICard } from '$lib/models/Card';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { STAT_CONFIG, type StatType } from '$lib/models/types';
	import type { Thief } from '$lib/models/Thief';
	import type { IAttributeWeights } from '$lib/constants/character-weights';
	import { CircleStar, Star } from '@lucide/svelte';
	import * as Item from '$lib/components/ui/item/index.js';
	interface Props {
		card: ICard;
		thief: Thief;
	}

	const { card, thief }: Props = $props();

	function calculateCardScore(card: ICard) {
		if (!card) return 0;
		const score = thief.calculateCardScore(card, thief);
		return score;
	}

	export function getStatPriorityClass(statType: StatType): string {
		const thiefWeights = thief.getThiefWeights(thief);
		const weight = thiefWeights.attribute_weights[statType as keyof IAttributeWeights];

		console.log(`Stat: ${statType}, Weight: ${weight}`);
		if (!weight) return '';

		if (weight >= 2) {
			return 'priority-high';
		}

		if (weight > 1) {
			return 'priority-medium';
		}

		return '';
	}
</script>

<div class="revelation-card">
	<Card.Root class="-my-4 w-full max-w-sm">
		<Card.Header class="flex h-8 items-center space-x-4">
			<img src={card.image} alt="revelation card" class="revelation-card--image" />
			<Card.Title class="capitalize">
				{card.slot}
			</Card.Title>
			<Separator orientation="vertical" />
			<p>Rating - {calculateCardScore(card)} %</p>
		</Card.Header>
		<Separator />
		<Card.Content>
			<div class="revelation-card--body">
				<div class="revelation-card--main-stats">
					{#each card.mainStat as stat}
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

		.priority-high {
			color: var(--color-amber-600);
		}

		.priority-medium {
			color: var(--color-amber-400);
		}

		&--value {
			font-weight: var(--font-weight-semibold);
		}
	}
</style>
