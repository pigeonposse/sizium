<script lang="ts">

	import Link from './dep-link.svelte'

	import type { PkgInfo } from '$appstate'

	import {
		DONATE_ICON,
		GITHUB_ICON,
		PACKAGE_ICON,
		SEGURITY_ICON,
		WEB_ICON,
	} from '$icons'

	let { pkg }: { pkg: PkgInfo } = $props()

</script>

{#if pkg.url.unpkg}
	<Link
		href={pkg.url.unpkg}
		icon={PACKAGE_ICON}
		label="UnPKG CDN"
	/>
{/if}
{#if pkg.url.repository}
	<Link
		href={pkg.url.repository}
		icon={GITHUB_ICON}
		label="Repository"
	/>
{/if}
{#if pkg.url.homepage}
	<Link
		href={pkg.url.homepage}
		icon={WEB_ICON}
		label="Homepage"
	/>
{/if}
{#if pkg.url.funding}
	<Link
		href={pkg.url.funding}
		icon={DONATE_ICON}
		label="Sponsor"
	/>
{/if}

<Link
	href={`https://socket.dev/npm/package/${pkg.name}`}
	icon={SEGURITY_ICON}
	label="Security"
/>
