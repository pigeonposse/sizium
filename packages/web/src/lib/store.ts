import { persistBrowserSession } from '@macfja/svelte-persistent-store'
import { writable }              from 'svelte/store'

import type { SiziumResponse } from '@sizium/core'

export const packageCache = persistBrowserSession( writable<Record<string, SiziumResponse>>( {} ), 'packageCache' )
