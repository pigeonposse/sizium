<script lang="ts">

	let {
		href, label, icon,
	}: {
		href  : string
		label : string
		icon  : string
	} = $props()

</script>
<a
	class={[ 'tooltip tooltip--top', 'h-4 w-4 text-primary-300' ]}
	aria-label={label}
	href={href}
	target="_blank"
>
	<span class={icon}></span>
</a>
