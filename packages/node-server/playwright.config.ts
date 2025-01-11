/**
 * Playwright config.
 * @description Playwright config.
 * @see https://playwright.dev/docs/api/class-testconfig
 */
import { defineConfig } from '@playwright/test'

export default defineConfig( {
	webServer : {
		command : 'pnpm dev --port 1312',
		port    : 1312,
	},
	testDir   : 'tests',
	testMatch : /(.+\.)?(test|spec)\.[jt]s/,
} )
