import { getWorkspaceConfig } from '@dovenv/theme-pigeonposse'

export default await getWorkspaceConfig( {
	metaURL      : import.meta.url,
	path         : '../',
	packagesPath : './packages',
	corePath     : './packages/lib',
} )

