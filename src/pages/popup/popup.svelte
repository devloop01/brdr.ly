<script lang="ts">
	import './popup.postcss';

	import { ResetIcon, ShuffleIcon, CopyIcon } from '~/icons';
	import { Button, Generator, MotionToggle, ThemeToggle } from '~/components';
	import { createRadiusTextFromHandles, writeToClipboard } from '~/utils';
	import { ctx } from '~/context';
	import { shadow } from '~/actions';

	const { handles, mouse, motion } = ctx.popup.set();

	let inputRef: HTMLInputElement | undefined;

	let clicked = false;
	$: radius = createRadiusTextFromHandles($handles);

	const copyHandler = () => {
		clicked = true;
		const t = setTimeout(() => {
			clicked = false;
			clearTimeout(t);
		}, 500);

		writeToClipboard('border-radius: ' + radius);
	};

	const shuffleHandles = () => handles.shuffle();
	const resetHandles = () => handles.reset();

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Space') shuffleHandles();
		if (e.code === 'KeyC') copyHandler();
		if (e.code === 'KeyR') resetHandles();
	};

	const handleMousemove = (e: MouseEvent) => {
		const { clientX, clientY } = e;
		mouse.set({ x: clientX, y: clientY });
	};

	$: inputRef && shadow(inputRef, { mouse: $mouse, maxLength: 3, disabled: $motion === 'disabled' });
</script>

<svelte:window on:keyup={handleKeydown} on:mousemove={handleMousemove} />

<div class="bg-background">
	<header class="flex justify-center p-4 pb-0">
		<h1 class="select-none font-croissant-one text-2xl font-bold">brdr.ly</h1>
	</header>

	<main class="p-5 pt-0">
		<div class="py-3">
			<Generator {radius} />
		</div>

		<div class="flex flex-col gap-2">
			<div class="mb-1.5">
				<span class="select-none text-base font-medium">border-radius:</span>
				<input
					bind:this={inputRef}
					type="text"
					id="radius-text"
					class="block w-full rounded bg-transparent px-6 py-3 text-center font-mono text-base tabular-nums shadow-[var(--shadow-x,3px)_var(--shadow-y,3px)_0px_0px_rgba(0,0,0)] ring-2 ring-inset ring-black focus:outline-0"
					value={clicked ? 'Copied!' : radius}
					readonly
				/>
			</div>
			<div class="flex justify-between">
				<div class="flex gap-2">
					<Button on:click={shuffleHandles} aria-label="Shuffle Handles Position">
						<ShuffleIcon w={20} h={20} />
					</Button>
					<Button on:click={copyHandler} aria-label="Copy Border Radius Text">
						<CopyIcon w={20} h={20} />
					</Button>
					<Button on:click={resetHandles} aria-label="Reset Handles Position">
						<ResetIcon w={20} h={20} />
					</Button>
				</div>

				<div class="flex gap-2">
					<MotionToggle />
					<ThemeToggle />
				</div>
			</div>
		</div>
	</main>
</div>
