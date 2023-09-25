import { writable } from 'svelte/store';
import type { Handle } from '~/types';
import { getRandomInt, persisted } from '~/utils';

const HANDLES_INITIAL_STATE: Handle[] = [
	{ id: 'top', progress: 0, axis: 'x', position: [0, 0] },
	{ id: 'right', progress: 0, axis: 'y', position: [100, 0] },
	{ id: 'bottom', progress: 100, axis: 'x', position: [100, 100] },
	{ id: 'left', progress: 100, axis: 'y', position: [0, 100] }
];

export function createHandles() {
	const local = persisted('brdrly-handles', HANDLES_INITIAL_STATE);
	const changedAt = writable(Date.now());

	return {
		subscribe: local.subscribe,
		changedAt: { subscribe: changedAt.subscribe },
		update: (id: string, progress: number) => {
			local.update((handles) => {
				const updatedHandles = handles.map((handle) => ({
					...handle,
					progress: handle.id === id ? progress : handle.progress
				}));
				return updatedHandles;
			});
		},
		reset: () => {
			changedAt.set(Date.now());
			local.set(HANDLES_INITIAL_STATE);
		},
		shuffle: () => {
			changedAt.set(Date.now());
			local.update((handles) => {
				const updatedHandles = handles.map((handle) => ({
					...handle,
					progress: getRandomInt(0, 100)
				}));
				return updatedHandles;
			});
		}
	};
}

