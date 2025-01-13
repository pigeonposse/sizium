import type { Config } from 'tailwindcss'

const colors = { primary : {
	50  : '#f2f2fb',
	100 : '#e7e7f8',
	200 : '#d5d4f1',
	300 : '#bdbae7',
	400 : '#a89edb',
	500 : '#9585cf',
	600 : '#856cbf',
	700 : '#735ba7',
	800 : '#5d4c87',
	900 : '#4d426d',
	950 : 'rgb(17 15 24)',
} }

/** @type {import('tailwindcss').Config} */
export default {
	content : [ './src/**/*.{html,js,svelte,ts}' ],
	/**
	 * Colors of interface.
	 * @see https://uicolors.app/create
	 * @see https://www.tints.dev/
	 */
	theme   : { extend: { colors } },

	plugins : [
		function ( { addBase } ) {

			addBase( { ':root' : {
				'--theme-primary'     : colors.primary[500],
				'--theme-primary-900' : colors.primary[900],
			} } )

		},
	],
} satisfies Config
