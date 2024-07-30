<script lang="ts">
	import './generator.postcss';

	import Handle from './handle.svelte';
	import { ctx } from '~/context';
	import { shadow } from '~/actions';

	let { radius }: { radius: string } = $props();

	const { handles, mouse, motion } = ctx.popup.get();

	let shapeRef = $state<HTMLDivElement>();
	let shapeRect = $state<DOMRect>(new DOMRect());

	const mouseX = $derived($motion === 'enabled' ? $mouse.x - shapeRect.left : 0);
	const mouseY = $derived($motion === 'enabled' ? $mouse.y - shapeRect.top : 0);

	$effect(() => {
		if (shapeRef) shapeRect = shapeRef.getBoundingClientRect();
	});

	$effect(() => {
		if (shapeRef) shadow(shapeRef, { mouse: $mouse, maxLength: 20, disabled: $motion === 'disabled' });
	});
</script>

<div data-generator>
	<div data-generator-shape-wrapper>
		<div
			bind:this={shapeRef}
			data-generator-shape
			style:border-radius={radius}
			style:--mouse-x="{mouseX}px"
			style:--mouse-y="{mouseY}px"
		></div>
	</div>

	{#each $handles as handle}
		<Handle {handle} />
	{/each}
</div>

<style lang="postcss">
</style>
