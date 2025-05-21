/**
 * Test files.
 *
 * @description Test files.
 * @see https://playwright.dev/docs/api/class-test
 */

import {
	expect,
	test,
} from '@playwright/test'

test( 'Server is working', async ( { page } ) => {

	const pkgName  = 'chalk'
	const response = await page.request.get( '/size?input=' + pkgName )
	expect( response.ok() ).toBe( true )

	const responseData = await response.json()
	expect( responseData.id ).toBe( pkgName )

} )
