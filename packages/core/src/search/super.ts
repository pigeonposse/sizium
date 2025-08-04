import {
	ERROR_ID,
	LIFE_CYCLE_SCRIPTS,
} from './const'
import { getVersion }             from './utils'
import { TypedError }             from '../_shared/error'
import { normalizeRepositoryUrl } from '../_shared/url'

import type {
	PackageJSON,
	PackageInfo,
	RegistryPackageJSON,
} from './types'

type SiziumErrorID = typeof ERROR_ID[keyof typeof ERROR_ID]

export class SiziumError extends TypedError<SiziumErrorID, {
	msg : string
	e?  : unknown
}> {}

// eslint-disable-next-line @stylistic/object-curly-newline
type PackageSuperOptions = {
	/** Skip error on package dependence and return undefined  */
	skipError : boolean }

export class PackageSuper {

	ERROR_ID = ERROR_ID
	Error = SiziumError
	#processedPackages : Set<string> = new Set()
	protected LIFE_CYCLE_SCRIPTS = LIFE_CYCLE_SCRIPTS

	constructor(
		public input: string,
		public opts?: PackageSuperOptions,
	) {

	}

	// #getFixedVersion( version: string ) {

	// 	const validVersion = semver.valid( semver.coerce( version ) )
	// 	return validVersion ? validVersion : 'latest'

	// }

	protected getMainPkgData( allPackages: PackageInfo[] ) {

		const totalSize = allPackages.reduce( ( sum, pkg ) => {

			const size = pkg.unpackedSize ?? 0
			return sum + size

		}, 0 )

		return {
			id         : allPackages[0].name,
			packageNum : allPackages.length,
			size       : totalSize,
			sizeKB     : totalSize / 1000,
			sizeMB     : totalSize / 1000000,
			packages   : allPackages,
		}

	}

	protected getPkgData( opts: {
		data          : PackageJSON
		level?        : number
		unpackedSize? : number
		installedBy?  : string | string[]
	} ): PackageInfo {

		const {
			data, level = 0, unpackedSize, installedBy,
		} = opts
		const lcScripts = {} as NonNullable<PackageInfo['lifeCycleScripts']>

		if ( data.scripts ) {

			const scripts = Object.keys( data.scripts )
			scripts.forEach( script => {

				if ( this.LIFE_CYCLE_SCRIPTS.includes( script as keyof typeof lcScripts ) )
					// @ts-ignore
					lcScripts[script] = data.scripts[script]

			} )

		}
		const size = unpackedSize ?? 0
		return {
			id          : `${data.name}@${data.version}`,
			name        : data.name,
			version     : data.version,
			description : data.description,
			license     : data.license,
			isESM       : data.type === 'module',
			isCommonJS  : data.type !== 'module',
			types       : !!data.types,
			author      : data.author && data.author.url
				? {
					name : data.author.name,
					url  : data.author.url,
				}
				: undefined,
			url : {
				homepage   : normalizeRepositoryUrl( data.homepage ),
				repository : normalizeRepositoryUrl(
					typeof data.repository === 'string'
						? data.repository
						: data.repository?.url,
				),
				funding : Array.isArray( data.funding )
					? typeof data.funding[0] === 'string'
						? data.funding[0]
						: data.funding[0]?.url
					: typeof data.funding === 'string'
						? data.funding
						: data.funding?.url,
				npm   : `https://www.npmjs.com/package/${data.name}/v/${data.version}`,
				unpkg : `https://unpkg.com/${data.name}@${data.version}/`,
			},
			unpackedSize   : size,
			unpackedSizeKB : size / 1000,
			unpackedSizeMB : size / 1000000,
			dependencies   : data.dependencies,
			// dependencies   : !data.dependencies
			// 	? undefined
			// 	: Object.fromEntries( Object.entries( data.dependencies ).map( ( [ key, value ] ) => {

			// 		return [
			// 			key,
			// 			{
			// 				version        : this.#getFixedVersion( value || 'latest' ),
			// 				packageVersion : value,
			// 			},
			// 		]

			// 	} ) ),
			devDependencies  : data.devDependencies,
			lifeCycleScripts : Object.keys( lcScripts ).length ? lcScripts : undefined,
			installedBy      : installedBy === undefined
				? undefined
				: Array.isArray( installedBy )
					? installedBy
					: [ installedBy ],
			level : level,
		}

	}

	protected async getRegistryData( opts: {
		name         : string
		version      : string
		level?       : number
		installedBy? : string
	} ): Promise<PackageInfo> {

		const {
			name: packageName,
			version,
			level = 0,
			installedBy,
		} = opts

		try {

			const response = await fetch( `https://registry.npmjs.org/${packageName}` )
			if ( !response.ok ) {

				if ( response.status === 404 )
					throw new Error( `Package "${packageName}" not found (404 Not Found).` )
				else
					throw new Error( `Failed to fetch data. HTTP Status: ${response.status}` )

			}
			const res = await response.json()

			const selectedVersion = getVersion( version, Object.keys( res.versions ) )
				|| res['dist-tags'].latest
				|| 'latest'

			const data = res.versions[selectedVersion] as RegistryPackageJSON

			if ( !data ) throw new Error( `Version ${version} (${selectedVersion}) not found` )

			const size       = data.dist?.unpackedSize
			const secureSize = typeof size === 'string' ? Number( size ) : typeof size === 'number' ? size : undefined

			return this.getPkgData( {
				data,
				level,
				unpackedSize : secureSize,
				installedBy,
			} )

		}
		catch ( e ) {

			throw new this.Error(
				this.ERROR_ID.GETTING_REGISTRY_DATA,
				{
					msg : `Error getting "${packageName}" dependence data. ${e instanceof Error ? e.message : ''}`,
					e,
				},
			)

		}

	}

	async #processDependencies( dependencies: NonNullable<PackageInfo['dependencies']>, level: number, parentName: string ): Promise<PackageInfo[]> {

		const packages   = new Map<string, PackageInfo>()
		const addPackage = ( pkg: PackageInfo ) => {

			const pkgExist = packages.get( pkg.id )

			packages.set( pkg.id, pkgExist
				? {
					...pkgExist,
					installedBy : !pkg.installedBy ? pkgExist.installedBy : [ ...pkgExist.installedBy || [], ...pkg.installedBy ],
				}
				: pkg,
			)

		}
		const promises = Object.entries( dependencies ).map( async ( [ depName, depVersion ] ) => {

			try {

				if ( !depVersion ) return
				const packageKey  = `${depName}@${depVersion}`
				const installedBy = parentName
				// console.log( {
				// 	packageKey,
				// 	installedBy,
				// } )

				if ( this.#processedPackages.has( packageKey ) ) return
				this.#processedPackages.add( packageKey )

				const depData = await this.getRegistryData( {
					name    : depName,
					version : depVersion,
					level,
					installedBy,
				} )
				addPackage( depData )

				if ( depData.dependencies ) {

					const subDeps = await this.#processDependencies( depData.dependencies, level + 1, packageKey )
					for ( const pkg of subDeps ) addPackage( pkg )

				}

			}
			catch ( e ) {

				if ( this.opts?.skipError ) return
				throw e

			}

		} )

		await Promise.all( promises )
		return Array.from( packages.values() )

	}

	protected async getPackagesData( mainPackage: PackageInfo ): Promise<PackageInfo[]> {

		const allPackages = [ mainPackage ]
		const mainId      = `${mainPackage.name}@${mainPackage.version}`

		this.#processedPackages.add( mainId )

		if ( mainPackage.dependencies ) {

			const deps = await this.#processDependencies( mainPackage.dependencies, 1, mainId )
			allPackages.push( ...deps )

		}

		return allPackages

	}

}

