<script lang="ts">
	import { Swords, Pencil, ImageOff } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	let { weapon } = $props();

	function getRarityStars(rarity: number | undefined): string {
		if (!rarity) return '';
		return '★'.repeat(rarity);
	}
</script>

<section class="weapon-section" aria-label="Equipped weapon">
	<div class="section-header">
		<Swords size={16} aria-hidden="true" />
		<h2 class="section-header__title">Weapon</h2>
		<Button variant="ghost" size="sm" aria-label="Edit weapon" class="section-header__action">
			Edit
		</Button>
	</div>
	{#if weapon}
		<div class="weapon-card">
			<div class="weapon-card__image-slot" aria-hidden="true">
				{#if weapon.image}
					<img src={weapon.image} alt={weapon.name} class="weapon-card__image" />
				{:else}
					<div class="weapon-card__placeholder">
						<ImageOff size={24} />
					</div>
				{/if}
			</div>
			<div class="weapon-card__info">
				<p class="weapon-card__name">{weapon.name}</p>
				<span class="weapon-card__rarity" aria-label="{weapon.rariry} star rarity">
					{getRarityStars(weapon.rariry)}
				</span>
				<div class="weapon-card__meta">
					<span class="weapon-card__tag">Lv. {weapon.lvl}</span>
					<span class="weapon-card__tag">Forge {weapon.forgeLvl}</span>
				</div>
			</div>
		</div>
	{:else}
		<div class="weapon-card weapon-card--empty">
			<div class="weapon-card__placeholder">
				<Swords size={24} />
			</div>
			<p class="weapon-card__empty-text">No weapon equipped</p>
		</div>
	{/if}
</section>

<style lang="scss">
	@use '$lib/scss/index';

	.weapon-card {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.75rem;
		border-radius: 10px;
		border: 1px solid hsl(var(--border));
		background: hsl(var(--card));
		transition: border-color 0.2s ease;

		&:hover {
			border-color: hsl(var(--primary) / 0.25);
		}
	}

	.weapon-card--empty {
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 0.75rem;
		gap: 0.5rem;
	}

	.weapon-card__image-slot {
		flex-shrink: 0;
		width: 56px;
		height: 56px;
		border-radius: 8px;
		overflow: hidden;
		background: hsl(var(--muted));
		border: 1px solid hsl(var(--border));
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.weapon-card__image {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.weapon-card__placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		color: hsl(var(--muted-foreground) / 0.5);
	}

	.weapon-card__info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		min-width: 0;
	}

	.weapon-card__name {
		font-size: 0.9rem;
		font-weight: 600;
		color: hsl(var(--foreground));
		margin: 0;
		line-height: 1.3;
	}

	.weapon-card__rarity {
		font-size: 0.75rem;
		color: hsl(45 100% 55%);
		line-height: 1;
	}

	.weapon-card__meta {
		display: flex;
		gap: 0.35rem;
		margin-top: 0.15rem;
	}

	.weapon-card__tag {
		font-size: 0.65rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		padding: 0.1rem 0.4rem;
		border-radius: 4px;
		background: hsl(var(--muted));
		color: hsl(var(--muted-foreground));
		line-height: 1.5;
	}

	.weapon-card__empty-text {
		font-size: 0.8rem;
		color: hsl(var(--muted-foreground));
		margin: 0;
	}
</style>
