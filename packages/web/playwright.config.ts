import { defineConfig } from '@playwright/test'

export default defineConfig( {
	webServer : {
		command : 'pnpm preview --port 4173',
		port    : 4173,
	},
	testDir : 'tests',
} )
