<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cn } from '~/utils';
	import { ctx } from '~/context';
	import { shadow } from '~/actions';

	interface $$Props extends HTMLButtonAttributes {}

	let className: $$Props['class'] = undefined;
	export { className as class };

	const { mouse, motion } = ctx.popup.get();

	let buttonRef: HTMLButtonElement | undefined;

	$: buttonRef && shadow(buttonRef, { mouse: $mouse, maxLength: 2, disabled: $motion === 'disabled' });
</script>

<button bind:this={buttonRef} class="btn" on:click type="button" {...$$restProps}>
	<span class="btn--back"></span>
	<span class={cn('btn--front', className)}>
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
</style>
