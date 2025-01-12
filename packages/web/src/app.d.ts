/* eslint-disable @typescript-eslint/consistent-type-imports */
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	declare const MAIN_PKG: typeof import( '../../../package.json' )
	declare const PKG: typeof import( '../package.json' )
}

export {}
