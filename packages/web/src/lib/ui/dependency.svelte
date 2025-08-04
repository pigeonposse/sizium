<script lang="ts">

	import {
		type PkgData,
		type PkgInfo,
		userState,
	} from '$appstate'
	import {
		Badge,
		Popover,
	} from '$components'
	import { VIEW_ICON } from '$icons'
	import {
		DepLifeCycleScripts,
		DepLink,
		DepLinks,
	} from '$ui'
	import { roundToTwoDecimals } from '$utils'

	type Dependence = PkgInfo | {
		name     : string
		version? : string
	}
	type Deps = Dependence[]

	type Props = {
		pkg  : PkgInfo
		/**
		 * All Package data
		 */
		data : PkgData
	}
	let {
		pkg,
		data,
	}: Props = $props()

	const getID = ( name: string, version?: string ) =>
		version ? name + '@' + version : name

	let dependencies: Deps | undefined = $derived( ( !pkg.dependencies
		? undefined
		: Object.entries( pkg.dependencies ).map( ( [ name, version ] ) => userState.package.find( {
			name,
			version,
		} ) || {
			name,
			version,
		} ) ) )

</script>

{#snippet deplink( value: Dependence )}
	<a
		class="flex items-center gap-4 justify-between"
		href="#{getID( value.name, value.version )}"
	>
		<b>{getID( value.name, value.version )}</b>
		<span class="text-end">{'unpackedSizeKB' in value ? ` ${roundToTwoDecimals( value.unpackedSizeKB )} KB` : ''}</span>
	</a>
{/snippet}

<div class="dep-card">
	<div class="dep-card--content">
		<div class="flex-1">
			<div class="flex items-center gap-2 mb-1">
				<span class="text-lg font-semibold">{roundToTwoDecimals( ( pkg.unpackedSize / data.size ) * 100 )}%</span>
				<span class="text-sm title">{roundToTwoDecimals( pkg.unpackedSizeMB )}mb <i>({roundToTwoDecimals( pkg.unpackedSizeKB )}kb)</i></span>
			</div>

			<div class="flex items-center gap-2 mb-2 flex-wrap">
				<h3
					id={pkg.name + '@' + pkg.version}
					class="text-lg font-medium"
				>
					<a
						href="{pkg.url.npm}"
						target="_blank"
					>
						{pkg.name}
					</a>
					<span class="text-primary-400">v{pkg.version}</span>
				</h3>
				{#if pkg.author?.name && pkg.author?.url}
					<Badge
						class="tooltip tooltip--top gap-1"
						link={{
							'href'       : pkg.author.url,
							'target'     : '_blank',
							'aria-label' : 'Author',
						}}
					>
						<span>by</span> <b>{pkg.author.name}</b>
					</Badge>
				{/if}
				{#if pkg.license}
					<Badge
						class="tooltip tooltip--top"
						aria-label="License"
					>{pkg.license}</Badge>
				{/if}
			</div>

			{#if pkg.description}
				<p class="opacity-50 text-sm mb-2">{pkg.description}</p>
			{/if}

			<div class="dep-card--list flex-wrap">
				<Popover.Root class="info">
					<span class="title">Installed by:</span>
					<span class="value">{pkg.installedBy?.length || 0}</span>
					{#if pkg.installedBy?.length}
						<Popover.Content>
							{#each pkg.installedBy as name}
								{@render deplink( userState.package.find( name ) || { name } )}
							{/each}
						</Popover.Content>
					{/if}
				</Popover.Root>

				<Popover.Root class="info">
					<span class="title">Dependencies:</span>
					<span class="value">
						{Object.keys( pkg.dependencies || {} ).length}
						{#if dependencies?.length}
							<i class="opacity-70">({roundToTwoDecimals( dependencies?.reduce( ( acc, dep ) => acc + ( 'unpackedSizeMB' in dep ? dep.unpackedSizeMB : 0 ), 0 ) || 0 )}MB)</i>
						{/if}
					</span>
					{#if dependencies?.length}
						<Popover.Content class="flex flex-col justify-between w-max">
							{#each dependencies as value}
								{@render deplink( value )}
							{/each}
						</Popover.Content>
					{/if}
				</Popover.Root>

				{#if pkg.level > 0}
					<div class="info">
						<span class="title">Level:</span>
						<span class="value">{pkg.level}</span>
					</div>
				{/if}
			</div>
		</div>

		<div class="flex items-center gap-2.5 opacity-80 py-1">
			<DepLinks {pkg} />
			<DepLink
				href="/?{userState.package.ID.search}={getID( pkg.name, pkg.version )}"
				icon={VIEW_ICON}
				label="Search in Sizium"
			/>
		</div>
	</div>

	<div class="dep-card--footer">
		<div class="dep-card--list">
			{#if pkg.isESM}
				<Popover.Root>
					<Badge type="tertiary">ESM</Badge>
					<Popover.Content>
						<p>ECMAScript Modules</p>
					</Popover.Content>
				</Popover.Root>
			{/if}
			{#if pkg.isCommonJS}
				<Popover.Root>
					<Badge type="tertiary">CommonJS</Badge>
					<Popover.Content>
						<p>Common Modules</p>
					</Popover.Content>
				</Popover.Root>
			{/if}
			{#if pkg.types}
				<Popover.Root>
					<Badge type="tertiary">Types</Badge>
					<Popover.Content>
						<p>TypeScript</p>
					</Popover.Content>
				</Popover.Root>
			{/if}
			{#if pkg.lifeCycleScripts && userState.package.hasInstallScript( pkg )}
				<Popover.Root>
					<Badge type="warning">Install Scripts</Badge>
					<Popover.Content>
						<DepLifeCycleScripts data={pkg.lifeCycleScripts} />
					</Popover.Content>
				</Popover.Root>
			{/if}
		</div>
	</div>

</div>

