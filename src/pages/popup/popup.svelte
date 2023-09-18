<script lang="ts" context="module">
</script>

<script lang="ts">
	import { RefreshIcon, ShuffleIcon } from '~/icons';
	import { Button, PopupHeader, Generator } from '~/components';
	import { createRadiusTextFromHandles, cx, writeToClipboard } from '~/utils';
	import { ctx } from './ctx';

	const {
		states: { handles },
		helpers: { reset, shuffle }
	} = ctx.set();

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

	const resetHandler = () => {
		reset();
	};

	const shuffleHandler = () => {
		shuffle();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.code === 'Space') shuffleHandler();
		if (e.code === 'KeyC') copyHandler();
		if (e.code === 'KeyR') resetHandler();
	};
</script>

<svelte:window on:keyup={handleKeydown} />

<div class="border-2 border-black">
	<PopupHeader />

	<main class="bg-gradient-grid px-6 py-4">
		<Generator />

		<div class="flex flex-col gap-2">
			<div>
				<label for="radius-text" class="select-none text-base text-white">border-radius:</label>
				<input
					id="radius-text"
					class="'block w-full rounded bg-white px-6 py-3 text-center font-mono text-base tabular-nums shadow-3px ring-2 ring-inset ring-black focus:outline-0"
					value={clicked ? 'Copied!' : radius}
					readonly
				/>
			</div>
			<div class="flex gap-2">
				<Button variant="secondary" on:click={shuffleHandler}>
					<ShuffleIcon />
				</Button>
				<Button variant="primary" class="px-12" on:click={copyHandler}>Copy</Button>
				<Button variant="destructive" on:click={resetHandler}>
					<RefreshIcon />
				</Button>
			</div>
		</div>
	</main>
</div>

<style lang="postcss">
	.bg-gradient-grid {
		background:
			linear-gradient(90deg, transparent 0%, 98%, theme(colors.custom.purple.light) 98%) 0px 0px / 50px 50px repeat
				repeat,
			linear-gradient(0deg, theme(colors.custom.purple.dark) 0%, 98%, theme(colors.custom.purple.light) 98%) 0px 0px /
				50px 50px repeat repeat;
		background-position: 25px 25px;
	}
</style>
