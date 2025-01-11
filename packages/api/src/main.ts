/**
 * Backan server.
 * @description Vite config.
 * @see https://backan.pigeonposse.com/guide/server
 */

import { App } from 'backan'

import {
	version,
	name,
	description,
} from '../package.json'
import getRoute from './routes/size'

const app = new App( {
	version,
	title       : name,
	description : description || `${name} API documentation`,
} )

app.addRoute( getRoute )

export default app
