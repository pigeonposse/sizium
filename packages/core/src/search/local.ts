
import { PackageSuper } from './super'
import {
	isDirectory,
	joinPath,
	readFile,
	resolvePath,
} from '../_shared/sys'
import {
	isJsonString,
	isUrl,
} from '../_shared/type'

import type {
	PackageJSON,
	SiziumResponse,
} from './types'

/**
 * Represents the class to get the `true` package size from **local** enviroment.
 *
 * @example
 * // Directory input
 * const size = new SiziumLocal( './' )
 * const data = await size.get()
 * @example
 * // package.json input
 * const size = new SiziumLocal( './package.json' )
 * const data = await size.get()
 * @example
 * // remote package.json input
 * const size = new SiziumLocal( 'https://raw.githubusercontent.com/chalk/chalk/refs/heads/main/package.json' )
 * const data = await size.get()
 * @example
 * // package.json string input
 * const pkg = {name: 'chalk', ... }
 * const size = new SiziumLocal(JSON.stringify(pkg) )
 * const data = await size.get()
 */
export class SiziumLocal extends PackageSuper {

	async #getPackage(): Promise<PackageJSON> {

		try {

			if ( isUrl( this.input ) ) {

				const response = await fetch( this.input )
				if ( !response.ok )
					throw new Error( `Failed to fetch package file from URL: ${response.statusText}` )

				const content = await response.text()
				return JSON.parse( content )

			}
			else if ( isJsonString( this.input ) ) {

				return JSON.parse( this.input )

			}
			else {

				let filePath = await resolvePath( this.input )

				if ( await isDirectory( filePath ) ) filePath = await joinPath( filePath, 'package.json' )

				const content = await readFile( filePath )
				return JSON.parse( content )

			}

		}
		catch ( e ) {

			throw new this.Error(
				this.ERROR_ID.GETTING_LOCAL_DATA, {
					msg : `Error processing package file: ${e instanceof Error ? e.message : ''}`,
					e,
				} )

		}

	}

	/**
	 * Retrieves the package size information from a local environment.
	 * It processes the package data from the input, resolving dependencies
	 * and aggregating package data to return a comprehensive size response.
	 *
	 * @returns {Promise<SiziumResponse>} A promise that resolves with the package response data,
	 *                                    including size and dependency information.
	 */

	async get(): Promise<SiziumResponse> {

		const packageData = await this.#getPackage()
		const mainPackage = await this.getPkgData( {
			data  : packageData,
			level : 0,
		} )
		const allPackages = await this.getPackagesData( mainPackage )

		return this.getMainPkgData( allPackages )

	}

}

