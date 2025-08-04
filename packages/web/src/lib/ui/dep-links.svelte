<script lang="ts">

	import type { PkgInfo } from '$appstate'

	import {
		DONATE_ICON,
		GITHUB_ICON,
		PACKAGE_ICON,
		SEGURITY_ICON,
		WEB_ICON,
	} from '$icons'
	import { DepLink } from '$ui'

	let { pkg }: { pkg: PkgInfo } = $props()

</script>

{#if pkg.url.unpkg}
	<DepLink
		href={pkg.url.unpkg}
		icon={PACKAGE_ICON}
		label="UnPKG CDN"
	/>
{/if}
{#if pkg.url.repository}
	<DepLink
		href={pkg.url.repository}
		icon={GITHUB_ICON}
		label="Repository"
	/>
{/if}
{#if pkg.url.homepage}
	<DepLink
		href={pkg.url.homepage}
		icon={WEB_ICON}
		label="Homepage"
	/>
{/if}
{#if pkg.url.funding}
	<DepLink
		href={pkg.url.funding}
		icon={DONATE_ICON}
		label="Sponsor"
	/>
{/if}

<DepLink
	href={`https://socket.dev/npm/package/${pkg.name}`}
	icon={SEGURITY_ICON}
	label="Security"
/>
