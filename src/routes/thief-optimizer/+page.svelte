<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { type IWeapon, type IThief, type IBaseStats } from '$lib/models/BaseThiefData';
	import { Pencil } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio/index.js';
	// TODO: This is ugly fix it pls

	let weaponFormData = $state<IWeapon>({
		name: '',
		lvl: 0,
		rariry: 2,
		forgeLvl: 0,
		image: ''
	});

	let thiefData = $state<IThief | null>(null);
	let thiefWeapon = $state<IWeapon | null>(null);
	let thiefStats = $state<IBaseStats | null>(null);

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

	let formData = $state<IThief>({
		name: '',
		image: '',
		id: '',
		lvl: 0,
		awareness: 0,
		baseStats: thiefStatsFormData,
		skills: [],
		equippedCards: null,
		weapon: weaponFormData
	});

	let open = $state(false);
	// TODO: Do figure out a better way to do this
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		thiefWeapon = {
			image: '',
			name: weaponFormData.name,
			lvl: weaponFormData.lvl,
			rariry: weaponFormData.rariry,
			forgeLvl: weaponFormData.forgeLvl
		};

		thiefData = {
			id: crypto.randomUUID(),
			image: '/characters/Joker.webp',
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

	function handleStatsSubmit(event: SubmitEvent) {
		event.preventDefault();

		console.log('BEFORE base stats:', thiefStats);
		console.log('BEFORE thief info:', thiefData);

		thiefStats = {
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

		if (!thiefData) return;
		thiefData.baseStats = thiefStats;

		open = false;

		console.log('AFTER base stats:', thiefStats);
		console.log('AFTER thief info:', thiefData);
	}
</script>

<div class="optimizer-container flex flex-col gap-4 md:flex-row">
	<Card.Root class="w-full flex-1 md:max-w-md">
		<Card.Header>
			<Card.Title>Add Thief</Card.Title>
			<Card.Description>Add thief and their current stats</Card.Description>
		</Card.Header>
		<Card.Content>
			<form onsubmit={handleSubmit} class="flex flex-col gap-4">
				<div class="w-full">
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

							<Field.Legend>Weapon</Field.Legend>
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
				<Button type="submit" class="w-full">Add</Button>
			</form>
		</Card.Content>
	</Card.Root>

	<div class="character-container flex flex-1 flex-col gap-2">
		{#if thiefData}
			<Card.Root>
				<Card.Header>
					<img src={thiefData.image} alt={thiefData.name} class="thief-image rounded-md" />
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
								<Dialog.Root bind:open>
									<Dialog.Trigger>
										<Button variant="ghost" size="icon-sm" aria-label="Submit">
											<Pencil />
										</Button>
									</Dialog.Trigger>
									<Dialog.Content>
										<Dialog.Header>
											<Dialog.Title>Edit base stats</Dialog.Title>
											<Dialog.Description></Dialog.Description>
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
																	max=""
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
																	max=""
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
																	max=""
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
																	max=""
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
																	max=""
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
																	max=""
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
																	max=""
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
							<div class="flex w-full gap-2.5">
								<div class="flex basis-sm flex-col gap-2.5">
									<p class="text-sm text-muted-foreground">
										HP: {thiefData.baseStats?.hp}
									</p>
									<p class="text-sm text-muted-foreground">
										Attack: {thiefData.baseStats?.attack}
									</p>
									<p class="text-sm text-muted-foreground">
										Defence: {thiefData.baseStats?.def}
									</p>
									<p class="text-sm text-muted-foreground">
										Speed: {thiefData.baseStats?.speed}
									</p>
									<p class="text-sm text-muted-foreground">
										SP Recovery: {thiefData.baseStats?.spRecovery}
									</p>
								</div>
								<div class="flex basis-sm flex-col gap-2.5">
									<p class="text-sm text-muted-foreground">
										Dmg multiplier: {thiefData.baseStats?.dmgMult}
									</p>
									<p class="text-sm text-muted-foreground">
										Crit Rate: {thiefData.baseStats?.critRate}
									</p>
									<p class="text-sm text-muted-foreground">
										Crit Dmg: {thiefData.baseStats?.critDmg}
									</p>
								</div>
							</div>
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

<style>
	.thief-image {
		width: 200px;
		height: auto;
	}
</style>
