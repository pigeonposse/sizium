import { defineConfig }             from '@dovenv/core'
import { pigeonposseMonorepoTheme } from '@dovenv/theme-pigeonposse'

import core from './const.js'

const theme = pigeonposseMonorepoTheme( {
	core,
	lint : { staged: { '**/*.{js,ts,jsx,tsx,json}': 'pnpm --silent . lint eslint --fix --silent' } },
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
delete theme.custom.docs
delete theme.custom.predocs

export default defineConfig(
	theme,
)
