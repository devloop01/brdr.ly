<script lang="ts">
	export let w: number = 24;
	export let h: number = 24;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	width={w}
	height={h}
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="2"
	{...$$restProps}
>
	<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
	<path d="M3 3v5h5" />
</svg>
