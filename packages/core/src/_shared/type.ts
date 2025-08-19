import { isPath } from './sys'

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

export const isString = ( value: string ): boolean => {

	return typeof value === 'string' && value.trim().length > 0

}

export const getInputType = async ( value: string ): Promise<'url' | 'json' | 'path' | 'string'> => {

	if ( !isString( value ) )
		throw new Error( 'Input is not a valid string' )

	if ( isUrl( value ) ) return 'url'
	if ( await isPath( value ) ) return 'path'
	// isJsonString must be the last one since a json string could be a url string or a path string as well
	if ( isJsonString( value ) ) return 'json'

	return 'string'

}
