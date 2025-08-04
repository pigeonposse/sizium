<script lang="ts">

	import type { PopoverContentProps } from './types'

	let {
		children,
		class: Klass,
		...rest
	}: PopoverContentProps = $props()

</script>

<div
	class={[ 'popover--content', Klass ]}
	{...rest}
>
	{@render children?.()}
</div>
