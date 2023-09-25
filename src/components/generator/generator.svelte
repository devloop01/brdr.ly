<script lang="ts">
	import './generator.postcss';

	import Handle from './handle.svelte';
	import { ctx } from '~/context';
	import { shadow } from '~/actions';

	export let radius: string;

	const { handles, mouse, motion } = ctx.popup.get();

	let shapeRef: HTMLDivElement | undefined;

	$: {
		if (shapeRef) {
			shadow(shapeRef, { mouse: $mouse, maxLength: 20, disabled: $motion === 'disabled' });

			shapeRef.style.setProperty('--mouse-x', '0px');
			shapeRef.style.setProperty('--mouse-y', '0px');

			if ($motion === 'enabled') {
				const rect = shapeRef.getBoundingClientRect();

				const x = $mouse.x - rect.left;
				const y = $mouse.y - rect.top;

				shapeRef.style.setProperty('--mouse-x', `${x}px`);
				shapeRef.style.setProperty('--mouse-y', `${y}px`);
			}
		}
	}
</script>

<div data-generator>
	<div data-generator-shape-wrapper>
		<div data-generator-shape style:border-radius={radius} bind:this={shapeRef} />
	</div>

	{#each $handles as handle}
		<Handle {handle} />
	{/each}
</div>

<style lang="postcss">
</style>
