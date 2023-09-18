<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Handle } from '~/types';

	import { derived, writable } from 'svelte/store';
	import { DragGesture } from '@use-gesture/vanilla';

	import { clamp, mapRange } from '~/utils';
	import { ctx } from '~/pages/popup/ctx';

	export let handle: Handle;

	let handleRef: HTMLElement | undefined;

	const {
		states: { changedAt, handles },
		helpers: { update }
	} = ctx.get();

	const positionStyles = writable('');

	const drag: Action<HTMLElement> = (node) => {
		const containment = node.parentElement!;

		let currentMatrix = new DOMMatrix();

		const dragInstance = new DragGesture(
			node,
			({ delta: [dx, dy], down }) => {
				const { x, y, width, height } = node.getBoundingClientRect();

				let p = [
					(x - containment.offsetLeft) / (containment.offsetWidth - width),
					(y - containment.offsetTop) / (containment.offsetHeight - height)
				];
				p = p.map((v) => clamp(Math.floor(v * 101), 0, 100));

				const progress = handle.axis === 'x' ? p[0] : p[1];

				update(handle.id, progress);

				// Extract the existing transformation matrix
				const existingMatrix = new DOMMatrix(window.getComputedStyle(node).getPropertyValue('transform'));

				// Create a translation matrix
				const translationMatrix = new DOMMatrix();
				translationMatrix.translateSelf(dx, dy);

				// Combine the existing matrix with the translation matrix
				currentMatrix = existingMatrix.multiplySelf(translationMatrix);

				// Apply the combined matrix to the element
				node.style.transform = currentMatrix.toString();
			},
			{
				axis: handle.axis,
				bounds: containment,
				rubberband: true
			}
		);

		return {
			destroy() {
				dragInstance.destroy();
			}
		};
	};

	const progress = derived(handles, ($handles) => {
		return $handles.find((h) => h.id === handle.id)!.progress;
	});

	const initialize: Action = (node) => {
		let containment = node.parentElement!;

		const mapProgessToWidth = (n: number) => mapRange(n, 0, 100, 0, containment.offsetWidth - node.offsetWidth);

		let position = handle.axis === 'x' ? [$progress, handle.position[1]] : [handle.position[0], $progress];
		position = position.map((v) => mapProgessToWidth(v));

		const [x, y] = position;

		positionStyles.set(`transform: translate(${x}px, ${y}px)`);
	};

	$: handleRef && initialize(handleRef), $changedAt;
</script>

<div
	bind:this={handleRef}
	use:drag
	data-id={handle.id}
	style={$positionStyles}
	class={'generator-handle ' + (handle.axis === 'x' ? 'active:cursor-ew-resize' : 'active:cursor-ns-resize')}
/>

<style lang="postcss">
</style>
