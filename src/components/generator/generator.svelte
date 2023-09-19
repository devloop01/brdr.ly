<script lang="ts">
	import './generator.postcss';

	import Handle from './handle.svelte';
	import { ctx } from '~/context';

	export let radius: string;

	const {
		states: { handles }
	} = ctx.popup.get().handles;
</script>

<div data-generator>
	<div data-generator-shape-wrapper>
		<div data-generator-shape style="border-radius: {radius}" />
	</div>

	{#each $handles as handle}
		<Handle {handle} />
	{/each}
</div>

<style lang="postcss">
</style>
