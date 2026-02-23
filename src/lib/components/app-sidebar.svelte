<script lang="ts">
	import HouseIcon from '@lucide/svelte/icons/house';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { CircleStar, GalleryHorizontalEnd, Swords, ToyBrick } from '@lucide/svelte';

	let currentPage = $state('');

	const items = [
		{ id: 'dashboard', title: 'Dashboard', url: '/dashboard', icon: HouseIcon },
		{ id: 'optimizer', title: 'Thief Optimizer', url: '/thief-optimizer', icon: CircleStar },
		{
			id: 'cards',
			title: 'Revelation Cards',
			url: '/revelation-cards',
			icon: GalleryHorizontalEnd
		},
		{ id: 'team-builder', title: 'Team Builder', url: '#', icon: ToyBrick },
		{ id: 'settings', title: 'Settings', url: '#', icon: SettingsIcon }
	];

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	function setActiveState(id: string) {
		currentPage = id;
	}
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<Swords class="size-4" />
							</div>
							<div class="flex flex-col gap-1.5 leading-none">
								<span class="text-large">P5X Thief Optimizer</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Local Velvet Room</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								isActive={currentPage === item.id}
								onclick={() => setActiveState(item.id)}
							>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
