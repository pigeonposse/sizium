<script lang="ts">
	
	import Confetti from "./confetti-core.svelte"

</script>

<Confetti 
	rounded={true}
	size={10}
	amount={100}
	noGravity={true}
	duration={6000}
	fallDistance="0px"
	x={[-6, 6]} 
	y={[-6, 6]} 
	infinite={true}
	colorArray={[
		'white',
		'var(--theme-primary)',
		'var(--theme-primary-900)',
	]}
/>

