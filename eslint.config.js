/**
 * ESLint config.
 *
 * @description ESLint config for JavaScript and TypeScript projects.
 * @see https://eslint.org/docs
 * @see https://typescript-eslint.io/
 */
import { setConfig } from '@dovenv/theme-pigeonposse/eslint'

export default setConfig( {
	general    : 'ts',
	gitignore  : true,
	json       : true,
	jsdoc      : true,
	md         : false,
	package    : true,
	toml       : true,
	playwright : true,
	ignore     : [
		'./docs/**/*.md',
		'**/docs/data/**/*.md',
		'**/CHANGELOG.md',
		'**/examples/**/partials/*',
		'**/.dovenv/**/partials/*',
		'**/.dovenv/**/templates/*',
		'**/*.{svelte,html}',
		'**/api-client/data/**/*',
	],
} )

