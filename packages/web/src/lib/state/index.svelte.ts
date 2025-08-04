import { persistBrowserSession } from '@macfja/svelte-persistent-store'
import {
	FILTER_TYPE,
	SiziumFilter,
} from '@sizium/core'
import { SiziumRegistry } from '@sizium/core/registry'
import { writable }       from 'svelte/store'
import { get }            from 'svelte/store'

import type {
	FilterType,
	SiziumResponse,
} from '@sizium/core'

import { browser } from '$app/environment'
import {
	pushState,
	replaceState,
} from '$app/navigation'
import { page }             from '$app/state'
import { decodeQueryParam } from '$utils'

export type PkgData = SiziumResponse & {
	isFiltered?                 : boolean
	filtered?                   : PkgInfo[]
	filter?                     : string
	hasLifeCycleInstallScripts? : boolean
}
export type PkgInfo = SiziumResponse['packages'][0]
type SortType = FilterType

const sortText = {
	[FILTER_TYPE.ATOZ]              : 'A-Z',
	[FILTER_TYPE.ZTOA]              : 'Z-A',
	[FILTER_TYPE.SIZE]              : 'Package Size',
	[FILTER_TYPE.LEVEL]             : 'Dependency Level',
	[FILTER_TYPE.DEPENDENCES_SIZE]  : 'Dependency Size',
	[FILTER_TYPE.DEPENDENCES_COUNT] : 'Dependency Count',
} satisfies Record<SortType, string>

const packageCache = persistBrowserSession( writable<Record<string, SiziumResponse>>( {} ), 'packageCache' )
const sortDefault  = FILTER_TYPE.LEVEL

class PackageState {

	ID = {
		search   : 's',
		filter   : 'filter',
		sort     : 'sort',
		sortType : FILTER_TYPE,
		sortText,
		sortDefault,
	}

	/**
	 * Search query
	 */
	query   : string  = $state( '' )
	#data   : PkgData | undefined = $state( undefined )
	loading : boolean = $state( false )
	error   : string | undefined = $state( undefined )
	filter  : string = $state( '' )
	sortBy  : SortType = $state( this.ID.sortDefault )
	#isInit = $state( false )

	#options = $derived.by( () => {

		const filter = !this.filter || this.filter.trim() === '' ? undefined : this.filter
		const sort   = Object.values( this.ID.sortType ).find( s => s === this.sortBy )

		if ( this.#isInit ) this.#replaceURL( [
			{
				key   : this.ID.filter,
				value : filter,
			},
			{
				key   : this.ID.sort,
				value : sort,
			},
		] )

		return {
			filter : filter,
			sort   : sort,
		}

	} )

	data: ( PkgData & { main: PkgInfo } ) | undefined = $derived.by( () => {

		const opts = this.#options
		if ( !this.#data ) return undefined
		const main = this.#data.packages.find( pkg => pkg.name === this.query )

		if ( !main ) return undefined
		const filter                     = new SiziumFilter( this.#data )
		const filtered                   = filter.run( {
			sort   : opts.sort || this.ID.sortDefault,
			filter : opts.filter,
		} )
		const hasLifeCycleInstallScripts = filtered.packages.some( pkg => this.hasInstallScript( pkg ) )
		if ( 'filtered' in filtered ) return {
			...filtered,
			main       : main,
			isFiltered : true,
			filter     : opts.filter,
			hasLifeCycleInstallScripts,
		}
		return {
			main,
			...filtered,
			hasLifeCycleInstallScripts,
		}

	} )

	#replaceURL( opts?:{
		key   : string
		value : string | undefined
	}[] ) {

		let changed = false
		for ( const {
			key, value,
		} of opts || [] ) {

			if ( value === undefined || value.trim() === '' ) {

				if ( !page.url.searchParams.has( key ) ) continue

				page.url.searchParams.delete( key )
				changed = true

			}
			else {

				page.url.searchParams.set( key, value )
				changed = true

			}

		}
		if ( page.url.hash ) page.url.href = page.url.href.replace( page.url.hash, '' )
		if ( changed ) replaceState( page.url, '' )

	}

	#updateURL( packageName: string ) {

		if ( !browser ) return

		page.url.searchParams.set( this.ID.search, encodeURIComponent( packageName ) )
		if ( page.url.hash ) page.url.href = page.url.href.replace( page.url.hash, '' )
		pushState( page.url, '' )

	}

	async #getPkgData( name: string ): Promise<SiziumResponse> {

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

	find( name: {
		name     : string
		version? : string
	} | string ) {

		const app = new SiziumFilter( this.#data )

		return app.find( name )

	}

	async search( update?: boolean ) {

		if ( !this.query || this.query.trim() === '' ) return

		this.loading = true
		this.error   = undefined
		this.#data   = undefined

		try {

			if ( update ) this.#updateURL( this.query )
			if ( !this.query ) return
			const data = await this.#getPkgData( this.query )

			this.#data = data

		}
		catch ( e ) {

			if ( e instanceof Error ) this.error = e.message
			else this.error = `Unexpected error ${e}`

		}
		finally {

			this.loading = false

		}

	}

	hasInstallScript( pkg: PkgInfo ) {

		return pkg.lifeCycleScripts && Object.keys( pkg.lifeCycleScripts ).includes( 'install' )

	}

	async init() {

		const value = page.url.searchParams.get( this.ID.search )
		if ( value ) {

			this.query = decodeQueryParam( value )
			await this.search( )

		}
		const filter = page.url.searchParams.get( this.ID.filter )
		if ( filter ) this.filter = decodeQueryParam( filter )
		const sort  = decodeQueryParam( page.url.searchParams.get( this.ID.sort ) || '' )
		const sortV =  Object.values( this.ID.sortType ).find( s => s === sort )
		if ( sortV ) this.sortBy = sortV
		this.#isInit = true

	}

}

class UserState {

	package
	constructor() {

		this.package = new PackageState()

	}

}

export const userState = new UserState()

