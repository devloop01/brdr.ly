import { getContext, setContext } from 'svelte';
import { createHandles } from '~/store';

const NAME = 'Popup';

type GetReturn = ReturnType<typeof createHandles>;

function set() {
	const handles = createHandles();
	setContext(NAME, handles);
	return handles;
}

function get() {
	return getContext<GetReturn>(NAME);
}

export const ctx = { set, get };

