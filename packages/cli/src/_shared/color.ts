// import color from 'picocolors'

import { styleText } from 'node:util'

export const bold = ( text: string ) => styleText( 'bold', text )
export const italic = ( text: string ) => styleText( 'italic', text )
export const green = ( text: string ) => styleText( 'green', text )
export const dim = ( text: string ) => styleText( 'dim', text )
export const yellow = ( text: string ) => styleText( 'yellow', text )
export const cyan = ( text: string ) => styleText( 'cyan', text )
export const inverse = ( text: string ) => styleText( 'inverse', text )
export const magenta = ( text: string ) => styleText( 'magenta', text )
export const underline = ( text: string ) => styleText( 'underline', text )

