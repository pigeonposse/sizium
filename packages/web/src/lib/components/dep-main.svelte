<script lang="ts">

	import { roundToTwoDecimals } from '$lib/utils'

	import type { SiziumResponse } from '@sizium/core'

	export let data: SiziumResponse

</script>

<div class="cards">
	<div>
		<div>
			<p class="title">Total Size</p>
			<p class="value">{roundToTwoDecimals( data.sizeMB )}mb <span>({roundToTwoDecimals( data.sizeKB )}kb)</span></p>
		</div>

		<div>
			<p class="title">Unpacked Size</p>
			<p class="value">{roundToTwoDecimals( data.packages[0].unpackedSizeMB )}mb <span>({roundToTwoDecimals( data.packages[0].unpackedSizeKB )}kb)</span></p>
		</div>
	</div>

	<div>
		<div>
			<p class="title">Packages installed</p>
			<p class="value">{data.packageNum === 1 ? 0 : data.packageNum}</p>
		</div>

		<div>
			<p class="title">Module Type</p>
			<p class="value">
				{data.packages[0].isESM ? 'ESM' : ( data.packages[0].isCommonJS ? 'CommonJS' : 'Unknown' )}
			</p>
		</div>
	</div>
</div>

<style lang="postcss">

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

</style>
