import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import { createHandles } from '~/store';

const NAME = 'Popup';

export const ctx = {
	set,
	get
};

type GetReturn = ReturnType<typeof createHandles>;

function set() {
	const handles = createHandles();
	setContext(NAME, handles);
	return handles;
}

function get() {
	return getContext<GetReturn>(NAME);
}

