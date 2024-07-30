<script lang="ts">
	import { spring } from 'svelte/motion';
	import { ctx } from '~/context/popup';

	import Button from '~/components/button.svelte';

	const { motion } = ctx.get();

	const properties = {
		disabled: {
			opacity: 0,
			scale: 0,
			rotation: 0
		},
		enabled: {
			opacity: 1,
			scale: 1.2,
			rotation: 90
		}
	};

	const selectedProps = spring({ ...properties[$motion] }, { stiffness: 0.1, damping: 0.2 });
	const { opacity, scale, rotation } = $derived($selectedProps);

	$effect.pre(() => {
		selectedProps.set({ ...properties[$motion] });
	});

	const label = $derived($motion === 'enabled' ? 'Disable Shadow Animation' : 'Enable Shadow Animation');

	function handleClick() {
		motion.toggle();
	}
</script>

<Button onclick={handleClick} aria-label={label}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-star"
	>
		<path
			style:transform-origin="center center"
			style:transform="rotate({rotation}deg)"
			d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
		/>

		<g style:transform-origin="center center" style:scale>
			<path d="M5 3v4" />
			<path d="M3 5h4" />
			<path d="M19 17v4" />
			<path d="M17 19h4" />
		</g>
	</svg>
</Button>
