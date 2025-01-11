import color from 'picocolors'

import { exit }     from './_shared/process'
import { RES_TYPE } from './const'

const {
	bold,
	green,
	dim,
	yellow,
	cyan,
	inverse,
	magenta,
	underline,
} = color

export const printHelp = ( name: string, description: string, docsURL: string, version: string ): void => {

	name = name.toLowerCase()

	console.log( `${inverse( bold( ' ' + name + ' help ' ) )}

${description}

${bold( 'Usage:' )} ${cyan( name )} ${green( '<command>' )} ${yellow( '[...flags]' )} 

${bold( 'Options:' )}      

  ${yellow( '-i, --input' )}            ${dim( 'Library input. Accepted:' )}
                         ${dim( '  - libraryID (name@version)' )}
                         ${dim( '  - path (dir to project / file to package.json)' )}
                         ${dim( '  - URL (to https://www.npmjs.com/package/${name} or link to package.json)' )}
  ${yellow( '-r, --res' )}             ${dim( `Type of response. ${Object.values( RES_TYPE ).join( ', ' )}` )}

${bold( 'Global options:' )}

  ${yellow( '-h, --help' )}             ${dim( 'Show help message' )}
  ${yellow( '-v, --version' )}          ${dim( 'Show version' )}

${bold( 'Examples:' )}

  ${dim( 'From name' )}              ${cyan( `${name} --input chalk` )}
  ${dim( 'From name and version' )}  ${cyan( `${name} --input binarium@2.0.5` )}
  ${dim( 'From local dir' )}         ${cyan( `${name} -i ./` )}
  ${dim( 'From package file' )}      ${cyan( `${name} -i ./package.json` )}
  ${dim( 'From URL' )}               ${cyan( `${name} -i https://raw.githubusercontent.com/pigeonposse/binarium/refs/heads/main/package.json` )}  
  ${dim( 'Return only size' )}       ${cyan( `${name} -i chalk --res ${RES_TYPE.SIZE}` )}

${bold( 'More info:' )}               ${magenta( underline( docsURL ) )}

${bold( 'Version:' )}                 ${dim( version )}
	` )

	exit( 0 )

}
