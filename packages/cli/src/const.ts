import {
	name as pkgName,
	bin,
	version,
	bugs,
	repository,
	description,
	homepage,
} from '../package.json'

export const name = Object.keys( bin )[0] || pkgName.toUpperCase()
export const bugsURL = bugs.url
export const repositoryURL = repository.url
export const documentationURL = homepage

export {
	version,
	pkgName,
	description,
}
export const RES_TYPE = {
	JSON     : 'json',
	SIZE     : 'size',
	ALL      : 'all',
	INFO     : 'info',
	MIN_INFO : 'min-info',
} as const
export const OPTIONS = {
	INPUT : {
		key   : 'input',
		alias : 'i',
	},
	RES : {
		key   : 'res',
		alias : 'r',
	},
} as const

export const GLOBBAL_OPTIONS = {
	VERSION : {
		key   : 'version',
		alias : 'v',
	},
	TIME : { key: 'time' },
	HELP : {
		key   : 'help',
		alias : 'h',
	},
	DEBUG : {
		key   : 'debug',
		alias : 'd',
	},
} as const

