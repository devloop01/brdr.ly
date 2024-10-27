import { spring } from 'svelte/motion';
import type { Mouse, Theme } from '$lib/types';
import { Persisted } from '$lib/utils';

export * from './handles.svelte';

export function createMouse() {
	const { subscribe, set } = spring<Mouse>({ x: 0, y: 0 });

	return {
		subscribe,
		set
	};
}

export function createTheme() {
	const theme = new Persisted<Theme>('brdrly-theme', 'light');

	return {
		get value() {
			return theme.value;
		},
		toggle: () => theme.update((theme) => (theme === 'light' ? 'dark' : 'light'))
	};
}

export function createMotionToggle() {
	const motion = new Persisted<'enabled' | 'disabled'>('brdrly-motion', 'enabled');

	return {
		get value() {
			return motion.value;
		},
		toggle: () => motion.update((motion) => (motion === 'enabled' ? 'disabled' : 'enabled'))
	};
}
