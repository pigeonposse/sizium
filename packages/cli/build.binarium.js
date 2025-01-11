import { defineConfig } from 'binarium'
import { join }         from 'node:path'

export default defineConfig( {
	input  : 'dist/main.mjs',
	output : join( process.cwd(), '../../build' ),
	name   : 'sizium',
	// nodeOptions : { esbuild: { plugins: false } },
} )
