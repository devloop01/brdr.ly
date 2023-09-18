import { writable } from 'svelte/store';

export function persisted<T>(key: string, initialValue: T) {
	const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
	const storage = isBrowser ? localStorage : null;
	const serializer = JSON;

	function updateStorage(key: string, value: T) {
		storage?.setItem(key, serializer.stringify(value));
	}

	const store = writable(initialValue, (set) => {
		const json = storage?.getItem(key);

		if (json) {
			set(<T>serializer.parse(json));
		} else {
			updateStorage(key, initialValue);
		}

		if (isBrowser) {
			const handleStorage = (event: StorageEvent) => {
				if (event.key === key) {
					console.log(event);
					set(event.newValue ? serializer.parse(event.newValue) : null);
				}
			};

			window.addEventListener('storage', handleStorage);

			return () => window.removeEventListener('storage', handleStorage);
		}
	});

	return {
		subscribe: store.subscribe,
		set(value: T) {
			updateStorage(key, value);
			store.set(value);
		},
		update(callback: (value: T) => T) {
			return store.update((lastValue) => {
				const newValue = callback(lastValue);
				updateStorage(key, newValue);
				return newValue;
			});
		}
	};
}

