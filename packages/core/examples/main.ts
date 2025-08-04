import {
	SiziumLocal,
	SiziumRegistry,
} from '../src/main'

console.time( 'Execution Time' )

const args        = {
	registry : '--registry',
	local    : '--local',
} as const
const packageName = process.argv.find( a => a.startsWith( '--pkg=' ) )?.split( '=' )[1]

if ( process.argv.includes( args.registry ) ) {

	const pkg  = new SiziumRegistry( packageName || 'binarium@latest' )
	const data = await pkg.get()

	console.log( JSON.stringify( data, null, 2 ) )
	console.log()
	console.log( data.size + ' bytes' )
	console.log( data.size / 1000000 + ' mb' )
	console.log()

}
else if ( process.argv.includes( args.local ) ) {

	const pkg  = new SiziumLocal( './package.json' )
	const data = await pkg.get()

	console.dir( data, { depth: Infinity } )
	console.log()
	console.log( data.size + ' bytes' )
	console.log( data.size / 1000000 + ' mb' )
	console.log()

	console.timeEnd( 'Execution Time' )

}
else console.log( `You need to add one of this flags: ${Object.values( args ).join( ', ' )}` )
