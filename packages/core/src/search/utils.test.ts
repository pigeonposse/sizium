import {
	describe,
	it,
	expect,
}  from 'vitest'

import {
	getVersion,
	parseName,
} from './utils'

// ---------------------------
// Tests for getVersion
// ---------------------------
describe( 'getVersion', () => {

	const versions = [
		'1.2.3',
		'1.2.4',
		'1.2.5',
		'2.0.0',
		'v3.1.0',
	]

	it( 'returns the exact version if it is valid and available', () => {

		expect( getVersion( '1.2.4', versions ) ).toBe( '1.2.4' )

	} )
	it( 'removes leading "v" from version string', () => {

		expect( getVersion( 'v3.1.0', versions ) ).toBe( '3.1.0' )

	} )
	it( 'returns the latest version matching "latest"', () => {

		expect( getVersion( 'latest', versions ) ).toBe( '3.1.0' )

	} )
	it( 'returns the latest version matching a valid range', () => {

		expect( getVersion( '1.2.x', versions ) ).toBe( '1.2.5' )
		expect( getVersion( '1.x', versions ) ).toBe( '1.2.5' )

	} )
	it( 'returns undefined when no versions match the range', () => {

		expect( getVersion( '3.x', [ '1.0.0', '2.0.0' ] ) ).toBeUndefined()

	} )
	it( 'returns undefined for an invalid version range', () => {

		expect( getVersion( 'abc', versions ) ).toBeUndefined()

	} )
	it( 'returns undefined if no available versions are provided', () => {

		expect( getVersion( '3.x', [] ) ).toBeUndefined()

	} )
	it( 'returns undefined if no available versions are provided', () => {

		expect( getVersion( '1.0.0', [] ) ).toBe( '1.0.0' )

	} )
	it( 'returns undefined if no available versions are provided', () => {

		expect( getVersion( '^1.0.0', [] ) ).toBeUndefined()

	} )

} )

// ---------------------------
// Tests for parseName
// ---------------------------
describe( 'parseName', () => {

	it( 'parses an unscoped package with version and subpath', () => {

		expect( parseName( 'mypkg@1.0.0/lib/index.js' ) ).toEqual( {
			name    : 'mypkg',
			version : '1.0.0',
			path    : '/lib/index.js',
		} )

	} )

	it( 'parses an unscoped package with version only', () => {

		expect( parseName( 'mypkg@1.0.0' ) ).toEqual( {
			name    : 'mypkg',
			version : '1.0.0',
			path    : '',
		} )

	} )

	it( 'parses an unscoped package without version or path', () => {

		expect( parseName( 'mypkg' ) ).toEqual( {
			name    : 'mypkg',
			version : 'latest',
			path    : '',
		} )

	} )

	it( 'parses a scoped package with version and subpath', () => {

		expect( parseName( '@myorg/mypkg@2.1.0/lib/index.js' ) ).toEqual( {
			name    : '@myorg/mypkg',
			version : '2.1.0',
			path    : '/lib/index.js',
		} )

	} )

	it( 'parses a scoped package with version range', () => {

		expect( parseName( '@myorg/mypkg@^2.1.0' ) ).toEqual( {
			name    : '@myorg/mypkg',
			version : '^2.1.0',
			path    : '',
		} )

	} )

	it( 'parses a scoped package without version', () => {

		expect( parseName( '@myorg/mypkg' ) ).toEqual( {
			name    : '@myorg/mypkg',
			version : 'latest',
			path    : '',
		} )

	} )

	it( 'normalizes input to lowercase', () => {

		expect( parseName( 'MyPkg@1.0.0' ) ).toEqual( {
			name    : 'mypkg',
			version : '1.0.0',
			path    : '',
		} )

	} )

	it( 'returns undefined for invalid input', () => {

		expect( parseName( '' ) ).toBeUndefined()
		expect( parseName( '@' ) ).toBeUndefined()
		expect( parseName( '@@@' ) ).toBeUndefined()

	} )

} )
