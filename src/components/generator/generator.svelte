<script lang="ts">
	import { createRadiusTextFromHandles } from '~/utils';
	import './generator.postcss';

	import Handle from './handle.svelte';
	import { ctx } from '~/context';

	const {
		states: { handles }
	} = ctx.popup.get();
</script>

<div data-generator class="border-2 border-red-500">
	<div data-generator-shape-wrapper>
		<div data-generator-shape style="border-radius: {createRadiusTextFromHandles($handles)}" />
	</div>

	{#each $handles as handle}
		<Handle {handle} />
	{/each}
</div>

<style lang="postcss">
</style>
