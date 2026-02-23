<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button';

	import { Input } from '$lib/components/ui/input/index.js';
	import { Pencil } from '@lucide/svelte';
	import type { IBaseStats, IThief, Thief } from '$lib/models/Thief';
	import { thiefStore } from '$lib/store/thieves.svelte';
	import AddRevelationCardForm from '$lib/components/addRevelationCardForm.svelte';
	import type { ICard } from '$lib/models/Card';
	import '$lib/scss/components/revelation-card.scss';
	import ThiefCard from '$lib/components/thief-card.svelte';

	let { data }: PageProps = $props();

	let thief = $derived(data?.selectedThief);
	let open = $state(false);
	let openCardForm = $state(false);

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

	async function getEquippedRevelationCards(thief: Thief) {
		if (!thief) return [];
		return await thief?.getEquippedCards();
	}

	function calculateCardScore(card: ICard) {
		if (!card || !thief) return 0;
		const score = thief.calculatCardScore(card, thief);
		return score;
	}

	async function refreshCards() {
		if (!thief) return;
		await thiefStore.update(thief.id, {
			equippedCards: {
				sun: '',
				moon: '',
				star: '',
				sky: '',
				space: ''
			}
		});
	}
</script>

<div class="character-container flex flex-1 flex-col gap-2">
	{#if thief}
		<Card.Root>
			<Card.Header>
				<img src={thief.image} alt={thief.name} class="thief-image rounded-md" />
				<Card.Title>{thief.name}</Card.Title>
				<Card.Description>
					Level {thief.lvl} • Awareness {thief.awareness}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="thief-container--content space-y-4">
					<div>
						<h3 class="mb-2 text-sm font-semibold">Weapon</h3>
						<div class="text-sm text-muted-foreground">
							<p>{thief.weapon?.name}</p>
							<p>
								★{thief.weapon?.rariry} • Level {thief.weapon?.lvl} • Forge {thief.weapon?.forgeLvl}
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
									HP: {thief.baseStats?.hp}
								</p>
								<p class="text-sm text-muted-foreground">
									Attack: {thief.baseStats?.attack}
								</p>
								<p class="text-sm text-muted-foreground">
									Defence: {thief.baseStats?.def}
								</p>
								<p class="text-sm text-muted-foreground">
									Speed: {thief.baseStats?.speed}
								</p>
								<p class="text-sm text-muted-foreground">
									SP Recovery: {thief.baseStats?.spRecovery}
								</p>
							</div>
							<div class="flex basis-sm flex-col gap-2.5">
								<p class="text-sm text-muted-foreground">
									Dmg multiplier: {thief.baseStats?.dmgMult}
								</p>
								<p class="text-sm text-muted-foreground">
									Crit Rate: {thief.baseStats?.critRate}
								</p>
								<p class="text-sm text-muted-foreground">
									Crit Dmg: {thief.baseStats?.critDmg}
								</p>
							</div>
						</div>
					</div>

					<div class="flex gap-4 align-middle">
						<h3 class="mb-2 text-lg font-semibold">Revelation Cards</h3>
						<Button onclick={() => refreshCards()}>Refresh cards</Button>
						<Dialog.Root bind:openCardForm>
							<Dialog.Trigger>
								<Button variant="ghost" size="icon-sm" aria-label="Submit">
									<Pencil />
								</Button>
							</Dialog.Trigger>
							<Dialog.Content>
								<Dialog.Header>
									<Dialog.Title>Add a revelation card</Dialog.Title>
									<Dialog.Description></Dialog.Description>
								</Dialog.Header>
								<AddRevelationCardForm />
							</Dialog.Content>
						</Dialog.Root>
					</div>
					{#await getEquippedRevelationCards(thief)}
						<p>Loading cards...</p>
					{:then cards}
						<div class="revelation-cards--container">
							{#each cards as card}
								<ThiefCard {card} {thief} />
							{/each}
						</div>
					{/await}
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>

<style lang="scss">
	.thief-container--content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.thief-image {
		width: 200px;
		height: auto;
	}

	.revelation-cards--container {
		display: grid;
		gap: 16px;

		grid-template-columns: 1fr;

		@media (min-width: 640px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (min-width: 1440px) {
			grid-template-columns: repeat(4, 1fr);
		}

		/* Ensure all items in a row match the tallest card's height */
		grid-auto-rows: 1fr;
	}
</style>
