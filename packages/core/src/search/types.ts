import type { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'

export type PackageJSON = JSONSchemaForNPMPackageJsonFiles & {
	name    : string
	version : string
}

export type PackageInfo = {
	name         : string
	version      : string
	description? : string
	license?     : string
	isESM        : boolean
	isCommonJS   : boolean
	types        : boolean
	author?: {
		name : string
		url  : string
	}
	url: {
		homepage?   : string
		repository? : string
		funding?    : string
		unpkg?      : string
	}
	/** Unpacked size in bytes */
	unpackedSize     : number
	dependencies?    : PackageJSON['dependencies']
	devDependencies? : PackageJSON['devDependencies']
	installedBy?     : string[]
	/** Level of the dependence installation. Main packages is 0 */
	level            : number
}

export type SiziumResponse = {
	id         : string
	packageNum : number
	/** Size in bytes */
	size       : number
	packages   : PackageInfo[]
}

