export const normalizeRepositoryUrl = ( url?: string ): string | undefined => {

	if ( !url ) return undefined

	try {

		const parsedUrl    = new URL( url )
		parsedUrl.protocol = 'https:' // force https

		if ( parsedUrl.pathname.endsWith( '.git' ) )
			parsedUrl.pathname = parsedUrl.pathname.slice( 0, -4 )

		return parsedUrl.toString()

	}
	catch ( _error ) {

		return undefined

	}

}
