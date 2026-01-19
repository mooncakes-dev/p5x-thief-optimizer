<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as Item from '$lib/components/ui/item/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import { Input } from '$lib/components/ui/input/index.js';
	import { Pencil } from '@lucide/svelte';

	import { thiefStore } from '$lib/store/thieves.svelte';
	import { Thief, type IBaseStats, type IThief, type IWeapon } from '$lib/models/Thief';

	// TODO: This is ugly fix it pls
	let weaponFormData = $state<IWeapon>({
		name: '',
		lvl: 0,
		rariry: 2,
		forgeLvl: 0,
		image: ''
	});

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

	let selectedThief = $state<Thief>();

	let open = $state(false);

	async function selectThief(id: string) {
		selectedThief = await thiefStore.getById(id);
	}

	// TODO: Do figure out a better way to do this
	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const newThief: IThief = {
			id: crypto.randomUUID(),
			image: '/characters/Joker.webp',
			name: formData.name,
			lvl: formData.lvl,
			awareness: formData.awareness,
			baseStats: thiefStats,
			skills: [],
			equippedCards: null,
			weapon: {
				image: '',
				name: weaponFormData.name,
				lvl: weaponFormData.lvl,
				rariry: weaponFormData.rariry,
				forgeLvl: weaponFormData.forgeLvl
			}
		};

		await thiefStore.add(newThief);
	}

	async function handleStatsSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!selectedThief) return;

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

		await selectedThief?.updateBaseStats(newBaseStats);
		open = false;
		selectedThief = await thiefStore.getById(selectedThief.id);
	}
</script>

<div class="optimizer-container flex flex-col gap-4 md:flex-row">
	<Tabs.Root value="myThieves" class="w-full flex-1 md:max-w-md">
		<Tabs.List>
			<Tabs.Trigger value="myThieves">My thieves</Tabs.Trigger>
			<Tabs.Trigger value="addNew">Add new</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="myThieves">
			<Card.Root class="w-full flex-1 md:max-w-md">
				<Card.Header>
					<Card.Title>My Thieves</Card.Title>
					<Card.Description>All of the thieves you have added in the past</Card.Description>
				</Card.Header>
				<Card.Content>
					{#each thiefStore.thieves as thief}
						<Item.Root variant="outline">
							<Item.Content>
								<Item.Title>
									{thief.name}
								</Item.Title>
								<Item.Description>
									Level {thief.lvl} • Awareness {thief.awareness}
								</Item.Description>
							</Item.Content>
							<Item.Actions>
								<Button variant="outline" size="sm" onclick={() => selectThief(thief.id)}>
									Select
								</Button>
							</Item.Actions>
						</Item.Root>
					{/each}
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="addNew">
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
										<Input
											id="name"
											type="text"
											placeholder="Eg. Joker"
											bind:value={formData.name}
										/>
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
		</Tabs.Content>
	</Tabs.Root>

	<div class="character-container flex flex-1 flex-col gap-2">
		{#if selectedThief}
			<Card.Root>
				<Card.Header>
					<img src={selectedThief.image} alt={selectedThief.name} class="thief-image rounded-md" />
					<Card.Title>{selectedThief.name}</Card.Title>
					<Card.Description>
						Level {selectedThief.lvl} • Awareness {selectedThief.awareness}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div>
							<h3 class="mb-2 text-sm font-semibold">Weapon</h3>
							<div class="text-sm text-muted-foreground">
								<p>{selectedThief.weapon?.name}</p>
								<p>
									★{selectedThief.weapon?.rariry} • Level {selectedThief.weapon?.lvl} • Forge {selectedThief
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
										HP: {selectedThief.baseStats?.hp}
									</p>
									<p class="text-sm text-muted-foreground">
										Attack: {selectedThief.baseStats?.attack}
									</p>
									<p class="text-sm text-muted-foreground">
										Defence: {selectedThief.baseStats?.def}
									</p>
									<p class="text-sm text-muted-foreground">
										Speed: {selectedThief.baseStats?.speed}
									</p>
									<p class="text-sm text-muted-foreground">
										SP Recovery: {selectedThief.baseStats?.spRecovery}
									</p>
								</div>
								<div class="flex basis-sm flex-col gap-2.5">
									<p class="text-sm text-muted-foreground">
										Dmg multiplier: {selectedThief.baseStats?.dmgMult}
									</p>
									<p class="text-sm text-muted-foreground">
										Crit Rate: {selectedThief.baseStats?.critRate}
									</p>
									<p class="text-sm text-muted-foreground">
										Crit Dmg: {selectedThief.baseStats?.critDmg}
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
					<p class="text-center text-sm text-muted-foreground">
						Pick a thief from the list or fill out the form to add a new thief
					</p>
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
