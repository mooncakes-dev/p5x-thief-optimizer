<script lang="ts">
	import type { ICard } from '$lib/db/Card';
	import { Button } from '$lib/components/ui/button';
	import { cardStore } from '$lib/store/cards.svelte';
	import type { CardSlot } from '$lib/db/types';
	import departureIcon from '$lib/assets/cards/departure_Icon.png';
	import hindranceIcon from '$lib/assets/cards/hindrance_Icon.png';

	let images = {
		departure: departureIcon,
		hindrance: hindranceIcon
	};

	let cardFormData = $state<ICard>({
		id: '',
		image: '',
		slot: '' as CardSlot,
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

	async function seedTestCards() {
		await cardStore.add({
			id: crypto.randomUUID(),
			slot: 'sun',
			rarity: 5,
			mainStat: [{ type: 'hp', value: 1080 }],
			subStats: [
				{ type: 'damage_mult', value: 1.9 },
				{ type: 'atk', value: 6.7 },
				{ type: 'crit_mult', value: 7.9 },
				{ type: 'crit_rate', value: 4.8 }
			],
			image: images['hindrance'],
			set: 'hindrance',
			level: 25,
			locked: true,
			equippedTo: 'Joker'
		});
		await cardStore.add({
			id: crypto.randomUUID(),
			slot: 'moon',
			rarity: 5,
			mainStat: [{ type: 'damage_mult', value: 25.1 }],
			subStats: [
				{ type: 'ailment_accuracy', value: 6.8 },
				{ type: 'pierce_rate_percent', value: 3 },
				{ type: 'def', value: 111 }
			],
			image: images['hindrance'],
			set: 'hindrance',
			level: 25,
			locked: true,
			equippedTo: 'Joker'
		});
		await cardStore.add({
			id: crypto.randomUUID(),
			slot: 'star',
			rarity: 5,
			mainStat: [{ type: 'ailment_accuracy', value: 37.6 }],
			subStats: [
				{ type: 'damage_mult', value: 6.2 },
				{ type: 'atk', value: 83 },
				{ type: 'speed', value: 5.6 },
				{ type: 'sp_recovery_percent', value: 10 }
			],
			image: images['hindrance'],
			set: 'hindrance',
			level: 25,
			locked: true,
			equippedTo: 'Joker'
		});
		await cardStore.add({
			id: crypto.randomUUID(),
			slot: 'sky',
			rarity: 5,
			mainStat: [{ type: 'hp_percent', value: 31.5 }],
			subStats: [
				{ type: 'pierce_rate_percent', value: 3.5 },
				{ type: 'def', value: 69 },
				{ type: 'speed', value: 4.7 },
				{ type: 'crit_rate', value: 2.6 }
			],
			image: images['hindrance'],
			set: 'hindrance',
			level: 25,
			locked: true,
			equippedTo: 'Joker'
		});
		await cardStore.add({
			id: crypto.randomUUID(),
			slot: 'space',
			rarity: 5,
			mainStat: [
				{ type: 'hp_percent', value: 359 },
				{ type: 'def', value: 359 }
			],
			subStats: [
				{ type: 'atk_percent', value: 8.3 },
				{ type: 'damage_mult', value: 6.2 },
				{ type: 'crit_mult', value: 16.8 },
				{ type: 'crit_rate', value: 2.1 }
			],
			image: images['hindrance'],
			set: 'hindrance',
			level: 25,
			locked: true,
			equippedTo: 'Joker'
		});
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

<Button onclick={seedTestCards}>Seed Cards</Button>
