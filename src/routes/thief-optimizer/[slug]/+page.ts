import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { thiefStore } from '$lib/store/thieves.svelte';

export const load: PageLoad = async ({ params }) => {
	const selectedThief = await thiefStore.getById(params.slug);

	if (!selectedThief) {
		error(404);
	}

	return { selectedThief };
};
