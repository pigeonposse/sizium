<script lang="ts">

	import {
		Github,
		Globe,
		Heart,
		PackageOpen,
	} from 'lucide-svelte'

	import type { PackageInfo } from '@sizium/core'

	export let pkg: PackageInfo

</script>

{#if pkg.url.unpkg}
	<a
		class="p-2"
		href={pkg.url.unpkg}
		rel="noopener noreferrer"
		target="_blank"
		title="Repository"
	>
		<PackageOpen class="w-5 h-5" />
	</a>
{/if}

{#if pkg.url.repository}
	<a
		class="p-2"
		href={pkg.url.repository}
		rel="noopener noreferrer"
		target="_blank"
		title="Repository"
	>
		<Github class="w-5 h-5" />
	</a>
{/if}
{#if pkg.url.homepage}
	<a
		class="p-2"
		href={pkg.url.homepage}
		rel="noopener noreferrer"
		target="_blank"
		title="Homepage"
	>
		<Globe class="w-5 h-5" />
	</a>
{/if}
{#if pkg.url.funding}
	<a
		class="p-2"
		href={pkg.url.funding}
		rel="noopener noreferrer"
		target="_blank"
		title="Sponsor"
	>
		<Heart class="w-5 h-5" />
	</a>
{/if}
