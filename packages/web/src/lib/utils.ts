import { SiziumRegistry } from '@sizium/core/registry'
import { get }            from 'svelte/store'

import type { SiziumResponse } from '@sizium/core'

import { browser }      from '$app/environment'
import { packageCache } from '$lib/store'

export const getPkgData = async ( name: string ): Promise<SiziumResponse> => {

	if ( !browser ) throw Error( 'Enviroment is not a browser' )
	const pkg = new SiziumRegistry( name )
	try {

		const cache = get( packageCache )

		if ( cache[name] ) return cache[name]

		const data = await pkg.get( )

		packageCache.update( cache => {

			cache[name] = data
			return cache

		} )

		return data

	}
	catch ( e ) {

		if ( e instanceof pkg.Error ) throw Error( `[${e.message}] ${e.data?.msg}` )
		throw e

	}

}

export const roundToTwoDecimals = ( num: number ) => {

	return Math.round( num * 100 ) / 100

}

export const decodeQueryParam = ( p:string ) => {

	return decodeURIComponent( p.replace( /\+/g, ' ' ) )

}
