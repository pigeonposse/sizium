import { getWorkspaceConfig } from '@dovenv/theme-pigeonposse'

export default await getWorkspaceConfig( {
	metaURL : import.meta.url,
	path    : '../',
	core    : {
		metaURL : import.meta.url,
		path    : '../packages/lib',
	},
} )

