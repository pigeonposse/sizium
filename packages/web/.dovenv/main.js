import { defineConfig } from '@dovenv/core'
import {
	copyFile,
	joinPath,
} from '@dovenv/core/utils'

import core from '../../../.dovenv/const.js'

export default defineConfig( { custom : { favicon : {
	desc : 'Copy favicon from {workspace}/docs',
	fn   : async () => {

		await copyFile( {
			input  : joinPath( core.workspaceDir, 'docs', 'public', 'logo.png' ),
			output : joinPath( process.cwd(), 'static', 'favicon.png' ),
		} )
		console.log( 'Copied favicon!' )

	},
} } } )
