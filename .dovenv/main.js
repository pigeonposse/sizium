import { defineConfig }             from '@dovenv/core'
import { pigeonposseMonorepoTheme } from '@dovenv/theme-pigeonposse'

import core from './const.js'

const theme = pigeonposseMonorepoTheme( {
	core,
	// lint : { staged: { '**/*.{js,ts,jsx,tsx,json}': 'pnpm --silent . lint eslint --fix --silent' } },
	repo : { commit : { scopes : [
		{
			value : 'packages',
			desc  : '📦 All or some packages',
		},
		{
			value : 'core',
			desc  : '☀️ Core package',
		},
		{
			value : 'cli',
			desc  : '🔢 cli package(s)',
		},
		{
			value : 'api',
			desc  : '🌐 API package(s)',
		},
		{
			value : 'env',
			desc  : 'Only dev environment',
		},
		{
			value : 'all',
			desc  : 'env, packages etc',
		},
	] } },
} )

// Documetation in: "packages/docs/"
// remove for not make confusions
delete theme.custom.predocs
// delete theme.custom.docs

export default defineConfig(
	theme,
)
