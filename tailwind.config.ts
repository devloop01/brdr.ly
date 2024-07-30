import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				chillax: ['var(--font-chillax)', ...fontFamily.sans],
				'croissant-one': ['var(--font-croissant-one)', ...fontFamily.sans]
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: 'hsl(var(--destructive))',
				ring: 'hsl(var(--ring))'
			},
			cursor: {
				default: 'var(--cursor-default)',
				pointer: 'var(--cursor-pointer)',
				grab: 'var(--cursor-grab)',
				grabbed: 'var(--cursor-grabbed)',
				text: 'var(--cursor-text)',
				'resize-ns': 'var(--cursor-resize-ns)',
				'resize-we': 'var(--cursor-resize-we)'
			}
		}
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					sq: (value) => ({
						width: value,
						height: value
					})
				},
				{ values: theme('spacing') }
			);
		})
	]
} satisfies Config;
