import { Sizium } from '@sizium/core'

import {
	existsFlag,
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

		const size = new Sizium( FLAGS.INPUT )
		const data = await size.get()

		if ( FLAGS.RES === RES_TYPE.SIZE ) console.log( `${data.sizeKB}kb | ${data.sizeMB}mb` )
		else if ( FLAGS.RES === RES_TYPE.INFO ) console.log( `Name: ${data.id}\nPackages: ${data.packageNum}\nSize: ${data.sizeKB}kb | ${data.sizeMB}mb` )
		else if ( FLAGS.RES === RES_TYPE.JSON ) console.log( JSON.stringify( data ) )
		else console.dir( data, { depth: Infinity } )

	}
	else printHelp( name, description, documentationURL, version )

	if ( FLAGS.TIME ) console.timeEnd( 'Execution Time' )

}
