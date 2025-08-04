<script lang="ts">

	import type { PkgInfo } from '$appstate'

	import {
		CODE_ICON,
		INFO_ICON,
	} from '$icons'

	let { data }: { data: NonNullable<PkgInfo['lifeCycleScripts']> } = $props()

</script>

{#snippet title( name: string, icon?: string )}
	<h4 class="flex items-center gap-2">
		{#if icon}
			<span class="{icon} h-4 w-4"></span>
		{/if}
		<span>{name}</span>
	</h4>
{/snippet}

<div class="flex flex-col gap-4 text-primary-400">
	{@render title( 'Information', INFO_ICON )}
	<span>Lifecycle scripts are scripts that can modify the package size.</span>
</div>
<div class="flex flex-col gap-4 text-primary-400">
	{@render title( 'Scripts', CODE_ICON )}
	<div class="flex flex-col justify-between w-max">
		{#each Object.entries( data ) as [ k, script ]}
			<p><b>{k}</b> <span>{script}</span></p>
		{/each}
	</div>
</div>
