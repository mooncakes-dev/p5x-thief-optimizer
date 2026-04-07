<script lang="ts">
	import type { PageProps } from './$types';
	import { ThiefHero } from '$lib/features/thiefs';
	import WeaponCard from '$lib/features/thiefs/WeaponCard.svelte';
	import Mindscape from '$lib/features/thiefs/Mindscape.svelte';
	import BaseStats from '$lib/features/thiefs/BaseStats.svelte';
	import RevelationCards from '$lib/features/thiefs/RevelationCards.svelte';

	let { data }: PageProps = $props();

	let thief = $derived(data?.selectedThief);
</script>

<div class="thief-page">
	{#if thief}
		<ThiefHero {thief} />
		<div class="content-grid">
			<WeaponCard weapon={thief.weapon} />
			<!-- <Mindscape {thief} /> -->
		</div>
		<BaseStats {thief} />
		<RevelationCards {thief} />
	{/if}
</div>

<style lang="scss">
	.thief-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		flex: 1;
		padding: 1rem;
	}

	.content-grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: 1fr;

		@media (min-width: 640px) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
