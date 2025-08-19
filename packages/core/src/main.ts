import { getInputType } from './_shared/type'
import {
	SiziumFilter,
	FILTER_TYPE,
	FilterType,
} from './search/filter'
import { SiziumLocal }    from './search/local'
import { SiziumRegistry } from './search/registry'
import { SiziumError }    from './search/super'

import type { SiziumResponse } from './search/types'

export type * from './search/types'

export { SiziumError }

/**
 * Represents the main class for handling package size.
 *
 * @example
 * const size = new Sizium( 'chalk' )
 * const data = await size.get()
 *
 * console.log(data) // all data
 * console.log(data.size) // total size on bytes
 * @example
 * // Directory input
 * const size = new Sizium( './' )
 * const data = await size.get()
 * @example
 * // package.json input
 * const size = new Sizium( './package.json' )
 * const data = await size.get()
 * @example
 * // remote package.json input
 * const size = new Sizium( 'https://raw.githubusercontent.com/chalk/chalk/refs/heads/main/package.json' )
 * const data = await size.get()
 * @example
 * // package.json string input
 * const pkg = {name: 'chalk', ... }
 * const size = new Sizium(JSON.stringify(pkg) )
 * const data = await size.get()
 */
export class Sizium {

	inputType : Awaited<ReturnType<typeof getInputType>> = 'string'
	pkg       : SiziumResponse | undefined
	filter

	constructor( public input: string ) {

		this.filter = new SiziumFilter( this.pkg )

	}

	async #validateInput() {

		this.inputType = await getInputType( this.input )
		if ( this.inputType == 'url' && this.input.startsWith( 'https://www.npmjs.com/package/' ) ) {

			this.inputType = 'string'
			const regex    = /^https:\/\/www\.npmjs\.com\/package\/([^\\/]+)\/?$/
			const match    = this.input.match( regex )
			if ( match ) this.input = match[0]

		}

	}

	/**
	 * Retrieves the package information based on the input.
	 * It uses either the registry or local search mechanism depending on the input type.
	 *
	 * @returns {Promise<SiziumResponse>} A promise that resolves with the package response data.
	 * @see https://sizium.pigeonposse.com/guide/core/api#siziumresponse
	 */
	async get() {

		await this.#validateInput()

		const pkg         = this.inputType === 'string'
			? new SiziumRegistry( this.input )
			: new SiziumLocal( this.input )
		const data        = await pkg.get()
		this.pkg          = data
		this.filter.value = data

		return data

	}

}

/**
 * Retrieves the size information of a given package.
 *
 * @param   {string}                  input - The input string representing a package name, path, or URL.
 * @returns {Promise<SiziumResponse>}       A promise that resolves with the package response data.
 * @example
 * const data = await getPackageSize( 'chalk' )
 *
 * console.log(data) // all data
 * console.log(data.size) // total size on bytes
 */
export const getPackageSize = async ( input: string ) => {

	const size = new Sizium( input )
	const data = await size.get()
	return data

}

export {
	SiziumFilter,
	SiziumLocal,
	SiziumRegistry,
	FILTER_TYPE,
}
export type { FilterType }
