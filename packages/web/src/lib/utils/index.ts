
export const roundToTwoDecimals = ( num: number ) => {

	return Math.round( num * 100 ) / 100

}

export const decodeQueryParam = ( p:string ) => {

	return decodeURIComponent( p.replace( /\+/g, ' ' ) )

}
