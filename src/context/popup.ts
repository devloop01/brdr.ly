import { getContext, setContext } from 'svelte';
import { createHandles, createTheme } from '~/store';

const NAME = 'Popup';

function set() {
	const handles = createHandles();
	const theme = createTheme();

	const state = {
		handles,
		theme
	};

	setContext(NAME, state);
	return state;
}

function get() {
	return getContext<ReturnType<typeof set>>(NAME);
}

export const ctx = { set, get };

