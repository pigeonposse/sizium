<script lang="ts">
	import type { PopoverProps } from './types'

	let {
		children,
		class: Klass,
		...rest
	}: PopoverProps = $props()
</script>

<div
	class={[ 'popover', Klass ]}
	role="dialog"
	tabindex="0"
	{...rest}
>
	{@render children?.()}
</div>
