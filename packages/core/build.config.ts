import { config }            from '@sizium/repo-config/unbuild'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig( [
	{
		...config,
		entries : [ './src/main' ],

		externals : [ '@schemastore/package' ],
	},
] )
