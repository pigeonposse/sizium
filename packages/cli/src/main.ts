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

const run = async () => {

	const res = ( getFlagValue( OPTIONS.RES.key ) || getFlagValue( OPTIONS.RES.alias, true ) ) as typeof RES_TYPE[keyof typeof RES_TYPE] | undefined

	const FLAGS = {
		HELP    : existsFlag( GLOBBAL_OPTIONS.HELP.key ) || existsFlag( GLOBBAL_OPTIONS.HELP.alias, true ),
		VERSION : existsFlag( GLOBBAL_OPTIONS.VERSION.key ) || existsFlag( GLOBBAL_OPTIONS.VERSION.alias, true ),
		INPUT   : getFlagValue( OPTIONS.INPUT.key ) || getFlagValue( OPTIONS.INPUT.alias, true ),
		RES     : res && Object.values( RES_TYPE ).includes( res ) ? res : undefined,
		NONE    : noFlags(),
	}

	if ( FLAGS.HELP ) printHelp( name, description, documentationURL, version )
	else if ( FLAGS.VERSION ) console.log( version )
	else if ( FLAGS.INPUT ) {

		const size = new Sizium( FLAGS.INPUT )
		const data = await size.get()

		if ( FLAGS.RES === RES_TYPE.SIZE ) console.log( `${data.size} bytes | ${data.size / 1000000} megabytes` )
		else if ( FLAGS.RES === RES_TYPE.INFO ) console.log( `Name: ${data.id}\nPackages: ${data.packageNum}\nSize: ${data.size} bytes | ${data.size / 1000000} megabytes` )
		else if ( FLAGS.RES === RES_TYPE.JSON ) console.log( JSON.stringify( data ) )
		else console.dir( data, { depth: Infinity } )

	}
	else printHelp( name, description, documentationURL, version )

}
run()
