<script lang="ts">
	import { createRadiusTextFromHandles } from '~/utils';
	import Handle from './handle.svelte';
	import { ctx } from '~/pages/popup/ctx';

	const {
		states: { handles }
	} = ctx.get();
</script>

<div class="generator">
	<div class="generator-shape__wrapper">
		<div class="generator-shape" style="border-radius: {createRadiusTextFromHandles($handles)}" />
	</div>

	{#each $handles as handle}
		<Handle {handle} />
	{/each}
</div>

<style lang="postcss">
</style>
