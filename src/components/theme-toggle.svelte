<script lans="ts">
	import { ctx } from '~/context';
	import { Button } from '.';
	import { MoonIcon, SunIcon } from '~/icons';

	const {
		states: { theme },
		helpers: { toggleTheme }
	} = ctx.popup.get().theme;
</script>

<Button size="square" on:click={toggleTheme}>
	{#if theme === 'dark'}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</Button>
