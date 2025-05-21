import type { Config } from 'tailwindcss'

const colors = { primary : {
	50  : '#f0f3fd',
	100 : '#e3e9fc',
	200 : '#cdd6f8',
	300 : '#afbaf2',
	400 : '#8e97eb',
	500 : '#7375e1',
	600 : '#5e57d4',
	700 : '#5148ba',
	800 : '#423d96',
	900 : '#393778',
	950 : '#0a081a',
	// 50  : '#f0f6fe',
	// 100 : '#deebfb',
	// 200 : '#c5def8',
	// 300 : '#9dc9f3',
	// 400 : '#6eaaec',
	// 500 : '#4788e4',
	// 600 : '#3770d9',
	// 700 : '#2e5bc7',
	// 800 : '#2b4ba2',
	// 900 : '#284280',
	// 950 : '#1d2a4e',
} }

/** @type {import('tailwindcss').Config} */
export default {
	content : [ './src/**/*.{html,js,svelte,ts}' ],
	/**
	 * Colors of interface.
	 *
	 * @see https://uicolors.app/create
	 * @see https://www.tints.dev/
	 */
	theme   : { extend: { colors } },

	plugins : [
		{ handler : ( { addBase } ) => {

			addBase( { ':root' : {
				'--theme-primary'     : colors.primary[500],
				'--theme-primary-900' : colors.primary[900],
			} } )

		} },
	],
} satisfies Config
