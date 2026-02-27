<script>
  import Header from "$lib/layouts/Header.svelte";
  import Footer from "$lib/layouts/Footer.svelte";
  import "$lib/clipper/clipper.css";

  export let title = "Clipper Site";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="bg-background text-foreground antialiased min-h-screen flex flex-col">
  <Header />
  <main class="flex-1 w-full max-w-screen-xl mx-auto px-4 py-8">
    <slot />
  </main>
  <Footer />
</div>
