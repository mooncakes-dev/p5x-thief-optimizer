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
	import type { ICard } from '$lib/models/Card';
	import { cardStore } from '$lib/store/cards.svelte';

	let stats = [
		{ value: 'hp', label: '' },
		{ value: '', label: '' }
	];

	let cardFormData = $state<ICard>({
		id: '',
		image: '',
		slot: 'sun',
		rarity: 5,
		set: '',
		level: 0,
		mainStat: [
			{
				type: 'hp',
				value: 0
			}
		],
		subStats: [{ type: 'hp', value: 0 }],
		locked: false,
		equippedTo: ''
	});

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
		weapon: weaponFormData,
		userStats: null,
		recommendedStats: null
	});

	let selectedThief = $state<Thief>();

	let open = $state(false);

	async function selectThief(id: string) {
		if (!id) return;

		try {
			selectedThief = await thiefStore.getById(id);
		} catch (error) {
			console.error('Failed to select a thief: ', error);
		}
	}

	async function getEquippedRevelationCards(thief: Thief) {
		return await selectedThief?.getEquippedCards();
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
			},
			userStats: null,
			recommendedStats: null
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

	async function hadleCardSubmit(event: SubmitEvent) {
		event.preventDefault();

		const newCard: ICard = {
			id: crypto.randomUUID(),
			image: '',
			slot: cardFormData.slot,
			rarity: cardFormData.rarity,
			set: cardFormData.set,
			level: cardFormData.level,
			mainStat: cardFormData.mainStat,
			subStats: cardFormData.subStats,
			locked: cardFormData.locked,
			equippedTo: cardFormData.equippedTo
		};

		await cardStore.add(newCard);
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
								<Button
									variant="outline"
									size="sm"
									onclick={() => selectThief(thief.id)}
									href="/thief-optimizer/{thief.id}"
								>
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
		<Card.Root>
			<Card.Content>
				<p class="text-center text-sm text-muted-foreground">
					Pick a thief from the list or fill out the form to add a new thief
				</p>
			</Card.Content>
		</Card.Root>
	</div>
</div>
