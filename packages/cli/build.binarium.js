import { defineConfig } from 'binarium'

import core from '../../.dovenv/const.js'

export default defineConfig( {
	input       : './src/binarium.ts',
	name        : core.corePkg.name,
	nodeOptions : { esbuild : {
		noDefaultPlugins : true,
		treeShaking      : false,
	} },
	// nodeOptions : { esbuild: { plugins: false } },
} )
