import { untrack } from 'svelte';

export class Persisted<T> {
	#isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
	#storage = this.#isBrowser ? localStorage : null;
	#serializer = JSON;

	value = $state<T>() as T;
	key = $state<string>('');

	constructor(key: string, initialValue: T) {
		this.key = key;
		this.value = initialValue;

		$effect(() => {
			untrack(() => {
				const json = this.#storage?.getItem(this.key);

				if (json) {
					this.set(<T>this.#serializer.parse(json));
				} else {
					this.#updateStorage(this.key, initialValue);
				}

				if (this.#isBrowser) {
					const handleStorage = (event: StorageEvent) => {
						if (event.key === this.key) {
							console.log(event);
							this.set(event.newValue ? this.#serializer.parse(event.newValue) : null);
						}
					};

					window.addEventListener('storage', handleStorage);

					return () => window.removeEventListener('storage', handleStorage);
				}
			});
		});
	}

	set(value: T) {
		this.#updateStorage(this.key, value);
		this.value = value;
	}

	update(callback: (value: T) => T) {
		if (!this.value) return;

		const lastValue = this.value;
		const newValue = callback(lastValue);
		this.#updateStorage(this.key, newValue);
		this.value = newValue;
	}

	#updateStorage(key: string, value: T) {
		this.#storage?.setItem(key, this.#serializer.stringify(value));
	}
}
