<script lang="ts">
	import * as Empty from '$lib/components/ui/empty/index.js';
	import yaolingNotFound from '$lib/assets/yaolingNotFound.png';

	const message = $state('');
</script>

<Empty.Root>
	<Empty.Header>
		<img src={yaolingNotFound} alt="Yaoling 404" />
		<Empty.Title>404 - Not Found</Empty.Title>
		<Empty.Description>The page you're looking for doesn't exist.</Empty.Description>
	</Empty.Header>
	<Empty.Content>
		<Empty.Description>
			{message || 'Try going back to the previous page or refreshing the URL.'}
		</Empty.Description>
	</Empty.Content>
</Empty.Root>
