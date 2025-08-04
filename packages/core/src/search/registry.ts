import { PackageSuper } from './super'
import { parseName }    from './utils'

import type { SiziumResponse } from './types'

/**
 * Represents the class to get the `true` package size from the npm registry URL.
 *
 * @example
 * const size = new SiziumRegistry( 'chalk' )
 * const data = await size.get()
 *
 * console.log(data) // all data
 * console.log(data.size) // total size on bytes
 */
export class SiziumRegistry extends PackageSuper {

	#parseName( input: string ) {

		try {

			const data = parseName( input )

			if ( !data ) throw new this.Error(
				this.ERROR_ID.INVALID_PKG_NAME,
				{ msg: `invalid package name: ${input}` },
			)

			return data

		}
		catch ( e ) {

			if ( e instanceof this.Error ) throw e
			throw new this.Error(
				this.ERROR_ID.GETTING_PKG_NAME,
				{
					msg : `Unexpected error getting name`,
					e,
				},
			)

		}

	}

	async get(): Promise<SiziumResponse> {

		const data        = this.#parseName( this.input )
		const mainPackage = await this.getRegistryData( {
			name    : data.name,
			version : data.version,
			level   : 0,
		} )
		const allPackages = await this.getPackagesData( mainPackage )

		return this.getMainPkgData( allPackages )

	}

}

