<script lang="ts">

	import {
		onMount,
		tick,
	} from 'svelte'
	import { fade } from 'svelte/transition'

	import { userState } from '$appstate'
	import {
		Badge,
		Search,
	} from '$components'
	import {
		DepLinks,
		DepMain,
		DependencyItem,
		DepsFilters,
	} from '$ui'

	onMount( async () => {

		await tick()
		await userState.package.init()

	} )

</script>

<form
	class="search-form"
	onsubmit={async e => {

		e.preventDefault()
		// console.log( 'Submit:', userState.package.query )
		await userState.package.search( true )

	}}
>
	<Search
		id={userState.package.ID.search}
		name={userState.package.ID.search}
		placeholder="Enter package name..."
		bind:value={userState.package.query}
	/>
</form>

{#if userState.package.loading}
	<div
		class="text-center py-12"
		transition:fade
	>
		<div
			class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-coral-500 border-t-transparent text-primary-200"
			aria-label="Loading"
		></div>
	</div>
{/if}

{#if userState.package.error}
	<div
		class="bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-400 p-4 rounded-lg mt-4"
		role="alert"
		transition:fade
	>
		{userState.package.error}
	</div>
{/if}

{#if userState.package.data}

	<div
		class="container-pkg"
		transition:fade
	>
		<div class="container--header">
			<h2 class="text-lg font-bold flex-wrap">
				<a
					href="{userState.package.data.main.url.npm}"
					target="_blank"
				>
					{userState.package.data.main.name}@{userState.package.data.main.version}
				</a>
			</h2>
			<div class="flex flex-row gap-2">
				<DepLinks pkg={userState.package.data.main} />
			</div>
		</div>

		<DepMain data={userState.package.data} />

		{#if userState.package.data.packages[0].lifeCycleScripts}
			<div class="title text-primary-200/30 flex flex-col flex-nowrap gap-2 items-start">
				<b>
					<Badge type="warning">Life Cycle Scripts</Badge>
				</b>
				<div>
					Lifecycle scripts are scripts that can modify the package size.
				</div>
			</div>
		{/if}

		{#if userState.package.data.packages.length > 1 || userState.package.data.isFiltered}
			<div class="deps">
				<hr class="mb-10">

				<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
					<h2 class="text-xl font-bold flex flex-row gap-2 items-center">
						<span class="text-primary-400">Packages</span>
						{#if userState.package.sortBy}
							<Badge type="secondary"><b>Sort:</b> {userState.package.ID.sortText[userState.package.sortBy]}</Badge>
						{/if}
						{#if userState.package.data.isFiltered && userState.package.data.filtered}
							<Badge type="secondary"><b>Filtered:</b> {userState.package.data.filtered.length}</Badge>
						{/if}
					</h2>
					<DepsFilters />
				</div>

				<div>
					{#if userState.package.data.isFiltered && userState.package.data.filtered && userState.package.data.filtered?.length > 0}
						{#each userState.package.data.filtered as pkg}
							<DependencyItem
								data={userState.package.data}
								{pkg}
							/>
						{/each}
					{:else if userState.package.data.packages.length > 1 && !userState.package.data.isFiltered}
						{#each userState.package.data.packages as pkg}
							<DependencyItem
								data={userState.package.data}
								{pkg}
							/>
						{/each}
					{:else if userState.package.data.isFiltered}
						<div class="alert">
							No dependencies found
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
{/if}

