import { spring } from 'svelte/motion';
import type { Mouse, Theme } from '~/types';
import { persisted } from '~/utils';

export * from './handles';

export function createMouse() {
	const { subscribe, set } = spring<Mouse>({ x: 0, y: 0 });

	return {
		subscribe,
		set
	};
}

export function createTheme() {
	const { subscribe, update } = persisted<Theme>('brdrly-theme', 'light');

	return {
		subscribe,
		toggle: () => update((theme) => (theme === 'light' ? 'dark' : 'light'))
	};
}

export function createMotionToggle() {
	const { subscribe, update } = persisted<'enabled' | 'disabled'>('brdrly-motion', 'enabled');

	return {
		subscribe,
		toggle: () => update((motion) => (motion === 'enabled' ? 'disabled' : 'enabled'))
	};
}

