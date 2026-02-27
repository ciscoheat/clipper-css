<script lang="ts">
	import variablesCss from '../lib/clipper/variables.css?raw';

	const cardClass = 'min-w-0 rounded-xl border border-border bg-muted p-5';
	const codeBlockClass =
		'min-w-0 max-w-full overflow-x-auto rounded-xl border border-border bg-background p-4 text-sm leading-relaxed text-muted-foreground';
	const swatchClass = 'rounded-xl border bg-muted p-3';
	const swatchChipClass =
		'h-14 w-full rounded-md border border-[color-mix(in_oklch,var(--foreground)_16%,transparent)]';

	const defaultsCards = [
		{
			title: 'Sections are layout containers',
			text: 'Sections already have page-width grid constraints, vertical padding, and row gaps. Usually an id plus semantic content is enough.',
			code: `<section id="hero">\n  <h1>Landing headline</h1>\n  <p class="readable">Long copy stays readable without custom CSS.</p>\n</section>`
		},
		{
			title: 'Divs are modern by default',
			text: 'In Clipper, div/nav/article/figure are flex-column with tokenized spacing. Add a .row class when you need horizontal layout.',
			code: `<div>\n  <h3>No flex classes needed</h3>\n  <p>Children stack with preset spacing.</p>\n</div>\n\n<div class="row">\n  <a href="#">Primary</a>\n  <a href="#">Secondary</a>\n</div>`
		},
		{
			title: 'Typography is predefined',
			text: 'Heading scale and heading font is fluent. Body font and text wrapping are configured in tokens + base rules.',
			code: `<h1>Display headline from theme scale</h1>\n<h2>Section title with heading font</h2>\n<p>Paragraph text uses global body font and pretty wrapping.</p>`
		},
		{
			title: 'Anchors are pre-styled',
			text: 'Plain <a> tags are styled from tokens in clipper base styles. Underline is controlled by --link-underline and --link-underline-hover.',
			code: `/* variables.css */\n:root {\n  --link-underline: none;\n  --link-underline-hover: underline;\n}\n\n<p>Read the <a href="#starter">starter snippet</a> and <a href="#colors">token palette</a>.</p>`
		}
	];

	const createSpacingExample = (level: string) => ({
		title: level,
		className: level,
		code: `<div class="${level}">\n  <span>Item</span>\n  <span>Item</span>\n  <span>Item</span>\n</div>`
	});

	const spacingLevels = [
		'gap-4xs',
		'gap-3xs',
		'gap-2xs',
		'gap-xs',
		'gap-sm',
		'gap-base',
		'gap-lg',
		'gap-xl',
		'gap-2xl',
		'gap-3xl',
		'gap-4xl'
	] as const;
	const gapExamples = spacingLevels.map((level) => createSpacingExample(level));

	const leanComparison = {
		Clipper: `<section id="feature">\n  <h2>Built with Clipper defaults</h2>\n  <div>\n    <p>Layout and rhythm come from base rules.</p>\n    <a href="#">Action</a>\n  </div>\n</section>`,
		utilityHeavy: `<section id="feature" class="mx-auto max-w-6xl px-6 py-20">\n  <h2 class="text-4xl font-bold leading-tight tracking-tight">Built manually</h2>\n  <div class="mt-4 flex flex-col gap-4">\n    <p class="max-w-prose text-base leading-7 text-slate-600">Layout and rhythm configured inline.</p>\n    <a class="text-blue-600 hover:text-blue-700" href="#">Action</a>\n  </div>\n</section>`
	};

	const quickCopySnippet = `---\nimport Body from "../layouts/Body.astro";\n---\n\n<Body title="My Page">\n  <section id="intro">\n    <h1>Hello Clipper</h1>\n    <p class="readable">Start semantic, then add only the few utilities you really need.</p>\n    <div class="row">\n      <a href="#">Primary action</a>\n      <a href="#">Secondary action</a>\n    </div>\n  </section>\n</Body>`;

	const tokenRegex = /--(primary|secondary)-(\d+)\s*:\s*([^;]+);/g;
	const palette = {
		primary: [] as Array<{ name: string; shade: number; value: string }>,
		secondary: [] as Array<{ name: string; shade: number; value: string }>
	};
	const componentSnippet = `<article class="card">\n  <span class="badge">New</span>\n  <h3>Reusable primitives</h3>\n  <p>Use .card, .badge, and .btn for common UI patterns.</p>\n  <div class="row">\n    <a href="#" class="btn">Primary action</a>\n    <a href="#" class="btn btn-outline">Secondary action</a>\n  </div>\n</article>`;

	for (const match of variablesCss.matchAll(tokenRegex)) {
		const family = match[1] as 'primary' | 'secondary';
		const shade = Number(match[2]);
		const value = match[3].trim();

		palette[family].push({
			name: `--${family}-${shade}`,
			shade,
			value
		});
	}

	palette.primary.sort((left, right) => left.shade - right.shade);
	palette.secondary.sort((left, right) => left.shade - right.shade);

	const paletteGroups = [
		{
			title: 'Primary scale',
			ariaLabel: 'Primary color scale',
			tokens: palette.primary
		},
		{
			title: 'Secondary scale',
			ariaLabel: 'Secondary color scale',
			tokens: palette.secondary
		}
	].filter((group) => group.tokens.length > 0);
</script>

<section class="bg-muted" id="overview">
	<div class="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
		Clipper demo
	</div>
	<div class="readable">
		<h1>How to use Clipper</h1>
		<p>
			Clipper is a simple tailwind-based framework for building pages fast without fighting CSS and
			adding too many utility classes. It is designed for designers and developers alike: semantic
			markup by default, token-driven styling, and just enough utilities to stay productive.
		</p>
		<p>
			The basic page is just semantic HTML (header, footer, main) with <code>&lt;section&gt;</code> containers
			inside.
		</p>
	</div>
	<div class="bg-primary-muted py-xs">
		As default, elements directly below sections will respect the page max width (with a margin for
		smaller screens).
	</div>
	<div class="full-width bg-primary-muted py-xs">
		<span class="page-width">
			But breaking out of a layout is no problem with the <code>.full-width</code> class. And just
			add <code>.page-width</code> on the child element to constrain it back to the page width.
		</span>
	</div>
	<p class="readable">
		Elements can have a <code>.readable</code> utility class applied, which sets a max-width for easier
		reading without needing a custom class or wrapper.
	</p>
</section>
<section id="defaults">
	<div class="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
		Built-in behavior
	</div>
	<h2>What Clipper gives you out of the box</h2>
	<div class="grid md:grid-cols-2">
		{#each defaultsCards as card (card.title)}
			<article class={cardClass}>
				<h3>{card.title}</h3>
				<p>{card.text}</p>
				<pre class={codeBlockClass}><code>{card.code}</code></pre>
			</article>
		{/each}
	</div>
	<p class="readable">
		Example: plain style <a href="#starter">Starter</a> and <a href="#colors">Color demo</a>; set
		link underline behavior globally in <code>variables.css</code>.
	</p>

	<h3>Spacing utilities</h3>
	<p class="readable">
		Clipper includes spacing utilities (<code>gap-4xs</code> through <code>gap-4xl</code>) that
		apply consistent spacing containers. They work on sections and regular elements, making it easy
		to control vertical and horizontal rhythm.
	</p>

	<p class="readable">
		The default spacing for non-section elements is the <code>base</code> level, which is tokenized
		as <code>var(--spacing-base)</code>. This means you can adjust the global spacing rhythm by
		changing a single token value.
	</p>

	<p class="readable">
		What makes this system powerful is that <strong>every spacing token is fluid</strong>. Using CSS
		<code>clamp()</code>, spacing scales smoothly from mobile to desktop. Change viewport width by
		100px and spacing adjusts seamlessly — no breakpoints needed. The entire rhythm system breathes
		with the content, maintaining visual harmony at every size.
	</p>

	<div>
		<h4>All spacing scales</h4>
		<div class="grid md:grid-cols-4">
			{#each gapExamples as example (example.title)}
				<article class={cardClass}>
					<h5>{example.title}</h5>
					<div class={example.className}>
						<span class="card bg-background text-xs">Item</span>
						<span class="card bg-background text-xs">Item</span>
						<span class="card bg-background text-xs">Item</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="lean">
	<div class="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
		Less Tailwind clutter
	</div>
	<h2>Same intent with fewer classes</h2>
	<p class="readable">
		Because Clipper already handles section width, spacing rhythm, flex stacking, and typography
		defaults, most sections require only semantic HTML plus a few targeted utilities.
	</p>
	<div class="grid gap-4 md:grid-cols-2">
		<article class={cardClass}>
			<h3>Clipper-first markup</h3>
			<pre class={codeBlockClass}><code>{leanComparison.Clipper}</code></pre>
		</article>
		<article class={cardClass}>
			<h3>Utility-heavy equivalent</h3>
			<pre class={codeBlockClass}><code>{leanComparison.utilityHeavy}</code></pre>
		</article>
	</div>
</section>

<section id="components">
	<div class="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
		Reusable components
	</div>
	<h2>Component primitives in action</h2>
	<p class="readable">
		Clipper includes three generic reusable primitives in <code>components.css</code>:
		<code>.btn</code>, <code>.card</code>, and <code>.badge</code>, compatible with dark mode,
		purely for "getting started" convenience. They can be replaced by any UI framework or custom
		styles.
	</p>

	<div class="grid gap-4 md:grid-cols-2">
		<article class="card">
			<span class="badge">New</span>
			<h3>Card + badge</h3>
			<p>Cards provide a consistent container style, while badges highlight metadata or state.</p>
			<div class="row">
				<a href="#starter" class="btn btn-inline">View starter</a>
			</div>
		</article>

		<article class="card">
			<h3>Button primitive</h3>
			<p>The button style keeps typography, color, hover, and focus states consistent.</p>
			<div class="row flex-wrap">
				<a href="#" class="btn">Primary action</a>
				<a href="#" class="btn btn-outline">Secondary action</a>
				<span class="badge">Accessible focus</span>
			</div>
		</article>
	</div>

	<pre class={codeBlockClass}><code>{componentSnippet}</code></pre>
</section>

<section id="colors">
	<div class="font-heading text-sm font-semibold tracking-wide text-primary uppercase">
		Color demo
	</div>
	<h2>Token-driven color scales</h2>
	<p class="readable">
		All colors can be easily configured with <code>variables.css</code>, with <i>easy-to-use</i> support
		for dark mode.
	</p>
	<h3>Color tokens parsed from variables.css</h3>
	{#each paletteGroups as group (group.title)}
		<div>
			<h4>{group.title}</h4>
			<div
				class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3"
				role="list"
				aria-label={group.ariaLabel}
			>
				{#each group.tokens as token (token.name)}
					<article class={swatchClass} role="listitem">
						<div
							class={swatchChipClass}
							style={`background-color: var(${token.name});`}
							aria-hidden="true"
						></div>
						<div class="mt-2 text-sm text-muted-foreground">
							<span class="whitespace-nowrap">{token.name}</span>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/each}
</section>

<section id="starter">
	<div class="font-heading text-sm font-semibold tracking-wide text-primary uppercase">Starter</div>
	<h2>Copy this minimal page pattern</h2>
	<pre class={codeBlockClass}><code>{quickCopySnippet}</code></pre>
</section>
