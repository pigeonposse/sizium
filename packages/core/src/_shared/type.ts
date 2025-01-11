import {
	isAbsolute,
	join,
} from 'node:path'

export const isUrl = ( value: string ): boolean => {

	try {

		new URL( value )
		return true

	}
	catch {

		return false

	}

}

export const isJsonString = ( value: string ): boolean => {

	try {

		JSON.parse( value )
		return true

	}
	catch {

		return false

	}

}

export const isPath = ( value: string ): boolean => {

	// copy of: https://github.com/pigeonposse/dovenv/blob/main/packages/utils/src/sys/super/main.ts
	if ( isAbsolute( value ) || /^(\.\/|\.\.\/|[A-Za-z]:\\|\/)/.test( value ) ) {

		if ( isAbsolute( value ) || /^(\.\/|\.\.\/|[A-Za-z]:\\|\/)/.test( value ) ) {

			if ( /\s(?!\\)/.test( value ) && !/\\\s/.test( value ) )
				return false

			try {

				const normalizedPath = join( value )
				return normalizedPath !== ''

			}
			catch {

				return false

			}

		}

	}
	return false

}

export const isString = ( value: string ): boolean => {

	return typeof value === 'string' && value.trim().length > 0

}

export const getInputType = ( value: string ): 'url' | 'json' | 'path' | 'string' => {

	if ( !isString( value ) )
		throw new Error( 'Input is not a valid string' )

	if ( isUrl( value ) ) return 'url'
	if ( isJsonString( value ) ) return 'json'
	if ( isPath( value ) ) return 'path'

	return 'string'

}
