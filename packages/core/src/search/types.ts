import type { LIFE_CYCLE_SCRIPTS }               from './const'
import type { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any
export type PackageJSON = JSONSchemaForNPMPackageJsonFiles & {
	name    : string
	version : string
}

export type RegistryPackageJSON = PackageJSON & {
	_id           : string
	dist?         : { unpackedSize: number }
	[key: string] : Any
}

type lifeCycleScripts = typeof LIFE_CYCLE_SCRIPTS[number]

// type Dependences = { [key: string]: {
// 	/** Fixed version */
// 	version        : string
// 	/** Original version of the package */
// 	packageVersion : NonNullable<PackageJSON['dependencies']>[number]
// } }
export type PackageInfo = {
	/**
	 * The id of the package: `name@version`
	 */
	id           : string
	/**
	 * The name of the package
	 */
	name         : string
	/**
	 * The version of the package
	 */
	version      : string
	/**
	 * The description of the package
	 */
	description? : string
	/**
	 * The license of the package
	 */
	license?     : string
	/**
	 * If the package is written in ESM
	 */
	isESM        : boolean
	/**
	 * If the package is written in CommonJS
	 */
	isCommonJS   : boolean
	/**
	 * If the package has types
	 */
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
	/**
	 * Life cycle scripts like:
	 * - {post,pre}install
	 * - {post,pre}publish
	 * - {post,pre}prepare
	 */
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

