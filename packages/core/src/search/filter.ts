import {
	getVersion,
	parseName,
} from './utils'

import type {
	PackageInfo,
	SiziumResponse,
} from './types'

export const FILTER_ALPHABET_TYPE = {
	ZTOA : 'ztoa',
	ATOZ : 'atoz',
} as const
export const FILTER_TYPE = {
	...FILTER_ALPHABET_TYPE,
	SIZE              : 'size',
	LEVEL             : 'level',
	DEPENDENCES_SIZE  : 'dep-size',
	DEPENDENCES_COUNT : 'dep-count',
} as const

export type FilterType = typeof FILTER_TYPE[keyof typeof FILTER_TYPE]
export type FilterAlphabetType = typeof FILTER_ALPHABET_TYPE[keyof typeof FILTER_ALPHABET_TYPE]

export type SiziumFilteredResponse = SiziumResponse & { filtered: PackageInfo[] }
/**
 * A class to filter and sort package information based on various criteria.
 */
export class SiziumFilter {

	/**
	 * Type of filter
	 */
	type = FILTER_TYPE

	#value : SiziumResponse | undefined

	/**
	 * NOTE: This VALUE must be getter and setter for return error if undefined
	 */
	/**
	 * The package information to be filtered and sorted.
	 */
	set value( value: SiziumResponse ) {

		if ( !value ) throw Error( 'this.value must exists' )
		this.#value = value

	}

	get value(): SiziumResponse {

		if ( !this.#value ) throw Error( 'this.value must exists' )
		return this.#value

	}

	constructor(
		value?: SiziumResponse,
	) {

		if ( value ) this.#value = value

	}

	/**
	 * Sorts the packages by their unpacked size in descending order.
	 *
	 * @returns {this} The instance of `SiziumFilter` to allow method chaining.
	 * @throws An error if `this.value` is undefined.
	 */
	sortBySize() {

		this.value.packages.sort( ( a, b ) => b.unpackedSize - a.unpackedSize )
		return this

	}

	/**
	 * Sorts the packages alphabetically by name.
	 *
	 * @param   {FilterAlphabetType} type - The sorting order, either `'atoz'` (A-Z) or `'ztoa'` (Z-A). Default is `'atoz'`.
	 * @returns {this}                    The instance of `SiziumFilter` to allow method chaining.
	 * @throws An error if `this.value` is undefined.
	 */
	sortByName( type: FilterAlphabetType = FILTER_TYPE.ATOZ ) {

		this.value.packages.sort( ( a, b ) =>
			type === FILTER_TYPE.ATOZ ? a.name.localeCompare( b.name ) : b.name.localeCompare( a.name ),
		)
		return this

	}

	/**
	 * Sorts the packages by the total number of dependencies (both dependencies and devDependencies) in descending order.
	 *
	 * @returns {this} The instance of `SiziumFilter` to allow method chaining.
	 * @throws An error if `this.value` is undefined.
	 */
	sortByDependenceSize() {

		this.value.packages.sort( ( a, b ) =>
			( Object.keys( b.dependencies || {} ).length + Object.keys( b.devDependencies || {} ).length )
			- ( Object.keys( a.dependencies || {} ).length + Object.keys( a.devDependencies || {} ).length ),
		)
		return this

	}

	/**
	 * Sorts the packages by the number of direct dependencies in descending order.
	 *
	 * @returns {this} The instance of `SiziumFilter` to allow method chaining.
	 * @throws An error if `this.value` is undefined.
	 */
	sortByDependenceCount() {

		this.value.packages.sort( ( a, b ) =>
			( Object.keys( b.dependencies || {} ).length ) - ( Object.keys( a.dependencies || {} ).length ),
		)

		return this

	}

	/**
	 * Sorts the packages by the level of dependencies in ascending order.
	 *
	 * @returns {this} The instance of `SiziumFilter` to allow method chaining.
	 * @throws An error if `this.value` is undefined.
	 */
	sortByDependenceLevel() {

		this.value.packages.sort( ( a, b ) => a.level - b.level )
		return this

	}

	/**
	 * Sorts the packages based on the given filter type.
	 *
	 * @param   {FilterType}    [type] - The filter type.
	 * @returns {PackageInfo[]}        Resolves to an array of `PackageInfo` sorted by the given filter type.
	 * @throws An error if `this.value` is undefined.
	 */
	sort( type: FilterType = this.type.SIZE ) {

		if ( type === this.type.ZTOA ) return this.sortByName( this.type.ZTOA )
		if ( type === this.type.ATOZ ) return this.sortByName( this.type.ATOZ )
		if ( type === this.type.SIZE ) return this.sortBySize()
		if ( type === this.type.DEPENDENCES_SIZE ) return this.sortByDependenceSize()
		if ( type === this.type.DEPENDENCES_COUNT ) return this.sortByDependenceCount()
		if ( type === this.type.LEVEL ) return this.sortByDependenceLevel()

		return this.sortBySize()

	}

	/**
	 * Filters the packages by the given filter string.
	 * If no filter string is given, the original package list is returned.
	 *
	 * @param   {string}                 filter - The filter string.
	 * @returns {SiziumFilteredResponse}        An object with the original package list and a filtered list of packages
	 *                                          that have a name that matches the given filter string (case-insensitive).
	 * @throws An error if `this.value` is undefined.
	 */
	filter( filter: string ): SiziumFilteredResponse {

		const filtered = this.value.packages.filter( v =>
			v.name.toLowerCase().includes( filter.trim().toLowerCase() ),
		)

		return {
			...this.value,
			filtered : filtered,
		}

	}

	/**
	 * Runs the filter and/or sort on the package list.
	 *
	 * @param   {object}                                  [opts]        - An object with options for the filter and/or sort.
	 * @param   {string}                                  [opts.filter] - A string to filter the packages by name.
	 * @param   {FilterType}                              [opts.sort]   - The type of sorting to apply to the package list.
	 *                                                                  If not provided, the default sorting is by package size.
	 * @returns {SiziumFilteredResponse | SiziumResponse}               An object with the filtered and/or sorted package list.
	 */
	run( opts?: {
		filter? : string
		sort?   : FilterType
	} ): SiziumFilteredResponse | SiziumResponse {

		const value = this.sort( opts?.sort || this.type.SIZE )
		return opts?.filter ? value.filter( opts.filter ) : value.value

	}

	/**
	 * Finds a package in the package list by its name and/or version.
	 * If only the name is given, the first package with that name is returned.
	 * If the version is also given, the package with that name and version is returned.
	 * If no package is found, undefined is returned.
	 *
	 * @param   {object|string}         input - The input to search for. Can be a string with the name of the package or an object with the name and/or version.
	 * @returns {PackageInfo|undefined}       The package that matches the input or undefined if no package is found.
	 * @example
	 * find( 'chalk' ) // finds the latest version of the chalk package
	 * @example
	 * find( 'chalk@^5' ) // finds the latest version of the chalk package that satisfies the version constraint
	 * @example
	 * find( { name: 'chalk', version: '5.0.0' } ) // finds the chalk package with version 5.0.0
	 * @example
	 * find( { name: 'chalk', version: '^4.0.0' } ) // finds the chalk package with a version that satisfies the version constraint
	 */
	find( input: {
		name     : string
		version? : string
	} | string ): PackageInfo | undefined {

		const {
			version, name,
		} = typeof input === 'string' ? ( parseName( input ) || {} ) : input

		if ( !name ) return undefined

		const pkgs = this.value.packages.filter( v => v.name === name )

		if ( !pkgs ) return undefined

		const availableVersions = pkgs.map( v => v.version )
		const versionToFind     = getVersion( version || 'latest', availableVersions )

		return pkgs.find( v => v.version === versionToFind )

	}

}

