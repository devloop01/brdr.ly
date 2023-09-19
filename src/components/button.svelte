<script lang="ts" context="module">
	import { cva } from '~/utils';
	import type { VariantProps } from 'cva';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export const buttonVariants = cva({
		base: [
			'relative inline-flex items-center justify-center rounded bg-white px-6 h-12 text-lg font-medium text-black ring-2 ring-inset ring-black transition-all duration-150 ease-in-out shadow-3px',
			'hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-1.5px',
			'active:translate-x-[3px] active:translate-y-[3px] active:shadow-0px',
			'focus:outline-none focus:translate-x-[1.5px] focus:translate-y-[1.5px] focus:shadow-1.5px',
			'after:absolute after:top-0 after:left-0 after:w-full after:h-full after:scale-110'
		],
		variants: {
			variant: {
				default: '',
				primary: 'bg-green-400',
				secondary: 'bg-yellow-300',
				destructive: 'bg-red-400'
			},
			size: {
				default: '',
				square: 'h-auto p-3'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariants = VariantProps<typeof buttonVariants>;
</script>

<script lang="ts">
	interface $$Props extends HTMLButtonAttributes {
		variant?: ButtonVariants['variant'];
		size?: ButtonVariants['size'];
	}

	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<button type="button" class={buttonVariants({ variant, size, className })} on:click {...$$restProps}>
	<slot />
</button>
