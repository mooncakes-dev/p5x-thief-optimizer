<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { type IWeapon, type IThief, type IBaseStats } from '$lib/models/BaseThiefData';
	import { Pencil } from '@lucide/svelte';

	// TODO: This is ugly fix it pls

	let weaponFormData = $state<IWeapon>({
		name: '',
		lvl: 0,
		rariry: 2,
		forgeLvl: 0
	});

	let thiefData = $state<IThief | null>(null);
	let thiefWeapon = $state<IWeapon | null>(null);
	let thiefStats = $state<IBaseStats | null>({
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

	let formData = $state<IThief>({
		name: '',
		id: '',
		lvl: 0,
		awareness: 0,
		baseStats: thiefStats,
		skills: [],
		equippedCards: null,
		weapon: weaponFormData
	});

	// TODO: Do figure out a better way to do this
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		thiefWeapon = {
			name: weaponFormData.name,
			lvl: weaponFormData.lvl,
			rariry: weaponFormData.rariry,
			forgeLvl: weaponFormData.forgeLvl
		};

		thiefData = {
			id: crypto.randomUUID(),
			name: formData.name,
			lvl: formData.lvl,
			awareness: formData.awareness,
			baseStats: thiefStats,
			skills: [],
			equippedCards: null,
			weapon: thiefWeapon
		};

		console.log('Submitted thief:', thiefData);
	}
</script>

<div class="optimizer-container flex gap-4">
	<Card.Root class=" w-full max-w-sm">
		<Card.Header>
			<Card.Title>Add Thief</Card.Title>
			<Card.Description>Add thief and their current stats</Card.Description>
		</Card.Header>
		<Card.Content>
			<form onsubmit={handleSubmit}>
				<div class="w-full max-w-md">
					<Field.Set>
						<Field.Legend>Thief Information</Field.Legend>
						<Field.Group>
							<Field.Field>
								<Field.Label for="name">Name</Field.Label>
								<Input id="name" type="text" placeholder="Eg. Joker" bind:value={formData.name} />
							</Field.Field>
							<div class="grid grid-cols-2 gap-4">
								<Field.Field>
									<Field.Label for="level">Level</Field.Label>
									<Input
										id="level"
										type="number"
										placeholder="Eg. 80 for max"
										min="0"
										max="80"
										bind:value={formData.lvl}
									/>
								</Field.Field>
								<Field.Field>
									<Field.Label for="awareness">Awareness</Field.Label>
									<Input
										id="awareness"
										type="number"
										placeholder="Eg. 1"
										min="0"
										max="6"
										bind:value={formData.awareness}
									/>
								</Field.Field>
							</div>
						</Field.Group>
						<Field.Legend>Weapon</Field.Legend>
						<Field.Group>
							<Field.Field>
								<Field.Label for="weaponName">Name</Field.Label>
								<Input
									id="weaponName"
									type="text"
									placeholder="Eg. Phoenix Dagger"
									bind:value={weaponFormData.name}
								/>
							</Field.Field>
							<Field.Field>
								<Field.Label for="weaponRarity">Rarity</Field.Label>
								<Input
									id="weaponRarity"
									type="number"
									placeholder="Eg. 1"
									min="0"
									max="5"
									bind:value={weaponFormData.rariry}
								/>
							</Field.Field>
							<div class="grid grid-cols-2 gap-4">
								<Field.Field>
									<Field.Label for="weaponLvl">Level</Field.Label>
									<Input
										id="weaponLvl"
										type="number"
										placeholder="Eg. 80 for max"
										min="0"
										max="80"
										bind:value={weaponFormData.lvl}
									/>
								</Field.Field>
								<Field.Field>
									<Field.Label for="weaponForgeLvl">Forge Lvl</Field.Label>
									<Input
										id="weaponForgeLvl"
										type="number"
										placeholder="Eg. 1"
										min="0"
										max="6"
										bind:value={weaponFormData.forgeLvl}
									/>
								</Field.Field>
							</div>
						</Field.Group>
					</Field.Set>
				</div>
				<div class="flex gap-2">
					<Button type="submit" class="w-full">Add</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>

	<div class="character-container flex flex-1 flex-col gap-2">
		{#if thiefData}
			<Card.Root>
				<Card.Header>
					<Card.Title>{thiefData.name}</Card.Title>
					<Card.Description>
						Level {thiefData.lvl} • Awareness {thiefData.awareness}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div>
							<h3 class="mb-2 text-sm font-semibold">Weapon</h3>
							<div class="text-sm text-muted-foreground">
								<p>{thiefData.weapon?.name}</p>
								<p>
									★{thiefData.weapon?.rariry} • Level {thiefData.weapon?.lvl} • Forge {thiefData
										.weapon?.forgeLvl}
								</p>
							</div>
						</div>

						<div>
							<div class="flex gap-2 align-middle">
								<h3 class="mb-2 text-lg font-semibold">Base Stats</h3>
								<Button variant="ghost" size="icon-sm" aria-label="Submit">
									<Pencil />
								</Button>
							</div>
							<p class="text-sm text-muted-foreground">
								HP: {thiefData.baseStats?.hp}
							</p>
							<p class="text-sm text-muted-foreground">
								Defence: {thiefData.baseStats?.def}
							</p>
							<p class="text-sm text-muted-foreground">
								Speed: {thiefData.baseStats?.speed}
							</p>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		{:else}
			<Card.Root>
				<Card.Content>
					<p class="text-center text-sm text-muted-foreground">Fill out the form to add a thief</p>
				</Card.Content>
			</Card.Root>
		{/if}
	</div>
</div>
