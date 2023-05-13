<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Request a courier, 24/7 | Stread Way</title>
</svelte:head>
<h1>{data?.user.email}</h1>
