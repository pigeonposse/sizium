import type { LIFE_CYCLE_SCRIPTS }               from './const'
import type { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'

export type PackageJSON = JSONSchemaForNPMPackageJsonFiles & {
	name    : string
	version : string
}
type lifeCycleScripts = typeof LIFE_CYCLE_SCRIPTS[number]
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
		npm         : string
		homepage?   : string
		repository? : string
		funding?    : string
		unpkg?      : string
	}
	/** Unpacked size in bytes */
	unpackedSize      : number
	unpackedSizeKB    : number
	unpackedSizeMB    : number
	dependencies?     : PackageJSON['dependencies']
	devDependencies?  : PackageJSON['devDependencies']
	lifeCycleScripts? : { [key in lifeCycleScripts]?: string }
	installedBy?      : string[]
	/** Level of the dependence installation. Main packages is 0 */
	level             : number
}

export type SiziumResponse = {
	id         : string
	/** Number of total packages installed */
	packageNum : number
	/** Size in bytes */
	size       : number
	/** Size in kylobytes */
	sizeKB     : number
	/** Size in megabytes */
	sizeMB     : number
	/** All data from packages */
	packages   : PackageInfo[]
}

