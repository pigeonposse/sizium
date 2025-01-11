import { createClient } from '../src/main'

const client = createClient( { baseUrl: 'http://localhost:1312/' } )

const response = await client.GET( '/size', { params: { query: { input: 'semver' } } } )

console.log( response )
