import semver from 'semver'

import { ERROR_ID }   from './const'
import { TypedError } from '../_shared/error'

import type {
	PackageJSON,
	PackageInfo,
} from './types'

type SiziumErrorID = typeof ERROR_ID[keyof typeof ERROR_ID]

export class SiziumError extends TypedError<SiziumErrorID, {
	msg : string
	e?  : unknown
}> {}

export class PackageSuper {

	ERROR_ID = ERROR_ID
	Error = SiziumError

	private processedPackages : Set<string> = new Set()

	protected getPkgData( data: PackageJSON, level = 0, unpackedSize?: number, installedBy?: string | string[] ): PackageInfo {

		const normalizeRepositoryUrl = ( url?: string ): string | undefined => {

			if ( !url ) return undefined

			try {

				const parsedUrl    = new URL( url )
				parsedUrl.protocol = 'https:' // force https

				if ( parsedUrl.pathname.endsWith( '.git' ) )
					parsedUrl.pathname = parsedUrl.pathname.slice( 0, -4 )

				return parsedUrl.toString()

			}
			catch ( _error ) {

				return undefined

			}

		}
		return {
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
				unpkg : `https://unpkg.com/${data.name}@${data.version}/`,
			},
			unpackedSize    : unpackedSize ?? 0,
			dependencies    : data.dependencies,
			devDependencies : data.devDependencies,
			installedBy     : installedBy === undefined
				? undefined
				: Array.isArray( installedBy )
					? installedBy
					: [ installedBy ],
			level : level,
		}

	}

	#getVersion( version:string, availableVersions: string[] ) {

		let selectedVersion: string | undefined
		if ( semver.valid( version ) ) selectedVersion = version
		else {

			selectedVersion = semver.maxSatisfying( availableVersions, version ) || undefined

		}
		return selectedVersion?.replace( /^v(?=\d)/, '' )

	}

	protected async getRegistryData( packageName: string, version: string, level = 0, installedBy?: string ): Promise<PackageInfo> {

		try {

			const response = await fetch( `https://registry.npmjs.org/${packageName}` )
			if ( !response.ok ) {

				if ( response.status === 404 )
					throw new Error( `Package "${packageName}" not found (404 Not Found).` )
				else
					throw new Error( `Failed to fetch data. HTTP Status: ${response.status}` )

			}
			const res = await response.json()

			const selectedVersion = this.#getVersion( version, Object.keys( res.versions ) )
				|| res['dist-tags'].latest
				|| 'latest'

			const data = res.versions[selectedVersion]

			if ( !data ) throw new Error( `Version ${version} (${selectedVersion}) not found` )

			const size       = data.dist?.unpackedSize
			const secureSize = typeof size === 'string' ? Number( size ) : typeof size === 'number' ? size : undefined

			return this.getPkgData( data, level, secureSize, installedBy )

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

		const packages: PackageInfo[] = []

		for ( const [ depName, depVersion ] of Object.entries( dependencies ) ) {

			const packageKey = `${depName}@${depVersion}`
			if ( !depVersion ) continue
			if ( this.processedPackages.has( packageKey ) ) continue

			this.processedPackages.add( packageKey )

			const depData = await this.getRegistryData( depName, depVersion, level, parentName )

			packages.push( depData )

			if ( depData.dependencies ) {

				const subDeps = await this.#processDependencies( depData.dependencies, level + 1, depName )
				packages.push( ...subDeps )

			}

		}

		return packages

	}

	protected async getPackagesData( mainPackage: PackageInfo ): Promise<PackageInfo[]> {

		const allPackages = [ mainPackage ]

		this.processedPackages.add( `${mainPackage.name}@${mainPackage.version}` )

		if ( mainPackage.dependencies ) {

			const deps = await this.#processDependencies( mainPackage.dependencies, 1, mainPackage.name )
			allPackages.push( ...deps )

		}

		return allPackages

	}

}

