import { buildSchema } from '@backan/builder'
import app             from '@sizium/api'

await buildSchema( {
	app,
	output : 'data/openapi-schema.json',
} )

