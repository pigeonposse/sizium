<script lang="ts">
	import { goto } from '$app/navigation'
</script>
<div class="text-center">
	<div class="my-4">
		<h1 class="text-8xl font-extrabold">404</h1>
		<p class="text-2xl">Page not found</p>
	</div>
	<button
		class="button button--primary mt-4"
		onclick={() => goto( '/' )}
		type="button"
	>
		Go to Home
	</button>
</div>
