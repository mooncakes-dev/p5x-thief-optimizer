<script lang="ts">
	import { getStatTypeName, isPercentStat, type StatType } from '$lib/models/types';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';

	interface Props {
		statType: StatType | '';
		value: number | '';
		options: StatType[];
		placeholder?: string;
		disabled?: boolean;
		error?: boolean;
	}

	let {
		statType = $bindable(),
		value = $bindable(),
		options,
		placeholder = 'Select…',
		disabled = false,
		error = false
	}: Props = $props();
</script>

<div class="flex items-center gap-2">
	<Select.Root
		type="single"
		value={statType}
		onValueChange={(v) => {
			statType = v as StatType;
		}}
	>
		<Select.Trigger class="h-8 flex-1 text-xs {error ? 'border-destructive' : ''}">
			{statType ? getStatTypeName(statType as StatType) : placeholder}
		</Select.Trigger>
		<Select.Content>
			{#each options as stat}
				<Select.Item value={stat} class="text-xs">{getStatTypeName(stat)}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>

	<div class="relative w-20">
		<Input
			type="number"
			class="h-8 pr-6 text-xs {error ? 'border-destructive' : ''}"
			bind:value
			min="0"
			{disabled}
		/>
		{#if statType && isPercentStat(statType as StatType)}
			<span class="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-muted-foreground"
				>%</span
			>
		{/if}
	</div>
</div>
