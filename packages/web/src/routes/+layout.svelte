<script lang="ts">

	import {
		MetaTags,
		deepMerge,
	} from '@svaio/meta/svelte'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { pwaAssetsHead } from 'virtual:pwa-assets/head'
	import { pwaInfo } from 'virtual:pwa-info'

	import '../styles'
	import { page } from '$app/state'

	import { Confetti } from '$components'
	import {
		DOCUMENTATION_ICON,
		DONATE_ICON,
		GITHUB_ICON,
	} from '$icons'

	let { children } = $props()

	onMount( () => console.log( LOGO_ASCII ) )

</script>

<svelte:head>
	{@html pwaInfo ? pwaInfo.webManifest.linkTag : ''}
	{#if pwaAssetsHead.themeColor}
		<meta
			name="theme-color"
			content={pwaAssetsHead.themeColor.content}
		/>
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
</svelte:head>

{#snippet footerLink( href: string, label: string, klass?: string[] )}
	<a
		class={[ ...klass || [], 'footer--link' ]}
		aria-label={label}
		href={href}
		rel="noopener noreferrer"
		target="_blank"
		title={label}
	>
	</a>
{/snippet}

<MetaTags {...deepMerge( page.data.metaAll, page.data.meta )} />

<section
	class="section--bg"
	transition:fade
>
	<Confetti />
</section>

<main class="section--main">
	<header class="header">
		<img
			class="header--img"
			alt="Sizium logo"
			height="80"
			src="/favicon.png"
			width="80"
		>
		<h1 class="header--title">{MAIN_PKG.extra.productName.toUpperCase()}</h1>
		<p class="header--subtitle">Find the true size of any <strong><a
			href="https://www.npmjs.com/"
			target="_blank"
		>npm</a></strong> <i>package</i></p>
	</header>

	<article class="article">
		{@render children()}
	</article>

	<footer class="footer">
		<div class="footer--links">
			{@render footerLink( MAIN_PKG.repository.url, 'Repository', [ GITHUB_ICON ] )}
			{@render footerLink( MAIN_PKG.extra.docsURL, 'Documentation', [ DOCUMENTATION_ICON ] )}
			{@render footerLink( MAIN_PKG.funding.url, 'Donate', [ DONATE_ICON, 'animate-heartbeat transition-transform duration-300' ] )}
		</div>
		<p class="footer--copy">
			© {new Date().getFullYear()}
			<a
				href={MAIN_PKG.extra.collective.web}
				target="_blank"
			>{MAIN_PKG.extra.collective.name}</a>
		</p>
		<span class="footer--version">
			v{PKG.version}
		</span>
	</footer>
</main>

