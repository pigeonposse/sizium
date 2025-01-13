export const ERROR_ID = {
	INVALID_PKG_NAME      : 'INVALID_PKG_NAME',
	GETTING_PKG_NAME      : 'GETTING_PKG_NAME',
	GETTING_REGISTRY_DATA : 'GETTING_REGISTRY_DATA',
	GETTING_LOCAL_DATA    : 'GETTING_LOCAL_DATA',
} as const

export const  LIFE_CYCLE_SCRIPTS = [
	'preinstall',
	'install',
	'postinstall',
	'prepublish',
	'preprepare',
	'prepare',
	'postprepare',
] as const
