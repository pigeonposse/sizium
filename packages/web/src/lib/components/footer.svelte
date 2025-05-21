<script lang="ts">

	import {
		BookOpen,
		Github,
		Heart,
	} from 'lucide-svelte'

</script>

<footer class="py-8 mt-12">
	<div class="container mx-auto px-4 flex flex-col items-center">
		<div class="flex items-center space-x-4 mb-4">
			<a
				href={MAIN_PKG.repository.url}
				rel="noopener noreferrer"
				target="_blank"
				title="repository"
			>
				<Github class="w-6 h-6" />
			</a>
			<a
				href={MAIN_PKG.extra.docsURL}
				rel="noopener noreferrer"
				target="_blank"
				title="documentation"
			>
				<BookOpen class="w-6 h-6" />
			</a>
			<a
				class="animate-heartbeat transition-transform duration-300"
				href={MAIN_PKG.funding.url}
				rel="noopener noreferrer"
				target="_blank"
				title="Donate"
			>
				<Heart class="w-6 h-6" />
			</a>
		</div>
		<p class="text-sm pb-3">
			© {new Date().getFullYear()} <a
				href="{MAIN_PKG.extra.collective.web}"
				target="_blank"
			>{MAIN_PKG.extra.collective.name}</a>.
		</p>
		<span class="opacity-60 dark:opacity-30">
			v{PKG.version}
		</span>
	</div>
</footer>

<style>
	@keyframes heartbeat {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}

	.animate-heartbeat:hover {
		animation: heartbeat 1s ease-in-out infinite;
	}
</style>
