<script lang="ts">
	import type { PackageInfo } from '@sizium/core';
	import { Github, Globe, Heart, PackageOpen } from 'lucide-svelte';
  
	export let pkg: PackageInfo;

</script>

	{#if pkg.url.unpkg}
		<a
		href={pkg.url.unpkg}
		target="_blank"
		rel="noopener noreferrer"
		class="p-2"
		title="Repository"
		>
		<PackageOpen class="w-5 h-5" />
		</a>
	{/if}

	{#if pkg.url.repository}
	  <a
		href={pkg.url.repository}
		target="_blank"
		rel="noopener noreferrer"
		class="p-2"
		title="Repository"
	  >
		<Github class="w-5 h-5" />
	  </a>
	{/if}
	{#if pkg.url.homepage}
	  <a
		href={pkg.url.homepage}
		target="_blank"
		rel="noopener noreferrer"
		class="p-2"
		title="Homepage"
	  >
		<Globe class="w-5 h-5" />
	  </a>
	{/if}
	{#if pkg.url.funding}
	  <a
		href={pkg.url.funding}
		target="_blank"
		rel="noopener noreferrer"
		class="p-2"
		title="Sponsor"
	  >
		<Heart class="w-5 h-5" />
	  </a>
	{/if}
