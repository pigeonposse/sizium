
import {
	valid as versionValid,
	maxSatisfying as versionMmxSatisfying,
	rcompare as versionRCompare,
	clean as versionClean,
} from 'semver'

/**
 * Selects the most suitable version from the given list of available versions
 * based on the given version.
 *
 * If the given version is valid and present in the list of available versions,
 * it is returned. Otherwise, the most recent version that satisfies the given
 * version is returned. If no version satisfies the given version, undefined is
 * returned.
 *
 * The returned version string will have the leading 'v' removed if present.
 *
 * @param   {string}             version           - The version to select from the list of available versions.
 * @param   {string[]}           availableVersions - The list of available versions.
 * @returns {string | undefined}                   The selected version, or undefined if no version satisfies the given version.
 * @example
 * getVersion('1.2.3', ['1.2.3', '1.2.4', '1.2.5']) // '1.2.3'
 * @example
 * getVersion('1.2.x', ['1.2.3', '1.2.4', '1.2.5']) // '1.2.5'
 * @example
 * getVersion('1.x', ['1.2.3', '1.2.4', '1.2.5', '2.0.0']) // '1.2.5'
 * @example
 * getVersion('2.x', ['1.2.3', '1.2.4', '1.2.5', '2.0.0']) // undefined
 * @example
 * getVersion('abc', ['1.2.3', '1.2.4', '1.2.5', '2.0.0']) // undefined
 */
export const getVersion = ( version: string, availableVersions: string[] ) => {

	if ( version === 'latest' ) return versionClean( [ ...availableVersions ]
		.filter( v => versionValid( v ) )
		.sort( versionRCompare )[0] ) || undefined

	let selectedVersion: string | undefined
	if ( versionValid( version ) ) selectedVersion = version
	else selectedVersion = versionMmxSatisfying( availableVersions, version ) || undefined

	return selectedVersion?.replace( /^v(?=\d)/, '' )

}

/**
 * Parses an npm-style package string into name, version, and subpath.
 *
 * Supports scoped and unscoped packages with optional version and subpath.
 *
 * @param   {string}                                                      input - The full package string to parse.
 * @returns {{ name: string, version: string, path: string } | undefined}       Parsed object.
 * @example
 * parseName('@myorg/mypkg@2.1.0/lib/index.js')
 * // => { name: '@myorg/mypkg', version: '2.1.0', path: '/lib/index.js' }
 * @example
 * parseName('@myorg/mypkg@^2.1.0')
 * // => { name: '@myorg/mypkg', version: '^2.1.0' }
 * @example
 * parseName('mypkg@3.5.2/utils')
 * // => { name: 'mypkg', version: '3.5.2', path: '/utils' }
 * @example
 * parseName('@myorg/mypkg')
 * // => { name: '@myorg/mypkg', version: 'latest', path: '' }
 * @example
 * parseName('mypkg')
 * // => { name: 'mypkg', version: 'latest', path: '' }
 * @example
 * parseName('mypkg@latest')
 * // => { name: 'mypkg', version: 'latest', path: '' }
 */
export const parseName = ( input: string ) => {

	const RE_SCOPED = /^(@[^\\/]+\/[^@\\/]+)(?:@([^\\/]+))?(\/.*)?$/
	// Parsed a non-scoped package name into name, version, path
	const RE_NON_SCOPED = /^([^@\\/]+)(?:@([^\\/]+))?(\/.*)?$/
	input               = input.toLowerCase()
	const m             = RE_SCOPED.exec( input ) || RE_NON_SCOPED.exec( input )

	if ( !m ) return undefined
	const rawPath = typeof m[3] === 'string' ? m[3].trim() : ''

	return {
		name    : m[1] || '',
		version : m[2] || 'latest',
		path    : rawPath !== '' ? rawPath : undefined,
	}

}
