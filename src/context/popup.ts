import { getContext, setContext } from 'svelte';
import { createHandles, createTheme, createMouse, createMotionToggle } from '~/store';

const NAME = 'Popup';

function set() {
	const handles = createHandles();
	const theme = createTheme();
	const mouse = createMouse();
	const motion = createMotionToggle();

	const state = {
		handles,
		theme,
		mouse,
		motion
	};

	setContext(NAME, state);
	return state;
}

function get() {
	return getContext<ReturnType<typeof set>>(NAME);
}

export const ctx = { set, get };

