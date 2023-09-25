<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Handle } from '~/types';

	import { derived, writable } from 'svelte/store';
	import { DragGesture } from '@use-gesture/vanilla';

	import { clamp, mapRange } from '~/utils';
	import { ctx } from '~/context';
	import { createEventDispatcher } from 'svelte';

	export let handle: Handle;

	const dispatch = createEventDispatcher();

	let handleRef: HTMLElement | undefined;

	const { handles } = ctx.popup.get();

	const transform = writable({ x: 0, y: 0 });

	const drag: Action = (node) => {
		const parent = node.parentElement!;

		const dragInstance = new DragGesture(
			node,
			({ delta: [dx, dy] }) => {
				const rect = node.getBoundingClientRect();

				let p = [
					(rect.x - parent.offsetLeft) / (parent.offsetWidth - rect.width),
					(rect.y - parent.offsetTop) / (parent.offsetHeight - rect.height)
				];
				p = p.map((v) => clamp(Math.floor(v * 101), 0, 100));

				const progress = handle.axis === 'x' ? p[0] : p[1];

				dispatch('update', { id: handle.id, progress });
				handles.update(handle.id, progress);

				const currentMatrix = new DOMMatrix(node.style.transform);
				node.style.transform = currentMatrix.translate(dx, dy).toString();
			},
			{
				axis: handle.axis,
				bounds: parent,
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

		transform.set({ x, y });
	};

	$: handleRef && initialize(handleRef), handles.changedAt;
</script>

<div
	use:drag
	bind:this={handleRef}
	style="transform: translate({$transform.x}px, {$transform.y}px)"
	data-generator-handle
	data-handle-id={handle.id}
	data-handle-axis={handle.axis}
/>

<style lang="postcss">
</style>
