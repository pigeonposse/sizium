import { sveltekit }  from '@sveltejs/kit/vite'
import {
	defineConfig,
	type PluginOption,
} from 'vite'

import pkg     from './package.json'
import mainPkg from '../../package.json'

export default defineConfig( {
	plugins : [ sveltekit() as PluginOption ],
	define  : {
		PKG      : pkg,
		MAIN_PKG : mainPkg,
	},
} )
