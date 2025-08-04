import adapter from '@sveltejs/adapter-cloudflare'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess : {},

	kit : {
		adapter : adapter(),
		alias   : {
			$utils      : './src/lib/utils',
			$icons      : './src/lib/icon',
			$components : './src/lib/components',
			$ui         : './src/lib/ui',
			$appstate   : './src/lib/state/index.svelte.ts',
		},
	},
}

export default config
