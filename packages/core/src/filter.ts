import type {
	PackageInfo,
	SiziumResponse,
} from './search/types'

/**
 * A class to filter and sort package information based on various criteria.
 */
export class SiziumFilter {

	constructor(
		public pkg?: SiziumResponse,
	) {}

	/**
	 * Sorts the packages by their unpacked size in descending order.
	 * @returns {Promise<PackageInfo[]>} A promise that resolves to an array of `PackageInfo` sorted by unpacked size.
	 * @throws An error if `this.pkg` is undefined.
	 */
	async bySize(): Promise<PackageInfo[]> {

		if ( !this.pkg ) throw Error( 'this.pkg must exists' )
		return this.pkg.packages.sort( ( a, b ) => b.unpackedSize - a.unpackedSize )

	}

	/**
	 * Sorts the packages alphabetically by name.
	 * @param {'atoz' | 'ztoa'}type - The sorting order, either `'atoz'` (A-Z) or `'ztoa'` (Z-A). Default is `'atoz'`.
	 * @returns {Promise<PackageInfo[]>} A promise that resolves to an array of `PackageInfo` sorted by name.
	 * @throws An error if `this.pkg` is undefined.
	 */
	async byName( type: 'atoz' | 'ztoa' = 'atoz' ): Promise<PackageInfo[]> {

		if ( !this.pkg ) throw Error( 'this.pkg must exists' )
		return this.pkg.packages.sort( ( a, b ) =>
			type === 'atoz' ? a.name.localeCompare( b.name ) : b.name.localeCompare( a.name ),
		)

	}

	/**
	 * Sorts the packages by the total number of dependencies (both dependencies and devDependencies) in descending order.
	 * @returns {Promise<PackageInfo[]>} A promise that resolves to an array of `PackageInfo` sorted by total dependency size.
	 * @throws An error if `this.pkg` is undefined.
	 */
	async byDependenceSize(): Promise<PackageInfo[]> {

		if ( !this.pkg ) throw Error( 'this.pkg must exists' )
		return this.pkg.packages.sort( ( a, b ) =>
			( Object.keys( b.dependencies || {} ).length + Object.keys( b.devDependencies || {} ).length )
			- ( Object.keys( a.dependencies || {} ).length + Object.keys( a.devDependencies || {} ).length ),
		)

	}

	/**
	 * Sorts the packages by the number of direct dependencies in descending order.
	 * @returns {Promise<PackageInfo[]>} A promise that resolves to an array of `PackageInfo` sorted by the number of dependencies.
	 * @throws An error if `this.pkg` is undefined.
	 */
	async byDependenceCount(): Promise<PackageInfo[]> {

		if ( !this.pkg ) throw Error( 'this.pkg must exists' )
		return this.pkg.packages.sort( ( a, b ) =>
			( Object.keys( b.dependencies || {} ).length ) - ( Object.keys( a.dependencies || {} ).length ),
		)

	}

	/**
	 * Sorts the packages by their dependency level in ascending order.
	 * The dependency level indicates how "deep" the package is in the dependency tree.
	 * @returns {Promise<PackageInfo[]>} A promise that resolves to an array of `PackageInfo` sorted by dependency level.
	 * @throws An error if `this.pkg` is undefined.
	 */
	async byDependenceLevel(): Promise<PackageInfo[]> {

		if ( !this.pkg ) throw Error( 'this.pkg must exists' )
		return this.pkg.packages.sort( ( a, b ) => a.level - b.level )

	}

}

