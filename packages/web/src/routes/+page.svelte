<script lang="ts">
	
	import { fade } from 'svelte/transition';
	import type { SiziumResponse } from '@sizium/core';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DependencyItem from '$lib/components/dependency.svelte';
	import DepLinks from '$lib/components/dep-links.svelte';
	import { roundToTwoDecimals, getPkgData, decodeQueryParam } from '$lib/utils';
	import Search from '$lib/components/search.svelte';

	
	let searchQuery = '';
	let loading = false;
	let packageInfo: SiziumResponse | null = null;
	let error: string | null = null;
	let sortBy: 'size' | 'name' | 'level' = 'size';
	let searchFilter = '';
	const paramsID = {
		search:'s',
		filter: 'filter'
	}
	async function searchPackage(name: string) {
	  if (!name) return;
	  
	  loading = true;
	  error = null;
	  packageInfo = null;
	  
	  try {
		updateURL(name);

		const data = await getPkgData(name)
		
		packageInfo = data
		
	  } catch (e) {
		if(e instanceof Error) error = e.message;
		else error = `Unexpected error ${e}`;
	  } finally {
		loading = false;
	  }
	}
  
	function handleSubmit(e: Event) {
	
	  e.preventDefault();
	  searchPackage(searchQuery);
	}

	function updateURL(packageName: string) {
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.set(paramsID.search, encodeURIComponent(packageName)); 
			window.history.pushState({}, '', url.toString()); // Actualiza la URL sin recargar la página
		}
	}


	// function sortPackages(packages: PackageInfo[]): PackageInfo[] {

	// 	return [...packages].sort((a, b) => {
	// 		switch (sortBy) {
	// 			case 'size':
	// 				return b.unpackedSize - a.unpackedSize;
	// 			case 'name':
	// 				return a.name.localeCompare(b.name);
	// 			case 'level':
	// 				return a.level - b.level;
	// 			default:
	// 				return 0;
	// 		}
	// 	});
	// }

	$: filteredPackages = packageInfo?.packages.filter(pkg => 
		!searchFilter || pkg.name.toLowerCase().includes(searchFilter.toLowerCase())
	) ?? [];



	onMount(() => {
		const value = $page.url.searchParams.get(paramsID.search)
		if (value) {
			searchQuery = decodeQueryParam(value);
			searchPackage(searchQuery);
		}
	});


</script>

<svelte:head>
	<title>{MAIN_PKG.extra.productName} - {MAIN_PKG.extra.shortDesc}</title>
	<meta name="description" content="{MAIN_PKG.description}" />
</svelte:head>

<div class="text-center mb-12 justify-center flex-col items-center content-center justify-items-center">

	<img src="/favicon.png" alt="Sizium logo" width="80" height="80" >
	<h1 class="text-4xl font-bold mb-4">{MAIN_PKG.extra.productName.toUpperCase()}</h1>
	<p class="subtitle">Find the true size of any <strong><a href="https://www.npmjs.com/" target="_blank">npm</a></strong> <i>package</i></p>
</div>

<form 
	on:submit={handleSubmit}
	class="mb-8"
>
	
	<div class="relative">
		<Search  
			bind:value={searchQuery} 
			placeholder="Enter package name..." 
		/>
	</div>
</form>

{#if loading}
	<div class="text-center py-12" transition:fade>
		<div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-coral-500 border-t-transparent" aria-label="Loading"></div>
	</div>
{/if}

{#if error}
	<div class="bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-400 p-4 rounded-lg mt-4" transition:fade role="alert">
		{error}
	</div>
{/if}

{#if packageInfo}

	<div class="container-pkg" transition:fade>
		<div class="header">
			<h2 class="text-lg font-bold">
				<a href="https://www.npmjs.com/package/{packageInfo.packages[0].name}" target="_blank">
					{packageInfo.packages[0].name}@{packageInfo.packages[0].version}
				</a>
			</h2>
			<div class="flex flex-row">
				<DepLinks pkg={packageInfo.packages[0]}/>
			</div>
		</div>
		
		<div class="cards">
			<div >
				<div>
					<p class="title">Total Size</p>
					<p class="value">{roundToTwoDecimals(packageInfo.size / 1024 / 1024)}mb <span>({roundToTwoDecimals(packageInfo.size / 1024)}kb)</span></p>
				</div>
				
				<div >
					<p class="title">Unpacked Size</p>
					<p class="value">{roundToTwoDecimals(packageInfo.packages[0].unpackedSize / 1024 / 1024)}mb <span>({roundToTwoDecimals(packageInfo.packages[0].unpackedSize / 1024)}kb)</span></p>
				</div>
			</div>
			
			<div >
				<div >
					<p class="title">Packages installed</p>
					<p class="value">{packageInfo.packageNum === 1 ? 0 : packageInfo.packageNum }</p>
				</div>
				
				<div >
					<p class="title">Module Type</p>
					<p class="value">
						{packageInfo.packages[0].isESM ? 'ESM' : (packageInfo.packages[0].isCommonJS ? 'CommonJS' : 'Unknown')}
					</p>
				</div>
			</div>
		</div>

		{#if packageInfo.packages.length > 1}
			<div class="deps">
				<hr class="mb-10">
				
				<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
					<h2 class="text-xl font-bold text-primary-400">Packages</h2>
					<div class="relative flex-1 max-w-xs">
						<Search  
							bind:value={searchFilter} 
							placeholder="Filter dependencies..."
							size='small'
						/>
					</div>
					<!-- <div class="flex items-center gap-2">
						<select
							bind:value={sortBy}
							class="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-coral-500 bg-transparent"
						>
							<option value="size">Size</option>
							<option value="name">Name</option>
							<option value="level">Level</option>
						</select>
					</div> -->
				</div>

				<div class="space-y-6">
					{#each filteredPackages as pkg }
						<DependencyItem {pkg} totalSize={packageInfo.size} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

<style>

	.deps {
		@apply mt-8;
	}
	.subtitle {
		@apply text-xl;
	}
	.container-pkg {
		@apply rounded-lg shadow-lg p-6 mt-4 bg-primary-100/50 dark:bg-primary-900/20 backdrop:blur-lg;
		.header {
			@apply flex sm:flex-row flex-col justify-between mb-4;
		}
		.cards {
			@apply grid grid-cols-1 md:grid-cols-2 gap-6 mb-8;
			> div {
				@apply space-y-4;

				> div {
					@apply dark:bg-primary-800/20 p-4 rounded-lg;

					.title {
						@apply text-sm;
					}
					.value {
						@apply text-2xl font-bold;

						> span {
							@apply dark:opacity-30 italic font-medium;
						}
					}
				}
			}
		}
	}
</style>
