/**
 * ESLint config.
 *
 * @description ESLint config for JavaScript and TypeScript projects.
 * @see https://eslint.org/docs
 * @see https://typescript-eslint.io/
 */
import { joinPath } from '@dovenv/core/utils'
import {
	setConfig,
	setSvelteConfig,
} from '@dovenv/theme-pigeonposse/eslint'

import svelteConfig from './svelte.config.js'
import consts       from '../../.dovenv/const.js'

const svelteEslintConfig =  await setSvelteConfig( {
	ts : true,
	svelteConfig,
} )
const config             = [
	...setConfig( {
		general    : 'ts',
		gitignore  : joinPath( consts.workspaceDir, '.gitignore' ),
		json       : true,
		jsdoc      : true,
		md         : false,
		package    : true,
		toml       : false,
		playwright : true,
	} ),
	...svelteEslintConfig,
]

export default config
