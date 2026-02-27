<script>
  import { page } from "$app/stores";
</script>

<header class="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
  <div class="max-w-screen-xl mx-auto flex items-center justify-between p-4 h-16">
    <a href="/" class="text-xl font-bold tracking-tight text-primary">
      Cl<span class="text-accent">ipper</span>
    </a>

    <nav class="hidden md:flex gap-base font-medium text-sm">
      <a href="/" class="hover:text-primary transition-colors">Home</a>
      <a href="/about" class="hover:text-primary transition-colors">About</a>
      <a href="/docs" class="hover:text-primary transition-colors">Docs</a>
    </nav>

    <div class="flex items-center gap-xs">
      <a href="/login" class="btn btn-sm btn-ghost">Log in</a>
      <a href="/signup" class="btn btn-sm btn-primary">Sign up</a>
    </div>
  </div>
</header>
