<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import type { IBaseStats } from '$lib/db/Thief';
	import { thiefStore } from '$lib/store/thieves.svelte';
	import { Heart, Swords, Shield, Zap, Gauge, Flame, Crosshair } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field/index.js';

	let { thief } = $props();

	let thiefStatsFormData = $state<IBaseStats>({
		hp: 0,
		attack: 0,
		def: 0,
		speed: 0,
		spRecovery: 0,
		dmgMult: 0,
		critRate: 0,
		critDmg: 0,
		pierceRate: 0,
		effectHit: 0,
		effectRes: 0
	});

	const statEntries: { key: keyof IBaseStats; label: string; icon: typeof Heart }[] = [
		{ key: 'hp', label: 'HP', icon: Heart },
		{ key: 'attack', label: 'ATK', icon: Swords },
		{ key: 'def', label: 'DEF', icon: Shield },
		{ key: 'speed', label: 'SPD', icon: Zap },
		{ key: 'spRecovery', label: 'SP Rec', icon: Gauge },
		{ key: 'dmgMult', label: 'DMG %', icon: Flame },
		{ key: 'critRate', label: 'Crit %', icon: Crosshair },
		{ key: 'critDmg', label: 'Crit DMG', icon: Crosshair }
	];

	let open = $state(false);

	async function handleStatsSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!thief) return;

		const newBaseStats: IBaseStats = {
			hp: thiefStatsFormData.hp,
			attack: thiefStatsFormData.attack,
			def: thiefStatsFormData.def,
			speed: thiefStatsFormData.speed,
			spRecovery: thiefStatsFormData.spRecovery,
			dmgMult: thiefStatsFormData.dmgMult,
			critRate: thiefStatsFormData.critRate,
			critDmg: thiefStatsFormData.critDmg,
			pierceRate: 0,
			effectHit: 0,
			effectRes: 0
		};

		await thief?.updateBaseStats(newBaseStats);
		open = false;
		thief = await thiefStore.getById(thief.id);
	}
</script>

<section class="stats-section" aria-label="Base stats">
	<div class="section-header">
		<h2 class="section-header__title">Base Stats</h2>
		<Dialog.Root bind:open>
			<Dialog.Trigger>
				<Button
					variant="ghost"
					size="sm"
					aria-label="Edit base stats"
					class="section-header__action"
				>
					Edit
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Edit base stats</Dialog.Title>
					<Dialog.Description>
						Update the base stat values for {thief.name}.
					</Dialog.Description>
				</Dialog.Header>
				<form onsubmit={handleStatsSubmit} class="flex flex-col gap-4">
					<div class="w-full max-w-md">
						<Field.Set>
							<Field.Group>
								<div class="grid grid-cols-2 gap-4">
									<Field.Field>
										<Field.Label for="hp">HP</Field.Label>
										<Input
											id="hp"
											type="number"
											min="0"
											placeholder=""
											bind:value={thiefStatsFormData.hp}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="attack">Attack</Field.Label>
										<Input
											id="attack"
											type="number"
											placeholder=""
											min="0"
											bind:value={thiefStatsFormData.attack}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="defence">Defence</Field.Label>
										<Input
											id="defence"
											type="number"
											placeholder="Eg. 80 for max"
											min="0"
											bind:value={thiefStatsFormData.def}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="speed">Speed</Field.Label>
										<Input
											id="speed"
											type="number"
											placeholder=""
											min="0"
											bind:value={thiefStatsFormData.speed}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="spRecovery">SP Recovery</Field.Label>
										<Input
											id="spRecovery"
											type="number"
											placeholder=""
											min="0"
											bind:value={thiefStatsFormData.spRecovery}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="dmgMult">Dmg Mult</Field.Label>
										<Input
											id="dmgMult"
											type="number"
											placeholder=""
											min="0"
											bind:value={thiefStatsFormData.dmgMult}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="critDmg">Crit Dmg</Field.Label>
										<Input
											id="critDmg"
											type="number"
											placeholder=""
											min="0"
											bind:value={thiefStatsFormData.critDmg}
										/>
									</Field.Field>
									<Field.Field>
										<Field.Label for="critRate">Crit Rate</Field.Label>
										<Input
											id="critRate"
											type="number"
											placeholder=""
											min="0"
											bind:value={thiefStatsFormData.critRate}
										/>
									</Field.Field>
								</div>
							</Field.Group>
						</Field.Set>
					</div>
					<Button type="submit" class="w-full">Save</Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	</div>

	<div class="stat-grid" role="list" aria-label="Base stat values">
		{#each statEntries as entry}
			<div class="stat-cell" role="listitem">
				<div class="stat-cell__icon" aria-hidden="true">
					<entry.icon size={14} />
				</div>
				<span class="stat-cell__label">{entry.label}</span>
				<span class="stat-cell__value">
					{thief.baseStats?.[entry.key] ?? 0}
				</span>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	@use '$lib/scss/index';

	.stat-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;

		@media (min-width: 480px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.stat-cell {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 0.65rem;
		border-radius: 8px;
		border: 1px solid hsl(var(--border));
		background: hsl(var(--card));
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease;

		&:hover {
			border-color: hsl(var(--primary) / 0.25);
			background: hsl(var(--primary) / 0.04);
		}
	}

	.stat-cell__icon {
		color: hsl(var(--muted-foreground));
		flex-shrink: 0;
		display: flex;
	}

	.stat-cell__label {
		font-size: 0.8rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: hsl(var(--muted-foreground));
		white-space: nowrap;
	}

	.stat-cell__value {
		margin-left: auto;
		font-size: 0.85rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
		color: hsl(var(--foreground));
	}
</style>
