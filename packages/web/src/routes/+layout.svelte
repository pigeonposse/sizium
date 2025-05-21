<script lang="ts">
	import { fade } from 'svelte/transition'

	import '../app.css'
	import Confetti from '$lib/components/confetti.svelte'
	// TODO: Arreglar version blanca
	import Footer from '$lib/components/footer.svelte'
</script>

<div
	class="fixed w-full h-full inset-0 blur-[10px] flex flex-col items-center justify-center"
	transition:fade
>
	<svelte:component this={Confetti} />
</div>

<div class="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-12 z-2 overflow-y-auto">

	<main class="container mx-auto max-w-3xl">
		<slot />
	</main>
	<Footer />

</div>

