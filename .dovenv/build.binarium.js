import { defineConfig } from 'binarium'
import { join }         from 'node:path'

import core from './const.js'

export default defineConfig( {
	input  : join( core.packagesDir, 'cli/dist/main.mjs' ),
	output : join( process.cwd(), 'build' ),
	name   : core.corePkg.name,
	// nodeOptions : { esbuild: { plugins: false } },
} )
