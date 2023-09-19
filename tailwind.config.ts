import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				chillax: ['Chillax', ...fontFamily.sans],
				'croissant-one': ['Croissant One', ...fontFamily.sans]
			},
			boxShadow: {
				'0px': '0px 0px 0 0 rgb(0 0 0 / 1)',
				'1.5px': '1.5px 1.5px 0 0 rgb(0 0 0 / 1)',
				'3px': '3px 3px 0 0 rgba(0 0 0 / 1)'
			},
			colors: {
				custom: {
					purple: { light: 'var(--purple-light)', dark: 'var(--purple-dark)' },
					yellow: { light: 'var(--yellow-light)', dark: 'var(--yellow-dark)' },
					pink: { light: 'var(--pink-light)', dark: 'var(--pink-dark)' },
					green: { light: 'var(--green-light)', dark: 'var(--green-dark)' }
				},
				text: 'var(--text)',
				background: 'var(--background)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)'
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

