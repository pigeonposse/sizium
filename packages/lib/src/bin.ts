#!/usr/bin/env node

import {
	run,
	updater,
}  from '@sizium/cli'

import pkg from '../package.json' with { type: 'json' }

const init = async () => {

	await updater( {
		name    : pkg.name,
		version : '0.2.1', //pkg.version,
	} )
	await run()

}

init( )
