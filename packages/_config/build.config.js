
/** @type {import('unbuild').BuildConfig} */
export const config = {
	sourcemap   : false,
	declaration : true,
	rollup      : {
		emitCJS            : false,
		inlineDependencies : true,
		esbuild            : {
			minify : false,
			target : 'node20',
		},
	},
	failOnWarn : true,
}
