<script lang="ts">
	import { goto } from '$app/navigation'
</script>
<div class="text-center">

	<h1>404</h1>
	<p>Page not found</p>

	<button
		class="button button--primary mt-6"
		onclick={() => goto( '/' )}
		type="button"
	>
		Go to Home
	</button>
</div>
