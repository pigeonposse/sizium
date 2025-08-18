#!/usr/bin/env node

import { run }     from './main'
import { updater } from './up'
import pkg         from '../package.json' with { type: 'json' }

const init = async () => {

	await updater( {
		name    : pkg.name,
		version : pkg.version,
	} )
	await run()

}

init()
