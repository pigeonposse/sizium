import { SiziumRegistry } from '@sizium/core'
import {
	error,
	json,
}         from '@sveltejs/kit'
import { get } from 'svelte/store'

import type { RequestHandler } from './$types'

import { packageCache } from '$lib/store'

export const GET: RequestHandler = async ( { url } ) => {

	const name = url.searchParams.get( 'name' )

	if ( !name ) throw error( 400, 'Package name is required' )

	try {

		const cache = get( packageCache )

		if ( cache[name] ) return json( cache[name] )

		const pkg         = new SiziumRegistry( name )
		const packageInfo = await pkg.get( )

		packageCache.update( cache => {

			cache[name] = packageInfo
			return cache

		} )

		return json( packageInfo )

	}
	catch ( _e ) {

		throw error( 500, 'Failed to fetch package information' )

	}

}

