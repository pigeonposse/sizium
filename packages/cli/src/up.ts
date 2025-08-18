import { Updater } from '@clippium/updater'

import {
	bold,
	dim,
	green,
	italic,
	cyan,
} from './_shared/color'

export const updater = async ( {
	name, version,
}:{
	name    : string
	version : string
} ) => {

	const _updater = new Updater( {
		version,
		name,
	} )

	const data = await _updater.get()
	// console.log( {
	// 	data,
	// 	name,
	// 	version,
	// } )
	if ( !data ) return

	console.log( `
        
║ 📦 ${bold( 'Update available' )} ${dim( data.currentVersion )} → ${green( data.latestVersion )} ${italic( `(${data.type})` )}
║ Run ${cyan( data.packageManager + ' i ' + name )} to update
		
` )

}
