# Working on 3rd Person Creative

## Start here

Read [HANDOFF.md](HANDOFF.md) and [README.md](README.md) before making changes. Check `git status --short` and recent commits; the handoff describes a snapshot, while the working tree is authoritative.

This is a portfolio and contact site for **3rd Person Creative**, adapted from the 3dinterior Astro theme. The designer's direction is replacing the original theme incrementally. The main mock in `design-reference/index.html` is for the **About page**, not the homepage.

## Collaboration preferences

- Work in small, reviewable increments following the user's requested section or component.
- Preserve the user's concurrent edits. Re-read files before editing, especially the About page.
- Do not stage, commit, push, or open a PR unless requested. Do not routinely supply Git staging commands; the user handles Git and asks when changes need grouping.
- When staging commands are requested, keep commit commands separate. Prefer whole-file groups; the user accepts combining related components that share files and does not want elaborate partial-staging patches.
- Match the latest screenshots and corrections when they differ from the original mock. Verify visual changes in a browser; a successful build alone does not prove the layout matches.
- Keep the original theme's credits and documentation below the project-specific README introduction.

## Components, content, and styling

- Shared components live in `src/components/shared/`. The navbar is `Navbar.astro` there, not under `home/`.
- Keep page copy in content entries and presentation in components. The `pages` collection in `src/content.config.ts` validates `src/content/pages/*.md`.
- `src/content/pages/about.md` supplies an ordered `sections` array. `src/pages/about.astro` loads it with `getEntry('pages', 'about')` and switches on each `type` to render the matching component, passing its nested `props` object to that component. Content fields and optional anchor `id` belong inside `props`; theme sections with no editable content may omit it. Supported types: `aboutHero`, `statsRibbon`, `philosophyHistory`, `team`, `process`, and `callout`. Add new types to both the discriminated-union schema and the renderer switch. Keep `id` separate from `type`; it identifies an HTML anchor.
- Render repeating items from arrays through child components, as `ProcessSection.astro` does with `ProcessStep.astro`.
- Callout and process accept `props.colorMode`: `orange`, `light`, or `dark`. Defaults are orange for callout and light for process. Shared palettes in `src/styles/section-colors.css` supply `--section-background`, `--section-text`, `--section-muted`, and `--section-line`; child elements must inherit/use these so dark sections stay readable. These are explicit section choices, independent of the site theme.
- New branded sections use Manrope for headings and DM Sans for body text. `BrandFonts.astro`, included by both head layouts, declares local fonts in `public/fonts/`. Existing theme sections still use Inter; do not migrate them wholesale without a request.
- Designer colors: ink `#20211e`, paper `#f4f3ef`, accent `#ff9f50`, muted text `#686963`, divider `#d4d5cd`.
- Shared brand tokens live in the `@theme` block in `src/styles/global.css`: `--color-brand-{ink,paper,accent,muted,line}`, `--font-heading`, and `--font-body`. Use `var(...)` in component CSS or Tailwind utilities such as `text-brand-ink`, `bg-brand-accent`, and `font-heading`. Keep font family names literal in `@font-face` declarations; those register the fonts rather than choose a styling token.
- Use explicit SVG width/height and constrained flex sizing for arrows. Earlier arrows became oversized when their CSS did not apply. The current nav has one subtle arrow per link, mixed-case text, tight spacing, and no pill button.
- `design-reference/` is ignored by Git. It may be absent on a fresh checkout; ask for the relevant reference if needed rather than inventing its contents.

## Paths and builds

Use Node.js 22.12+ and npm. On the current laptop, Node 22 is available at `/Users/m4laptop/.nvm/versions/node/v22.23.3/bin`; do not assume the default shell uses it or hardcode that machine path into project scripts.

```bash
npm run dev
npm run build
npm run build -- --base=/3rd-person/
node scripts/check-build-paths.mjs /3rd-person/
```

- Dev uses HTTPS via the existing SSL plugin; inspect the actual server URL/status before starting another instance.
- Default builds target `/`; the preview deployment uses `https://www.bobconlon.com/3rd-person/`.
- With the current Cloudflare adapter, root static output is `dist/client/`; the preview build outputs `dist/client/3rd-person/`. Upload that folder's contents into the host's `/3rd-person/` directory.
- Use `withBase()` from `src/utils/paths.ts` for unprefixed root-relative links and public assets. It preserves external URLs, mailto links, and fragments. Do not prefix an already-prefixed URL.
- Shared `Button` and `NavLink` apply the helper internally. Imported assets are handled by Astro/Vite.
- Match the URL-check command to the build: omit its path argument for a root build. It checks generated URLs/assets and navigation; it is not a visual test.
- Keep separate Vite dev/build cache directories configured in `astro.config.mjs`. Building against the old shared cache caused live dev-server 500s.
- Keep the narrowly scoped MDX directive warning filter; do not suppress unrelated build diagnostics.

## Verification and handoff upkeep

For component changes, run the appropriate build and check the relevant page at desktop, tablet, and phone widths, including 320px when practical. Check text wrapping, font loading, SVG sizing, overflow, and keyboard focus. When content schemas change, verify the live dev page as well as the build.

Update `HANDOFF.md` after significant milestones or when asked to wrap up. Record what actually changed, what was verified, remaining issues, and the next likely work. Do not record speculative tasks as completed or assume temporary files/processes survive a restart.
