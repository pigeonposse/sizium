import {
	Sizium,
	SiziumError,
} from '@sizium/core'

import {
	bold,
	dim,
	underline,
	red,
} from './_shared/color'
import {
	existsFlag,
	exit,
	getFlagValue,
	noFlags,
} from './_shared/process'
import {
	description,
	documentationURL,
	GLOBBAL_OPTIONS,
	name,
	OPTIONS,
	RES_TYPE,
	version,
} from './const'
import { printHelp } from './help'
import { updater }   from './up'

/**
 * Executes the CLI command based on the provided flags and options.
 *
 * This function processes the command-line arguments and executes the appropriate
 * action based on the specified flags. It supports options for displaying help,
 * version information, input processing, and execution time measurement.
 *
 *
 * The function uses the `Sizium` class to retrieve package size information
 * based on the input provided. It outputs the result in different formats
 * depending on the specified resolution type.
 */

export const run = async () => {

	const res = ( getFlagValue( OPTIONS.RES.key ) || getFlagValue( OPTIONS.RES.alias, true ) ) as typeof RES_TYPE[keyof typeof RES_TYPE] | undefined

	const FLAGS = {
		HELP    : existsFlag( GLOBBAL_OPTIONS.HELP.key ) || existsFlag( GLOBBAL_OPTIONS.HELP.alias, true ),
		VERSION : existsFlag( GLOBBAL_OPTIONS.VERSION.key ) || existsFlag( GLOBBAL_OPTIONS.VERSION.alias, true ),
		INPUT   : getFlagValue( OPTIONS.INPUT.key ) || getFlagValue( OPTIONS.INPUT.alias, true ),
		TIME    : existsFlag( GLOBBAL_OPTIONS.TIME.key ),
		RES     : res && Object.values( RES_TYPE ).includes( res ) ? res : undefined,
		NONE    : noFlags(),
	}

	if ( FLAGS.TIME ) console.time( 'Execution Time' )

	if ( FLAGS.HELP ) printHelp( name, description, documentationURL, version )
	else if ( FLAGS.VERSION ) console.log( version )
	else if ( FLAGS.INPUT ) {

		try {

			const size = new Sizium( FLAGS.INPUT )
			const data = await size.get()

			if ( FLAGS.RES === RES_TYPE.SIZE ) console.log( `${data.sizeKB}kb | ${data.sizeMB}mb` )
			else if ( FLAGS.RES === RES_TYPE.INFO || FLAGS.RES === RES_TYPE.MIN_INFO ) {

				console.log( underline( bold( data.id ) ) + '\n' )
				const pkgInfo = [
					[ 'Size KB', parseFloat( data.sizeKB.toFixed( 2 ) ) ],
					[ 'Size MB', parseFloat( data.sizeMB.toFixed( 2 ) ) ],
					[ 'Packages installed', data.packageNum ],
				]
				console.log( pkgInfo.map( ( [ name, value ] ) => `${name}: ${dim( String( value ) )}` ).join( '\n' ) + '\n' )

				if ( FLAGS.RES === RES_TYPE.MIN_INFO ) return

				const info: { [name: string]: {
					kb     : number
					mb     : number
					level? : number
				} } = {}
				for ( let i = 0; i < data.packages.length; i++ ) {

					const pkg      = data.packages[i]
					info[pkg.name] = {
						kb    : parseFloat( pkg.unpackedSizeKB.toFixed( 2 ) ),
						mb    : parseFloat( pkg.unpackedSizeMB.toFixed( 2 ) ),
						level : pkg.level,
					}

				}

				if ( Object.keys( info ).length ) {

					const sorted = Object.entries( info )
						.sort( ( a, b ) => b[1].kb - a[1].kb )
						.reduce( ( acc, [ name, data ] ) => {

							acc[name] = data
							return acc

						}, {} as typeof info )

					console.table( sorted )

				}

				console.log( `\nMore details: `, dim( `https://sizium.pigeonposse.com/?s=${data.id}` ) )

			}
			else if ( FLAGS.RES === RES_TYPE.JSON ) console.log( JSON.stringify( data ) )
			else console.dir( data, { depth: Infinity } )

		}
		catch ( e ) {

			console.error( red(
				e instanceof SiziumError
					? e.data ? `${e.data.msg} (Error id: ${e.message})` : `Unexpected error: ${e.message}`
					: e instanceof Error ? e.message : 'Unexpected error',
			) )

			exit( 1 )

		}

	}
	else printHelp( name, description, documentationURL, version )

	if ( FLAGS.TIME ) console.timeEnd( 'Execution Time' )

}

export { updater }
