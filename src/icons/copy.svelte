<script lang="ts">
	export let w: number = 24;
	export let h: number = 24;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={w}
	height={h}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width="2"
	{...$$restProps}
>
	<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
	<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
