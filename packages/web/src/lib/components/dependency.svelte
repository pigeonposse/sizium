<script lang="ts">
    import type { PackageInfo } from '@sizium/core';

	import DepLinks from './dep-links.svelte';
	import { roundToTwoDecimals } from '$lib/utils';
	
    export let pkg: PackageInfo;
    export let totalSize: number;
    

  </script>
  
  <div class="dep-card">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-lg font-semibold">{roundToTwoDecimals((pkg.unpackedSize / totalSize) * 100)}%</span>
          <span class="text-sm title">{pkg.unpackedSize / 1024}KB</span>
        </div>
        
        <div class="flex items-center gap-2 mb-2">
          <h3 class="text-lg font-medium">
            <a href="https://www.npmjs.com/package/{pkg.name}" target="_blank">{pkg.name}</a> <span class="text-primary-400">v{pkg.version}</span>
          </h3>
          {#if pkg.license}
            <span class="badge">{pkg.license}</span>
          {/if}
        </div>
  
        {#if pkg.description}
          <p class="opacity-50 text-sm mb-2">{pkg.description}</p>
        {/if}
  
        <div class="flex items-center gap-4 text-sm ">
          <div class="info">
            <span class="title">Installed by:</span>
            <span class="value">{pkg.installedBy?.length || 0}</span>
			{#if pkg.installedBy?.length}
				<div class="tooltip flex-col p-2 bg-primary-950 rounded-lg ">
					{#each pkg.installedBy as name}
						<span>{name}</span>
					{/each}
				</div>
			{/if}

          </div>
          <div class="info">
            <span class="title">Dependencies:</span>
            <span class="value" >{Object.keys(pkg.dependencies || {}).length}</span>
			{#if Object.keys(pkg.dependencies || {}).length}
				<div class="tooltip ">
					{#each Object.keys(pkg.dependencies || {}) as name}
						<span>{name}</span>
					{/each}
				</div>
			{/if}
          </div>

          {#if pkg.level > 0}
            <div class="info">
				<span class="title">Level:</span>
				<span class="value">{pkg.level}</span>
            </div>
          {/if}
        </div>
      </div>
  
      <div class="flex items-center gap-0.5 opacity-80">
        <DepLinks {pkg}/>
      </div>
    </div>
  
    <div class="mt-2 flex items-center gap-3">
      <div class="flex items-center gap-2">
		{#if pkg.isESM}
			<span class="badge bg-primary-900/40">ESM</span>
		{/if}
		{#if pkg.isCommonJS}
			<span class="badge bg-primary-900/40">CommonJS</span>
		{/if}
		{#if pkg.types}
			<span class="badge bg-primary-900/40">Types</span>
		{/if}
      </div>
    </div>
  

  </div>
  
  <style>
	.dep-card {
		@apply border-b border-primary-500/20 py-6 first:pt-0 last:border-0;
	}

	.info {
		@apply flex items-center gap-2 relative;
		.title {
			@apply text-primary-500/50;
		}
		.value {
			@apply text-primary-200/20;
		}
	}
	.tooltip {
		@apply absolute top-full left-0 mt-2 p-2 bg-primary-950 rounded-lg shadow-lg z-10 hidden flex-col;
	}
	.info:hover > .tooltip {
		@apply flex; 
	}
	.badge {
		@apply px-2 py-0.5 text-xs bg-primary-900/20 rounded-full;
	}
  </style>
