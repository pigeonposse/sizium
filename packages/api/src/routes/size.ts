import { Sizium } from '@sizium/core'
import { App }    from 'backan'

const id             = 'size'
const route          = new App( )
const schemaResponse =  route.validation.object( {} )

route.add(
	{
		method    : 'get',
		path      : '/',
		summary   : 'Get Package size data',
		request   : { query: route.validation.object( { input: route.validation.string().describe( `Set the input` ) } ) },
		responses : {
			200 : route.response.responseJSONSuccess( schemaResponse ),
			400 : route.response.responseJSONError400,
			500 : route.response.responseJSONError500,
		},
		tags : [ id ],
	},
	async c => {

		try {

			const query = c.req.valid( 'query' )
			const size  = new Sizium( query.input )
			const data  = await size.get()

			return route.response.addSuccessResponse( c, data )

		}
		catch ( e ) {

			return route.response.add500Error( c, e )

		}

	},
)

export {
	id,
	route,
}
