<script lang="ts">

	import type { HTMLInputAttributes } from 'svelte/elements'

	import { SEARCH_ICON } from '$icons'

	let input: HTMLInputElement | undefined

	let {
		el = $bindable( input ),
		value = $bindable( '' ),
		size = 'medium',
		id,
		class: Klass,
		...rest
	}: Omit<HTMLInputAttributes, 'size'> & {
		el?          : HTMLInputElement
		value        : string
		placeholder? : string
		size?        : 'medium' | 'small'
		id           : string
	} = $props()

</script>
<div
	class={[
		'search',
		size,
		Klass,
	]}
>
	<input
		bind:this={input}
		{id}
		class={[ 'search-input' ]}
		type="search"
		bind:value={value}
		{...rest}
	/>
	<span class={[ 'search-icon', SEARCH_ICON ]}></span>
</div>

