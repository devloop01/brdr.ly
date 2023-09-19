import type { Theme } from '~/types';
import { persisted } from '~/utils';

export function createTheme() {
	const { subscribe, set, update } = persisted<Theme>('brdrly-theme', 'light');

	return {
		states: { theme: { subscribe } },
		helpers: { setTheme: set, toggleTheme: () => update((theme) => (theme === 'light' ? 'dark' : 'light')) }
	};
}

