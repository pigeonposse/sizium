<script lang="ts">

	import Confetti from './confetti-core.svelte'

</script>

<Confetti
	amount={100}
	colorArray={[
		'white',
		'var(--theme-primary)',
		'var(--theme-primary-900)',
	]}
	duration={6000}
	fallDistance="0px"
	infinite={true}
	noGravity={true}
	rounded={true}
	size={10}
	x={[ -6, 6 ]}
	y={[ -6, 6 ]}
/>

