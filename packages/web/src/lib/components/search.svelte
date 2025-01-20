<script lang="ts">

	import { Search } from "lucide-svelte";
	export let value = ''
	export let placeholder = ''
	export let size: 'medium' | 'small' = 'medium'

</script>
<div class="relative">
	<input
		type="text"
		bind:value={value}
		{placeholder}
		class="search-input {size}"
		aria-label="Package name"
	/>
	<button 
		type="submit"
		class="absolute right-2 top-1/2 -translate-y-1/2 p-2"
		aria-label="Search"
	>
		<Search class="w-5 h-5" />
	</button>
</div>

<style lang="postcss">
	.search-input {
		@apply w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 pr-12;
	}
	.search-input.small {
		@apply px-2 py-2 text-sm;
	}

</style>
