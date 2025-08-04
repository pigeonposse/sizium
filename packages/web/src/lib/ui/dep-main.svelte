<script lang="ts">

	import type { PkgData } from '$appstate'

	import { roundToTwoDecimals } from '$utils'

	let { data }: { data: PkgData } = $props()

</script>

{#snippet section( title: string, value: string | number )}
	<div>
		<p class="title">{title}</p>
		<p class="value">{value}</p>
	</div>
{/snippet}

{#snippet sectionSize( title: string, mb: number, kb: number, )}
	<div>
		<p class="title">
			{title}
		</p>
		<p class="value">{roundToTwoDecimals( mb )}mb <span>({roundToTwoDecimals( kb )}kb)</span></p>
	</div>
{/snippet}

<div class="cards">
	<div>
		{@render sectionSize( 'Total Size', data.sizeMB, data.sizeKB )}
		{@render sectionSize( 'Unpacked Size', data.packages[0].unpackedSizeMB, data.packages[0].unpackedSizeKB )}
	</div>

	<div>
		{@render section( 'Packages installed', data.packageNum === 1 ? 0 : data.packageNum )}
		{@render section( 'Module Type', data.packages[0].isESM ? 'ESM' : ( data.packages[0].isCommonJS ? 'CommonJS' : 'Unknown' ) )}
	</div>
</div>
