<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let { children } = $props();

	const headerLinks = [
		{ href: '#overview', label: 'Overview' },
		{ href: '#defaults', label: 'Defaults' },
		{ href: '#lean', label: 'Less Classes' },
		{ href: '#components', label: 'Components' },
		{ href: '#colors', label: 'Colors' },
		{ href: '#starter', label: 'Starter' }
	];
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
		rel="stylesheet"
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<header
	class="header-sticky border-b [background:color-mix(in_oklch,var(--background)_88%,transparent)]"
>
	<div class="row flex-wrap items-center justify-between py-4">
		<a
			href="#"
			class="font-heading text-2xl font-bold text-foreground no-underline"
			aria-label="Clipper home">Clipper ⛵</a
		>

		<nav aria-label="Primary" class="order-3 basis-full sm:order-2 sm:basis-auto">
			<ul class="m-0 row list-none flex-wrap p-0 whitespace-nowrap sm:gap-4">
				{#each headerLinks as link (link.href)}
					<li>
						<a href={link.href} class="text-muted-foreground no-underline hover:text-foreground">
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="order-2 sm:order-3">
			<ThemeToggle />
		</div>
	</div>
</header>
<main>
	{@render children()}
</main>
<footer class="border-t bg-foreground py-base text-muted-foreground">
	<div class="row justify-between">
		<p>Built with Clipper primitives and token-driven theme scales.</p>
		<p>Enjoy the simplicity!</p>
	</div>
</footer>
