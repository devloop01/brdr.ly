import type { Theme } from '~/types';
import { persisted } from '~/utils';

export function createTheme() {
	const { subscribe, set } = persisted<Theme>('theme', 'light');

	return {
		states: { theme: { subscribe } },
		helpers: { setTheme: set }
	};
}

