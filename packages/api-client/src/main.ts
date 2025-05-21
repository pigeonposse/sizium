import { createClient as createClientCore } from '@backan/client'

import type { paths } from '../data/openapi-schema.d.ts'

type ClientOpts = NonNullable<Parameters<typeof createClientCore>[0]>
type ClientRes = ReturnType<typeof createClientCore<paths>>

const createClient = ( opts?: ClientOpts ): ClientRes => createClientCore<paths>( opts )

export { createClient }
export type {
	ClientOpts,
	ClientRes,
	paths,
}
