<script lang="ts">
	import '../app.css';

	import { fade } from 'svelte/transition';
	import Footer from '$lib/components/footer.svelte';
	import Confetti from '$lib/components/confetti.svelte';
</script>



<div class="min-h-screen max-h-screen flex flex-col items-center justify-center overflow-hidden relative">

	<div class="absolute w-full h-full inset-0 blur-[10px] flex flex-col items-center justify-center" transition:fade>
		<svelte:component this={Confetti}/>
	</div>
	<div class="absolute w-full h-full max-h-screen inset-0 flex flex-col items-center justify-center z-2 overflow-scroll">
		<main class="container overflow-scroll mx-auto px-4 py-12 max-w-3xl">
			<slot />
		</main>
		<Footer />
	</div>

</div>

