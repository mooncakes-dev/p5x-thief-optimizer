<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import ThiefCard from '$lib/components/thief-card.svelte';
	import EmptyThiefCard from '$lib/components/empty-thief-card.svelte';
	import type { Thief } from '$lib/models/Thief';
	import type { ICard } from '$lib/models/Card';
	import type { CardSlot } from '$lib/models/types';
	import { CardSets, SpaceCards } from '$lib/constants/revelation-cards';
	import { thiefStore } from '$lib/store/thieves.svelte';

	let { thief } = $props();

	let cardSlots: CardSlot[] = ['sun', 'moon', 'star', 'sky'];
	const cardSets = CardSets;
	const spaceCards = SpaceCards;

	let selectedCardSet = $state('');
	let selectedSpaceCard = $state('');

	async function getEquippedRevelationCards(thief: Thief): Promise<ICard[]> {
		if (!thief) return [];
		return await thief?.getEquippedCards();
	}

	function calculateCardScore(card: ICard) {
		if (!card || !thief) return 0;
		const score = thief.calculateCardScore(card, thief);
		return score;
	}

	async function refreshCards() {
		if (!thief) return;
		await thiefStore.update(thief.id, {
			equippedCards: {
				sun: 'b3c75a6c-b17a-4de7-bef7-1b427c61f578',
				moon: '0bbd617e-e0b9-4a84-b6ef-22e3b2255400',
				star: '386dd703-6111-42de-9041-6bc1fbdf9176',
				sky: '15c1697d-04a0-4c05-aea4-c48704d37a53',
				space: 'd9e4a1b2-0efe-4b72-94aa-6f092941f87f'
			}
		});
	}
</script>

<section class="revelation-section flex flex-col gap-3" aria-label="Revelation cards">
	<h2 class="section-header__title">Revelation Cards</h2>
	{#await getEquippedRevelationCards(thief)}
		<p>Loading cards...</p>
	{:then cards}
		{#if cards.length === 0}
			<div class="mb-4 flex gap-3">
				<Select.Root
					type="single"
					value={selectedCardSet}
					onValueChange={(v) => (selectedCardSet = v)}
				>
					<Select.Trigger class="h-8 w-44 text-sm">
						{selectedCardSet || 'Card set…'}
					</Select.Trigger>
					<Select.Content>
						{#each cardSets as set}
							<Select.Item value={set}>{set}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<Select.Root
					type="single"
					value={selectedSpaceCard}
					onValueChange={(v) => (selectedSpaceCard = v)}
				>
					<Select.Trigger class="h-8 w-44 text-sm">
						{selectedSpaceCard || 'Space card…'}
					</Select.Trigger>
					<Select.Content>
						{#each spaceCards as card}
							<Select.Item value={card}>{card}</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<p class="text-italic text-sm text-muted-foreground">
				* The cards are assumed to be gold and max level
			</p>

			{#if cards.length === 0}
				<div class="revelation-cards__container">
					{#each cardSlots as slot}
						<EmptyThiefCard cardSlot={slot as CardSlot} prefilledName={selectedCardSet} />
					{/each}
					<EmptyThiefCard cardSlot="space" prefilledName={selectedSpaceCard} />
				</div>
			{/if}
		{/if}
		<p class="text-italic text-sm text-muted-foreground">
			* The cards are assumed to be gold and max level
		</p>
		<div class="revelation-cards__container">
			{#each cards as card}
				<ThiefCard {card} {thief} />
			{/each}
		</div>
	{/await}
</section>

<style lang="scss">
	@use '$lib/scss/index';

	.revelation-cards__container {
		display: grid;
		gap: 14px;
		grid-template-columns: 1fr;

		@media (min-width: 640px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (min-width: 1440px) {
			grid-template-columns: repeat(5, 1fr);
		}

		grid-auto-rows: 1fr;
	}
</style>
