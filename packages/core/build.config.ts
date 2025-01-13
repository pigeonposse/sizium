import { config }            from '@sizium/repo-config/unbuild'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		...config,
		entries : [
			'./src/main',
			'./src/search/registry',
			'./src/search/local',
		],

		externals : [ '@schemastore/package' ],
	},
] )
