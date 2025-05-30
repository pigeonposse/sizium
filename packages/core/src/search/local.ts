import {
	readFile,
	stat,
} from 'node:fs/promises'
import {
	join,
	resolve,
} from 'node:path'

import { PackageSuper } from './super'
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

				let filePath = resolve( this.input )
				const stats  = await stat( filePath )

				if ( stats.isDirectory() ) filePath = join( filePath, 'package.json' )

				const content = await readFile( filePath, 'utf-8' )
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

	async get(): Promise<SiziumResponse> {

		const packageData = await this.#getPackage()
		const mainPackage = await this.getPkgData( packageData, 0 )
		const allPackages = await this.getPackagesData( mainPackage )

		return this.getMainPkgData( allPackages )

	}

}
