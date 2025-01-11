import { PackageSuper } from './super'

import type { SiziumResponse } from './types'

/**
 * Represents the class to get the `true` package size from the npm registry URL.
 * @example
 * const size = new SiziumRegistry( 'chalk' )
 * const data = await size.get()
 *
 * console.log(data) // all data
 * console.log(data.size) // total size on bytes
 */
export class SiziumRegistry extends PackageSuper {

	constructor(
		public name: string,
	) {

		super()

	}

	#parseName( input: string ) {

		const RE_SCOPED = /^(@[^\\/]+\/[^@\\/]+)(?:@([^\\/]+))?(\/.*)?$/
		// Parsed a non-scoped package name into name, version, path
		const RE_NON_SCOPED = /^([^@\\/]+)(?:@([^\\/]+))?(\/.*)?$/
		input               = input.toLowerCase()
		const m             = RE_SCOPED.exec( input ) || RE_NON_SCOPED.exec( input )

		if ( !m )
			throw new Error( `[parse-package-name] invalid package name: ${input}` )

		return {
			name    : m[1] || '',
			version : m[2] || 'latest',
			path    : m[3] || '',
		}

	}

	async get(): Promise<SiziumResponse> {

		const data        = this.#parseName( this.name )
		const mainPackage = await this.getRegistryData( data.name, data.version, 0 )
		const allPackages = await this.getPackagesData( mainPackage )
		const totalSize   = allPackages.reduce( ( sum, pkg ) => {

			const size = pkg.unpackedSize ?? 0
			return sum + size

		}, 0 )

		return {
			id         : this.name,
			packageNum : allPackages.length,
			size       : totalSize,
			packages   : allPackages,
		}

	}

}

