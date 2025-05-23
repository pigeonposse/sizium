
import appProcess from 'node:process'

const {
	exit, argv,
} = appProcess

export { exit }

/**
 * This is not recomended but is for not display `(node:31972) [DEP0040] DeprecationWarning:
 * The `punycode` module is deprecated. Please use a userland alternative instead.` message.
 *
 * @example setNoDeprecationAlerts()
 */
export const setNoDeprecationAlerts = () => {

	// @ts-ignore
	appProcess.noDeprecation = true

}
export const onExit = ( cb: NodeJS.ExitListener ) => {

	appProcess.on( 'exit', cb )

}

export const cancel = () => exit( 130 )

export const onCancel = ( cb: NodeJS.ExitListener ) => {

	appProcess.on( 'SIGINT', cb )

}

export const getFlagValue = ( key: string, isAlias = false ) => {

	const flagLine = isAlias || key.length === 1 ? '-' : '--'
	const flags    = argv
	for ( let i = 0; i < flags.length; i++ ) {

		const flag = flags[i]

		// Formato --key=value
		if ( flag.startsWith( `${flagLine}${key}=` ) )
			return flag.split( '=' )[1]

		// Formato --key value
		if ( flag === `${flagLine}${key}` && flags[i + 1] && !flags[i + 1].startsWith( flagLine ) )
			return flags[i + 1]

	}
	return undefined

}

export const getFlagValues = ( key: string,	isAlias = false ): string[] | undefined => {

	const flags    = argv
	const flagLine = isAlias || key.length === 1 ? '-' : '--'

	let values: string[] = []

	for ( let i = 0; i < flags.length; i++ ) {

		const flag = flags[i]

		// Formato --key=value1,value2,...
		if ( flag.startsWith( `${flagLine}${key}=` ) ) {

			values = flag.split( '=' )[1].split( ',' )
			break

		}

		// Formato --key value1 value2 ...
		if ( flag === `${flagLine}${key}` ) {

			for ( let j = i + 1; j < flags.length; j++ ) {

				if ( flags[j].startsWith( flagLine ) ) break
				values.push( flags[j] )

			}
			break

		}

	}
	return values.length > 0 ? values : undefined

}

export const existsFlag = ( v: string, isAlias = false ) => {

	const flagLine = isAlias || v.length === 1 ? '-' : '--'
	return argv.includes( `${flagLine}${v}` )

}

export const existsCmd = ( v: string ) => argv.includes( v )
export const noFlags = () => argv.length <= 2

