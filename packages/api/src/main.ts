/**
 * Backan server.
 *
 * @description Vite config.
 * @see https://backan.pigeonposse.com/guide/server
 */

import { App } from 'backan'

import {
	version,
	name,
	description,
	homepage,
} from '../package.json'
import * as size from './routes/size'

/**
 * Sizium Application API
 *
 * @see https://backan.pigeonposse.com
 */
const app = new App( {
	version,
	title       : name,
	description : description || `${name} API documentation`,
	contact     : { url: homepage },
} )

app.route( size.id, size.route )

export default app
