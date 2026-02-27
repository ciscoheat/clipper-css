<script>
    export let year = new Date().getFullYear();
</script>

<footer class="bg-muted py-12 px-4 border-t border-border">
	<div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-xl">
		<div class="space-y-4">
			<a href="/" class="text-xl font-bold tracking-tight text-primary">
				Cl<span class="text-accent">ipper</span>
			</a>
			<p class="text-sm text-muted-foreground w-64">
				A simple, token-driven Tailwind framework for designing sites without fighting CSS.
			</p>
		</div>

		<div class="space-y-2">
			<h3 class="font-semibold mb-2">Platform</h3>
			<ul class="space-y-2 text-sm text-muted-foreground">
				<li><a href="#" class="hover:text-primary transition-colors">Features</a></li>
				<li><a href="#" class="hover:text-primary transition-colors">Integrations</a></li>
				<li><a href="#" class="hover:text-primary transition-colors">Pricing</a></li>
			</ul>
		</div>

		<div class="space-y-2">
			<h3 class="font-semibold mb-2">Company</h3>
			<ul class="space-y-2 text-sm text-muted-foreground">
				<li><a href="#" class="hover:text-primary transition-colors">About</a></li>
				<li><a href="#" class="hover:text-primary transition-colors">Blog</a></li>
				<li><a href="#" class="hover:text-primary transition-colors">Careers</a></li>
			</ul>
		</div>

		<div class="space-y-2">
			<h3 class="font-semibold mb-2">Legal</h3>
			<ul class="space-y-2 text-sm text-muted-foreground">
				<li><a href="#" class="hover:text-primary transition-colors">Privacy</a></li>
				<li><a href="#" class="hover:text-primary transition-colors">Terms</a></li>
			</ul>
		</div>
	</div>

	<div class="max-w-screen-xl mx-auto pt-8 mt-12 border-t border-border/10 text-center text-sm text-muted-foreground">
		&copy; {year} Clipper. All rights reserved.
	</div>
</footer>
