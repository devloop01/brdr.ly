<script lang="ts" context="module">
	import { cva, cx } from '~/utils';
	import type { VariantProps } from 'cva';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export const buttonVariants = cva({
		base: 'btn',
		variants: {
			variant: {
				default: '',
				primary: 'btn-primary',
				secondary: 'btn-secondary',
				accent: 'btn-accent'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type ButtonVariants = VariantProps<typeof buttonVariants>;
</script>

<script lang="ts">
	import { ctx } from '~/context';
	import { shadow } from '~/actions';

	interface $$Props extends HTMLButtonAttributes {
		variant?: ButtonVariants['variant'];
	}

	export let variant: $$Props['variant'] = 'default';
	let className: $$Props['class'] = undefined;
	export { className as class };

	const { mouse, motion } = ctx.popup.get();

	let buttonRef: HTMLButtonElement | undefined;

	$: buttonRef && shadow(buttonRef, { mouse: $mouse, maxLength: 2, disabled: $motion === 'disabled' });
</script>

<button bind:this={buttonRef} class={buttonVariants({ variant })} on:click type="button" {...$$restProps}>
	<span class="btn--back"></span>
	<span class={cx('btn--front', className)}>
		<slot />
	</span>
</button>

<style lang="postcss">
	.btn {
		--btn-foreground: theme(colors.foreground);
		--btn-background: theme(colors.background);
		--btn-height: theme(height.12);
		--btn-width: auto;
		--btn-padding: theme(padding.4);
		--btn-font-size: theme(fontSize.base);

		position: relative;
		cursor: theme(cursor.pointer);
		outline-offset: 2px;
		transition: filter 250ms;

		&:hover {
			filter: brightness(105%);
		}
		&:hover &--front {
			/* transform: translate(-1px, -1px); */
			transform: translate(calc(var(--shadow-x, 1px) * -1), calc(var(--shadow-y, 1px) * -1));
			transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
		}
		&:active &--front {
			/* transform: translate(2px, 2px); */
			transform: translate(var(--shadow-x, 2px), var(--shadow-y, 2px));

			transition: transform 34ms;
		}
		&:focus:not(:focus-visible) {
			outline: none;
		}
	}

	.btn--back {
		position: absolute;
		inset: 0;
		/* transform: translate(2px, 2px); */
		transform: translate(var(--shadow-x, 2px), var(--shadow-y, 2px));
		background: theme(colors.black);
		border-radius: theme(borderRadius.DEFAULT);
	}

	.btn--front {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		will-change: transform;
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

		box-shadow: inset 0px 0px 0px 2px theme(colors.black);
		font-weight: theme(fontWeight.medium);
		border-radius: theme(borderRadius.DEFAULT);

		color: var(--btn-foreground);
		background: var(--btn-background);
		height: var(--btn-height);
		width: var(--btn-width);
		padding-left: var(--btn-padding);
		padding-right: var(--btn-padding);
		font-size: var(--btn-font-size);
	}

	/************** VARIANTS ******************/

	.btn-primary {
		--btn-background: theme(colors.primary.DEFAULT);
		--btn-foreground: theme(colors.primary.foreground);
	}

	.btn-secondary {
		--btn-background: theme(colors.secondary.DEFAULT);
		--btn-foreground: theme(colors.secondary.foreground);
	}

	.btn-accent {
		--btn-background: theme(colors.accent.DEFAULT);
		--btn-foreground: theme(colors.accent.foreground);
	}

	/************** SIZES ******************/

	.btn-sm {
		--btn-height: theme(height.8);
		--btn-padding: theme(padding.3);
		--btn-font-size: theme(fontSize.xs);
	}

	.btn-lg {
		--btn-height: theme(height.14);
		--btn-padding: theme(padding.8);
		--btn-font-size: theme(fontSize.xl);
	}

	.btn-wide {
		--btn-padding: theme(padding.12);
	}
</style>
