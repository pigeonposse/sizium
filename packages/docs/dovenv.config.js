import { defineConfig } from '@dovenv/core'
import { joinUrl }      from '@dovenv/core/utils'
import {
	pigeonposseTheme,
	docs,
	Predocs,
} from '@dovenv/theme-pigeonposse'

import core from '../../.dovenv/const.js'

const ICON = {
	LIB      : '📚',
	BIN      : '🔢',
	CLI      : '🔢',
	REST_API : '🌐',
	START    : '🏁',
	API      : '📖',
	EXAMPLES : '💡',
	CORE     : '☀️',
}
export default defineConfig(
	pigeonposseTheme( {
		core,
		docs : async utils => {

			const sidebar = [
				{
					text  : 'Introduction',
					items : [
						{
							text : `What is ${core.pkg.extra.productName.toUpperCase()}?`,
							link : '/guide/',
						},
					],
				},
				{
					text  : 'Reference',
					items : [
						{
							text  : `${ICON.LIB} Library`,
							items : [
								{
									text : `${ICON.START} Get started`,
									link : '/guide/lib/',
								},
								{
									text : `${ICON.API} API`,
									link : '/guide/lib/api.md',
								},
								{
									text : `${ICON.CORE} Core`,
									link : '/guide/core/',
								},
							],
						},
						{
							text  : `${ICON.CLI} CLI`,
							items : [
								{
									text : `🏁 Get started`,
									link : '/guide/cli/',
								},
							],
						},
						{
							text  : `${ICON.REST_API} REST API`,
							items : [
								{
									text : `🏁 Get started`,
									link : '/guide/api/',
								},
								{
									text : `🖥️ Client`,
									link : '/guide/api-client/',
								},
								{
									text : `🟢 Node server`,
									link : '/guide/node-server/',
								},
							],
						},
					],
				},
			]

			const data = await docs.getPkgConfig(
				utils.pkg || {},
			)

			return {
				...data,
				input     : '../../docs',
				output    : './build',
				version   : core.corePkg?.version,
				vitepress : {
					ignoreDeadLinks : true,
					themeConfig     : { outline: { level: [ 2, 3 ] } },
					// vite            : { build: { chunkSizeWarningLimit: 1000 } },
				},
				sidebar : {
					'/guide/'       : sidebar,
					'/todo/'        : sidebar,
					'/contributors' : sidebar,
				},
				autoSidebar : {
					intro     : false,
					reference : false,
				},
				nav : [
					{
						text : 'Web',
						link : core.pkg.homepage,
					},
				],
				download : {
					groups : { bin: 'Executables' },
					items  : {
						...core.pkg.extra.downloadUrl,
						all : {
							name : 'View all',
							type : 'bin',
							url  : joinUrl( core.corePkg.repository.url, 'releases' ),
						},
					},
				},
				styles : { color: { secondary: '#7375e1' } },
			}

		},
	} ),
	{ custom : { predocs : {
		desc : 'build docs pages',
		fn   : async ( { utils } ) => {

			const docs = new Predocs( { utils } )
			const log  = docs.utils.logGroup( 'Predocs' )

			log.info( '🏁', 'Starting...' )
			log.step()

			await docs.setIndexFile( {
				noFeatures : true,
				custom     : { features : [
					{
						title   : 'Get started',
						icon    : ICON.START,
						details : 'Start your project now',
						link    : '/guide',
					},
					{
						title   : 'Library',
						icon    : ICON.LIB,
						details : 'Check the documentation',
						link    : '/guide/core',
					},
					{
						title   : 'CLI',
						icon    : ICON.CLI,
						details : 'Check the CLI documentation',
						link    : '/guide/cli',
					},
					{
						title   : 'REST API',
						icon    : ICON.REST_API,
						details : 'Check the Rest API documentation',
						link    : '/guide/api',
					},
				] },
			} )
			await docs.setContributorsFile()
			await docs.setGuideIndexFile()
			await docs.setGuideSectionIndexFile( { none : [
				'config',
				'theme',
				'plugin',
			] } )

			await docs.setPackageFiles( { packages: false } )

			log.step()
			log.success( '✨', 'Done!' )

		},
	} } },
)
