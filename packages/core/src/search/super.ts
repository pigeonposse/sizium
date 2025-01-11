import semver from 'semver'

import type {
	PackageJSON,
	PackageInfo,
} from './types'

export class PackageSuper {

	private processedPackages : Set<string> = new Set()

	protected getPkgData( data: PackageJSON, level = 0, unpackedSize?: number, installedBy?: string | string[] ): PackageInfo {

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
				homepage   : data.homepage,
				repository : typeof data.repository === 'string'
					? data.repository
					: data.repository?.url,
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

	protected async getRegistryData( packageName: string, version: string, level = 0, installedBy?: string ): Promise<PackageInfo> {

		try {

			const response = await fetch( `https://registry.npmjs.org/${packageName}` )
			const res      = await response.json()

			// Use semver to find the correct version
			let selectedVersion: string
			if ( semver.valid( version ) ) selectedVersion = version
			else {

				const availableVersions = Object.keys( res.versions )
				selectedVersion         = semver.maxSatisfying( availableVersions, version ) || res['dist-tags'].latest

			}

			const data = res.versions[selectedVersion]

			if ( !data ) throw new Error( `Version ${version} not found for package ${packageName}` )

			const size       = data.dist?.unpackedSize
			const secureSize = typeof size === 'string' ? Number( size ) : typeof size === 'number' ? size : undefined

			return this.getPkgData( data, level, secureSize, installedBy )

		}
		catch ( e ) {

			throw new Error( `Error getting [${packageName}] data. ${e instanceof Error ? e.message : e}` )

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

