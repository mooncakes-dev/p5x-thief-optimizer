<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { splitString, transformPathToTitle } from '$lib/utils/helper-utils';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();

	let breadcrumb = $derived.by(() => {
		let routeId = page.route.id;
		if (!routeId) return;

		let pathSegment = splitString(routeId, '/')
			.filter(Boolean)
			.filter((segment) => !segment.startsWith('[') && !segment.endsWith(']'));

		if (pathSegment.length === 0) return;

		return {
			title: transformPathToTitle(pathSegment[0]),
			link: `/${pathSegment[0]}`
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<ModeWatcher />
<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ms-1" />
				<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
				{#if breadcrumb}
					<Breadcrumb.Root>
						<Breadcrumb.List>
							<Breadcrumb.Item class="hidden capitalize md:block">
								<Breadcrumb.Link href={breadcrumb?.link}>{breadcrumb?.title}</Breadcrumb.Link>
							</Breadcrumb.Item>
							{#if page.params.slug}
								<Breadcrumb.Separator class="hidden md:block" />
								<Breadcrumb.Item class="capitalize">
									<Breadcrumb.Page>{page.params.slug}</Breadcrumb.Page>
								</Breadcrumb.Item>
							{/if}
						</Breadcrumb.List>
					</Breadcrumb.Root>
				{/if}
			</div>
		</header>
		<main>
			<div class="min-h-screen bg-background p-6 md:p-8">
				{@render children()}
				<div style="display:none">
					{#each locales as locale}
						<a href={localizeHref(page.url.pathname, { locale })}>
							{locale}
						</a>
					{/each}
				</div>
			</div>
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>
