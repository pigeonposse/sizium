/* eslint-disable camelcase */
import { image2ascii } from '@ascii-kit/image'
import {
	dedent,
	joinUrl,
	removeEmptyLines,
} from '@dovenv/core/utils'
import media                                    from '@svaio/media'
import { setDefaultMediaConfig as mediaConfig } from '@svaio/media/utils'
import pwa                                      from '@svaio/pwa'
import { setDefaultConfig }                     from '@svaio/pwa/utils'
import sitemap                                  from '@svaio/sitemap'
import unocss                                   from '@svaio/unocss'
import {
	extractorSvelte,
	transformerDirectives,
	presetIcons,
	presetWind4,
} from '@svaio/unocss/utils'
import { sveltekit }  from '@sveltejs/kit/vite'
import {
	defineConfig,
	type PluginOption,
} from 'vite'

import pkg     from './package.json'
import mainPkg from '../../package.json'

const i18n      = {
	defaultLanguage : 'en',
	languages       : [ 'en' ],
}
const ascciLogo = async () => {

	const res   = await fetch( 'https://github.com/pigeonposse.png?size=72' )
	const input = await res.arrayBuffer()
	const value = await image2ascii( input, { chars: ' -.@' } )

	return `${dedent( removeEmptyLines( value ) )}\n\nMade with ❤️ by ${mainPkg.extra.collective.name}\n\nWeb: ${mainPkg.extra.collective.url}\nProjects: ${mainPkg.extra.collective.gh}\nDonate: ${mainPkg.extra.collective.funding}`

}
export const colors = { primary : {
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
} }
export default defineConfig( {
	plugins : [
		media( {
			enhanced : true,
			create   : { value : { og : mediaConfig( {
				title : mainPkg.extra.productName,
				desc  : mainPkg.extra.shortDesc,
				text  : mainPkg.extra.action,
				image : joinUrl( mainPkg.extra.rawRepoURL, '/refs/heads/main/docs/public/logo.png' ),
				color : {
					primary   : colors.primary[500],
					secondary : colors.primary[900],
					terciary  : colors.primary[400],
					fourth    : colors.primary[100],
				},
			} ) } },
		} ),
		sveltekit() as PluginOption,
		pwa( setDefaultConfig( {
			name        : mainPkg.extra.productName,
			description : mainPkg.extra.shortDesc,
			manifest    : {
				theme_color      : colors.primary[500],
				background_color : colors.primary[950],
				lang             : i18n.defaultLanguage,
				categories       : [ 'productivity', 'utilities' ],
			},
		} ) ),
		sitemap( {
			hostname : mainPkg.homepage,
			i18n,
			robots   : [
				{
					userAgent : '*',
					allow     : '/',
					disallow  : undefined,
				},
			],
		} ),
		unocss( {
			presets : [
				// presetWind3( ),
				presetWind4( { dark: 'class' } ),
				presetIcons( {
					prefix      : 'i-',
					collections : {
						'fa6-solid'  : () => import( '@iconify-json/fa6-solid/icons.json', { with: { type: 'json' } } ).then( i => i.default ),
						'fa6-brands' : () => import( '@iconify-json/fa6-brands/icons.json', { with: { type: 'json' } } ).then( i => i.default ),
					},
					// collections     : { 'fa6-solid': () => getIconsFromIconifyRemotely( { name: 'fa6-solid' } ) },
					extraProperties : {
						'display'        : 'inline-block',
						'vertical-align' : 'middle',
					},
				} ),
			],
			content      : { pipeline: { include: [ /\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|html)($|\?)/, 'src/**/*.{js,ts}' ] } },
			extractors   : [ extractorSvelte() ],
			transformers : [ transformerDirectives() ],
			theme        : { colors },
		} ),
	],
	define : {
		PKG        : pkg,
		MAIN_PKG   : mainPkg,
		LOGO_ASCII : JSON.stringify( await ascciLogo( ) ),
	},
} )
