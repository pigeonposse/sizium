import type { Seo }            from '@svaio/meta/svelte'
import type { ComponentProps } from 'svelte'

type SeoProps = ComponentProps<typeof Seo>

export const load = () => {

	const metaAll: SeoProps['meta'] = {
		title       : `${MAIN_PKG.extra.productName} - ${MAIN_PKG.extra.shortDesc}`,
		description : MAIN_PKG.extra.action,
	}
	const meta: SeoProps['meta']    = {}

	const jsonld: NonNullable<SeoProps['jsonld']> = {
		output : 'head',
		/** @see https://validator.schema.org/ */
		schema : {
			'@context'            : 'http://schema.org',
			'@type'               : [ 'WebApplication' ],
			'name'                : metaAll.title,
			'description'         : MAIN_PKG.extra.shortDesc + ' ' + metaAll.description,
			'url'                 : MAIN_PKG.homepage,
			'applicationCategory' : 'UtilitiesApplication',
			'softwareVersion'     : PKG.version,
			'keywords'            : MAIN_PKG.keywords,
			'featureList'         : [
				'Package size',
				'NPM\'s size',
				'Completely Free',
				'Open Source',
			],
			'publisher' : {
				'@type' : 'Organization',
				'logo'  : MAIN_PKG.extra.collective.gh + '.png',
				'email' : MAIN_PKG.extra.collective.email,
				'name'  : MAIN_PKG.extra.collective.name,
				'url'   : MAIN_PKG.extra.collective.url,
			},
			'license' : MAIN_PKG.extra.licenseURL,
		},
	}
	return {
		metaAll,
		meta,
		jsonld,
	}

}
export const prerender = 'auto'
