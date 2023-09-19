<script lang="ts">
	import type { Action } from 'svelte/action';
	import type { Handle } from '~/types';

	import { derived, writable } from 'svelte/store';
	import { DragGesture } from '@use-gesture/vanilla';

	import { clamp, mapRange } from '~/utils';
	import { ctx } from '~/context';

	export let handle: Handle;

	let handleRef: HTMLElement | undefined;

	const {
		states: { changedAt, handles },
		helpers: { update }
	} = ctx.popup.get().handles;

	const positionStyles = writable('');

	const drag: Action = (node) => {
		const parent = node.parentElement!;

		const dragInstance = new DragGesture(
			node,
			({ delta: [dx, dy] }) => {
				const { x, y, width, height } = node.getBoundingClientRect();

				let p = [
					(x - parent.offsetLeft) / (parent.offsetWidth - width),
					(y - parent.offsetTop) / (parent.offsetHeight - height)
				];
				p = p.map((v) => clamp(Math.floor(v * 101), 0, 100));

				const progress = handle.axis === 'x' ? p[0] : p[1];

				update(handle.id, progress);

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

		positionStyles.set(`transform: translate(${x}px, ${y}px)`);
	};

	$: handleRef && initialize(handleRef), $changedAt;
</script>

<div
	data-generator-handle
	use:drag
	bind:this={handleRef}
	data-id={handle.id}
	style={$positionStyles}
	class={handle.axis === 'x' ? 'active:cursor-ew-resize' : 'active:cursor-ns-resize'}
/>

<style lang="postcss">
</style>
