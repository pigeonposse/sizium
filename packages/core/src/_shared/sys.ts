export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

export type Input = string | URL

const trimSlashes = ( segment: string, index: number ) => {

	if ( index === 0 ) {

		let i = segment.length
		while ( i > 0 && segment[i - 1] === '/' ) i--
		return segment.slice( 0, i )

	}
	else {

		let start = 0,
			end   = segment.length

		while ( start < end && segment[start] === '/' ) start++
		while ( end > start && segment[end - 1] === '/' ) end--

		return segment.slice( start, end )

	}

}

/**
 * Joins multiple path segments into a single path.
 *
 * - In **Node.js**, utilizes the `path.join` method for joining paths.
 * - In **browsers**, manually concatenates paths, removing redundant slashes.
 *
 * @param   {...string}       paths - The path segments to join.
 * @returns {Promise<string>}       The joined path as a string.
 * @example
 * const fullPath = await joinPath('folder', 'subfolder', 'file.txt')
 * console.log(fullPath) // 'folder/subfolder/file.txt' or 'folder\\subfolder\\file.txt' in Node.js
 */
export const joinPath = async ( ...paths: string[] ): Promise<string> => {

	if ( !isBrowser ) {

		const { join } = await import( 'path' )
		return join( ...paths )

	}
	return paths
		.filter( Boolean )
		.map( trimSlashes )
		.filter( Boolean )
		.join( '/' )

}

/**
 * Reads a file as a string.
 *
 * - In **Node.js**, uses `fs.promises.readFile` to read the file.
 * - In **browsers**, performs a `fetch` with the `text()` method to read the file.
 *
 * @param   {string}          i - Path or URL of the file to read.
 * @returns {Promise<string>}   The contents of the file.
 * @example
 * const contents = await readFile('./package.json')
 * console.log(contents) // string with the contents of the file
 */
export const readFile = async ( i: string ) => {

	if ( isBrowser ) return fetch( i ).then( r => r.text() )
	return import( 'node:fs/promises' ).then( ( { readFile } ) => readFile( i, 'utf8' ) )

}

/**
 * Checks if a path is a directory.
 *
 * - In **Node.js**, uses `fs.promises.stat` to check if the path is a directory.
 * - In **browsers**, performs a `fetch` and makes a heuristic guess (not reliable).
 *
 * @param   {string}           i - Path or URL to check.
 * @returns {Promise<boolean>}   `true` if it's a directory, `false` otherwise.
 * @example
 * const isDir = await isDirectory('/some/path')
 * console.log(isDir) // true or false
 */
export const isDirectory = async ( i: string ): Promise<boolean> => {

	if ( typeof window !== 'undefined' && typeof document !== 'undefined' ) {

		try {

			const res = await fetch( i, { method: 'HEAD' } )

			// Heurística simple: si termina en '/', o content-type es HTML
			const contentType = res.headers.get( 'Content-Type' ) || ''
			const isLikelyDir = i.endsWith( '/' ) || contentType.includes( 'text/html' )
			return res.ok && isLikelyDir

		}
		catch {

			return false

		}

	}
	else {

		const { stat } = await import( 'node:fs/promises' )
		try {

			const s = await stat( i )
			return s.isDirectory()

		}
		catch {

			return false

		}

	}

}

/**
 * Checks if a path or URL is absolute.
 *
 * - In **Node.js**, uses `path.isAbsolute` to check if the path is absolute.
 * - In **browsers**, checks if the path starts with a slash.
 *
 * @param   {string}           i - Path or URL to check.
 * @returns {Promise<boolean>}   `true` if it's absolute, `false` otherwise.
 * @example
 * const isAbs = await isAbsolute('/some/path')
 * console.log(isAbs) // true or false
 */
export const isAbsolute = async ( i: string ) => {

	try {

		if ( isBrowser ) return i.startsWith( '/' )
		return ( await import( 'node:path' ) ).isAbsolute( i )

	}
	catch {

		return false

	}

}

export const isPath = async ( value: string ) => {

	if ( await isAbsolute( value ) || /^(\.\/|\.\.\/|[A-Za-z]:\\|\/)/.test( value ) ) {

		if ( /\s(?!\\)/.test( value ) && !/\\\s/.test( value ) )
			return false

		try {

			const normalizedPath = await joinPath( value )
			return normalizedPath !== ''

		}
		catch {

			return false

		}

	}

	return false

}

/**
 * Resolves a path or URL depending on the environment.
 *
 * - In **Node.js**, returns an absolute file system path using `path.resolve`.
 * - In the **browser**, returns an absolute URL string using `new URL(...)`.
 *
 * @param   {string}          i - Input path or URL string.
 * @returns {Promise<string>}   Resolved path or URL.
 * @example
 * // In Node.js:
 * const abs = await resolvePath('./foo/bar')
 * console.log(abs) // => '/Users/me/project/foo/bar'
 * @example
 * // In browser:
 * const fullUrl = await resolvePath('/foo/bar')
 * console.log(fullUrl) // => 'http://localhost:3000/foo/bar'
 */
export const resolvePath = async ( i: string ) => {

	if ( isBrowser ) {

		return new URL( i, window.location.href ).toString()

	}
	else {

		const { resolve } = await import( 'node:path' )
		return resolve( i )

	}

}
