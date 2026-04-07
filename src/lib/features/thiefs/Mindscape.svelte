<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Brain, Pencil } from '@lucide/svelte';

	interface MindscapeNode {
		key: string;
		label: string;
		maxLevel: number;
	}

	let { thief } = $props();

	const mindscapeNodes: MindscapeNode[] = [
		{ key: 'statUpgrade1', label: 'Stat Upgrade 1', maxLevel: 5 },
		{ key: 'statUpgrade2', label: 'Stat Upgrade 2', maxLevel: 5 },
		{ key: 'skillScaling1', label: 'Skill Scaling 1', maxLevel: 5 },
		{ key: 'skillScaling2', label: 'Skill Scaling 2', maxLevel: 5 },
		{ key: 'bellOfStars', label: 'Bell of Stars', maxLevel: 5 }
	];

	// TODO: wire to thief.mindscape?.[key] once model is updated
	function getMindscapeLevel(key: string): number {
		return (thief as any)?.mindscape?.[key] ?? 0;
	}

	function getMindscapeCoreActive(): boolean {
		return (thief as any)?.mindscape?.coreActivation ?? false;
	}
</script>

<section class="mindscape-section" aria-label="Mindscape progression">
	<div class="section-header">
		<Brain size={16} aria-hidden="true" />
		<h2 class="section-header__title">Mindscape</h2>
		<Button variant="ghost" size="sm" aria-label="Edit mindscape" class="section-header__action">
			Edit
		</Button>
	</div>
	<div class="mindscape-grid" role="list" aria-label="Mindscape node levels">
		{#each mindscapeNodes as node}
			{@const level = getMindscapeLevel(node.key)}
			<div class="mindscape-node" role="listitem">
				<span class="mindscape-node__label">{node.label}</span>
				<div class="mindscape-node__pips" aria-label="Level {level} of {node.maxLevel}">
					{#each Array(node.maxLevel) as _, i}
						<span
							class="mindscape-node__pip"
							class:mindscape-node__pip--filled={i < level}
							aria-hidden="true"
						></span>
					{/each}
				</div>
				<span class="mindscape-node__fraction">{level}/{node.maxLevel}</span>
			</div>
		{/each}
		{#if getMindscapeCoreActive() !== undefined}
			<div class="mindscape-node mindscape-node--core" role="listitem">
				<span class="mindscape-node__label">Core Activation</span>
				<span
					class="mindscape-node__status"
					class:mindscape-node__status--active={getMindscapeCoreActive()}
				>
					{getMindscapeCoreActive() ? 'Active' : 'Inactive'}
				</span>
			</div>
		{/if}
	</div>
</section>

<style lang="scss">
	@use '$lib/scss/index';

	.mindscape-grid {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.mindscape-node {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.5rem 0.65rem;
		border-radius: 8px;
		border: 1px solid hsl(var(--border));
		background: hsl(var(--card));
		transition: border-color 0.15s ease;

		&:hover {
			border-color: hsl(var(--primary) / 0.2);
		}
	}

	.mindscape-node--core {
		margin-top: 0.25rem;
		border-style: dashed;
	}

	.mindscape-node__label {
		font-size: 0.75rem;
		font-weight: 500;
		color: hsl(var(--foreground));
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mindscape-node__pips {
		display: flex;
		gap: 4px;
		flex-shrink: 0;
	}

	.mindscape-node__pip {
		width: 8px;
		height: 8px;
		border-radius: 2px;
		border: 1px solid hsl(var(--border));
		background: transparent;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.mindscape-node__pip--filled {
		background: hsl(var(--primary));
		border-color: hsl(var(--primary));
	}

	.mindscape-node__fraction {
		font-size: 0.7rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: hsl(var(--muted-foreground));
		min-width: 2ch;
		text-align: right;
	}

	.mindscape-node__status {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: hsl(var(--muted-foreground));
	}

	.mindscape-node__status--active {
		color: hsl(var(--primary));
	}
</style>
