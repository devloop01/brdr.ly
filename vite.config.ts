import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webExtension, { readJsonFile } from 'vite-plugin-web-extension';
import path from 'path';

function generateManifest() {
	const manifest = readJsonFile('src/manifest.json');
	const pkg = readJsonFile('package.json');

	return {
		name: pkg.displayName,
		description: pkg.description,
		version: pkg.version,
		...manifest
	};
}

export default defineConfig({
	plugins: [
		svelte(),
		webExtension({
			manifest: generateManifest,
			watchFilePaths: ['package.json', 'manifest.json']
		})
	],
	resolve: {
		alias: {
			$lib: path.resolve(__dirname, 'src/lib')
		}
	}
});

