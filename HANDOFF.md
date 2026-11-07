# Codex handoff — 3rd Person Creative

## Current checkpoint

Homepage renders the shared Callout after Hero using `layout: quotes` and the user's light background. `src/content/pages/home.md` contains the Kendra Gillette and Tracy Doren testimonials as `props.quotes` (quote, name, role, organization). Callout defaults to its existing standard headline/link layout, preserving About; the schema validates both shapes. QuoteCarousel provides subtle side chevrons, wraparound, focused arrow-key controls, stable height, hidden-slide accessibility state, and reduced-motion support; no autoplay. Root build and built-site Chrome checks at 1440, 768, 375, 320px passed; desktop/phone screenshots reviewed. Dev server was unreachable during verification.

Latest content updates: Sara uses `src/assets/img/people/SARA_Headshot.jpg` with alt text “Portrait of Sara Gorr”; the production build verified the optimized image. All ten demo blog entries have been removed; `.gitkeep` retains `src/content/blog/` for future posts. The collection schema remains ready for Markdown/MDX entries.

Reviewed November 5, 2026, after merge commit `6ebec7c` (PR #8, SEO updates). The working tree was clean before this handoff refresh. Always recheck Git: this is a checkpoint, not live state. This document describes the current implementation; earlier experiments are available in Git history.

Read `AGENTS.md` and the project-specific portion of `README.md` before changing code. This is an Astro portfolio/contact site adapted from the 3dinterior theme, not a React app. The designer's main mock is for About, not Home. Local references live in ignored `design-reference/`; they may be absent on a fresh checkout.

## User preferences

- Work in small increments matching the requested section; preserve concurrent edits.
- The user handles staging, commits, and PRs. Supply grouped whole-file `git add` commands, commit messages, and bullets only when requested. Keep commit commands separate from staging commands. Do not execute Git mutations without explicit authorization.
- Both production-root and client-preview subfolder deployments are required. A request to inspect production output without `--base` was not a standing restriction against preview builds.
- Keep content data driven, use shared brand styles, and verify layout in a browser when changing visuals.
- Do not restore theme demo pages or standalone case studies without a request.

## Published pages and source map

There are exactly four HTML routes: `/`, `/about/`, `/projects/`, and `/contact/`.

| Area | Current implementation |
| --- | --- |
| Home | `src/pages/index.astro` renders the photographic Hero followed by the shared Callout, with shared Navbar and Footer. `src/components/home/Hero.astro` uses `3rdpc_Landing.jpg`, a mobile image, and the foreground SVG logo. SelectedWorks and Approach are not rendered. |
| About | `src/content/pages/about.md` supplies ordered `sections`: pageIntro, services, process, people, callout. `src/pages/about.astro` switches on `type` and passes nested `props`. `src/content.config.ts` validates content. |
| Projects | `src/data/projects.ts` holds all six projects, thumbnail assets, supplied copy, and ordered `teaser.images`. Components live under `src/components/projects/`; preview styles are in `src/styles/project-teaser.css`. |
| Contact | `src/data/contact.ts` holds copy, project types, and real email contacts. `src/pages/contact.astro` uses the adapted contact components and `src/styles/contact.css`. |
| Navigation | `src/components/shared/Navbar.astro` uses `3rd-person-nav-logo-blk.svg` and base-aware Projects, About, and Let's talk (`/contact/`) links. Desktop/mobile share link data. |
| Footer | Shared Footer uses `src/data/footer.ts`: copyright, Instagram, and tagline. Year updates at build time. |

### Projects

Six galleries: Place Branding (5 images), Packaging (4), Identity (5), Event Branding (2), Illustration (4), Digital (8). Digital Experiences uses `ggg-logo.jpg` as its card thumbnail. Its gallery contains four Badass Women in Wine screenshots followed by four Gotta Getta Gig screenshots, including the artist profile. Thumbnails (`image`) and gallery arrays (`teaser.images`) are independent. Optional per-image `caption` and `href` render below the image, with a right-aligned Visit website link opening in a new tab; blank fields produce no empty elements. Cards use a uniform 12:7 crop, and the Projects heading uses Manrope. The grid has no filter row or card-level case-study links. Load More appears only above nine projects; further pagination work is deferred. Expanded image viewing is implemented in the same dialog, using `src/scripts/image-viewer.ts`. A magnifying-glass icon on each preview image switches to the dark full-viewport viewer with left-aligned Fit/zoom controls, drag/pinch panning, and previous/next controls. The upper-right X or Escape restores the current preview slide and image-button focus. Zoom resets between images and on resize. Larger assets are generated up to 2400px wide and loaded on demand. On November 6, 2026, the root build and Chrome checks passed for all 28 images across six galleries at 1440, 768, 375, and 320px, including the artist profile image, zoom/reset, navigation, overflow, and focus restoration. Desktop/phone screenshots were reviewed. Chrome touch emulation verified pinch zoom, panning, and Escape; physical mobile devices have not been checked.

Projects may provide an optional `teaser.clients` string array; nonblank names render as a Clients list below the description. Packaging contains the four supplied clients. Root build and browser checks at 1440, 768, 375, and 320px passed for list order, conditional rendering, and wrapping.

`ProjectTeaser.astro` opens a native dialog from each card. It supports previous/next, arrow keys, Escape, close/backdrop click, scroll lock, and focus restoration. Every popup has a Let's Talk link to Contact. SVG gallery images use ordinary `img` elements to avoid an Astro dev image-decoding issue; raster assets use Astro Image.

Both standalone case-study routes were removed, along with HeroCarousel, CaseStudyLink, and caseStudy/caseStudyHref fields. Keep the popup/carousel approach.

### Contact behavior

Send inquiry validates required name, email, and message; project type is optional. It opens a URI-encoded mailto draft to `hello@3rdpersoncreative.com` containing all fields. The visitor must send it from their email app. There is no backend, form service, or automatic email delivery. Fields remain populated, and direct email links provide a fallback. The form is enabled, not a disabled mock.

### About and styling

Repeat items use `props.subsections`; rendering uses an explicit switch to preserve TypeScript narrowing. A shared generic section renderer was discussed but deferred. Legacy About types remain registered, but the current content does not select them.

People shows one current portrait each for Matthew Jervis and Sara Gorr, with email links. The schema permits one or two photos and optional validated email. Earlier childhood pictures are not rendered.

Use `.site-content` (or Container size="brand") for shared content alignment: 1380px maximum, 91% width, and 20px gutters at 450px and below. Full-width section backgrounds use `colorMode`: white, light (cream), orange, or dark. See `src/types/section.ts`, `src/styles/section-colors.css`, and the tokens in `src/styles/global.css`.

Brand headings use Manrope; body uses DM Sans. Local WOFF2 files and licenses are in `public/fonts/`, registered by BrandFonts. Source TTFs remain in `src/assets/fonts/source/`. Some retained theme components use Inter. Preserve explicit SVG sizing, especially arrows. The mobile nav uses three lines with the middle disappearing when opened; the outer lines form an X.

## Production and preview builds

Node 22.12+ and npm are required. On this laptop Node 22 is available at `/Users/m4laptop/.nvm/versions/node/v22.23.3/bin`; don't hardcode that path in project scripts.

Production origin is **https://www.3rdpersoncreative.com** (HTTPS with www).

```bash
npm run build
```

Production output is `dist/client/`. Upload its contents, including hidden `.htaccess`, to the domain root.

Client preview:

```bash
npm run build -- --base=/3rd-person/ --site=https://www.bobconlon.com
```

Preview output is `dist/client/3rd-person/`; upload its contents to the host's `/3rd-person/` folder. `--base` handles path prefixes; `--site` handles the origin for metadata/sitemaps. A production-output check must use the normal root build, not a preview build.

Keep `withBase()` from `src/utils/paths.ts` on unprefixed root-relative navigation and public assets. Imported assets are handled by Astro. Do not prefix already-prefixed URLs. BaseHead is unrelated to this helper.

## SEO and deployment

- `src/consts.ts` defines the branded default title and description derived from About copy.
- Active pages use `src/layouts/Layout.astro` for head metadata. `src/components/BaseHead.astro` is retained for BlogLayout but no published route currently uses it. Both contain canonical, Open Graph/Twitter, and shared OrganizationSchema metadata.
- `src/components/shared/OrganizationSchema.astro` includes name, description, website, SVG logo, email, and Instagram. Values derive from shared site/contact/footer data.
- The default sharing image is `3rdpc_Landing.jpg`, generated with `getImage` as a 1200px JPG. Its hashed name can change; verify the exact metadata URL against `dist/client/_astro/` rather than expecting a fixed filename. Passing the raw imported image URL previously failed to emit the JPG asset.
- `@astrojs/sitemap` generates `sitemap-index.xml` and `sitemap-0.xml`. `src/pages/robots.txt.ts` generates robots.txt with a sitemap reference. The sitemap currently has the four published routes.
- `public/.htaccess` redirects production HTTP/non-www requests to HTTPS/www, preserving path/query. It only matches the production hosts and leaves bobconlon.com previews alone. Apache must support mod_rewrite and .htaccess overrides; Astro dev and Cloudflare do not execute these rules.
- robots.txt is a domain-root policy. A file inside `/3rd-person/` does not control preview crawling; that belongs to bobconlon.com's root robots.txt.
- Blog, Privacy, Terms, and standalone case-study routes are removed from the build, not just filtered out of the sitemap. Supporting blog/legal components remain for future use; demo blog entries have been deleted and src/content/blog/.gitkeep preserves the empty folder. The stale RSS discovery link was removed.
- If deploying over older uploads, remove old `blog/`, `privacy/`, `terms/`, and the two old case-study directories from the host. Uploading new files alone does not remove stale remote pages.

## Verification and remaining follow-ups

Last application verification (before this docs-only refresh): normal production build passed, generated exactly four HTML pages, and produced four matching HTTPS/www root sitemap URLs. Confirmed robots sitemap reference, emitted sharing-image asset, and copied .htaccess. No blog, legal, or case-study output remained.

Earlier browser checks at 1440, 768, 375, and 320px covered project dialogs/galleries, mobile navigation, contact layout, and form validation/URI encoding. Mailto launching was intercepted during automated checks; the user subsequently confirmed it worked. No test email was sent by the assistant. Temporary scripts/screenshots lived in `/tmp`; do not assume they survive a restart. Use actual viewport emulation for narrow Chrome checks; `--window-size` alone may not produce a 320px CSS viewport.

Known follow-ups:

- Apache redirects need verification on the actual hosting environment. No deployment is implied by a successful local build.
- `scripts/check-build-paths.mjs` is stale: its navigation assertions still expect the removed blog route and Approach/Services/People homepage links. Update those assertions before relying on its full result. Earlier historical passes do not establish that the current checker passes.
- Legacy unrendered theme components retain demo copy/alt text; several image imports now point to the landing photograph as a placeholder. Review before reusing them.
- Consolidating Layout and BaseHead metadata, a generic section renderer, and a committed unit/E2E suite were discussed but are not implemented or currently requested.

## Git hooks

Husky is installed as a dev dependency. The `prepare` script activates `.husky/_` as the Git hooks path. `.husky/pre-commit` blocks commits on `main` with an instruction to switch to a feature branch. Per user preference, this is a branch guard only; no lint or test scripts were added. Verified the guard in a temporary repository: main exits 1; a feature branch exits 0. No project commits were created.

## Dev-server recovery and resume checklist

Dev uses HTTPS through the existing SSL plugin. Check the actual running server/status before starting another; don't assume a saved PID or localhost URL is current.

Keep the separate Vite caches (`.vite-dev` and `.vite-build`) in astro.config.mjs. A shared cache previously caused live-server 500s after builds. Content-schema changes have also required dev restarts. Diagnose these separately rather than deleting page sections or blindly excluding astro:content from optimization. Keep the narrowly scoped MDX directive warning filter.

On resume:

1. Read AGENTS.md, this handoff, and the project-specific README.
2. Check `git status --short` and recent commits; preserve any user edits.
3. Confirm the current request and deployment target before choosing build flags.
4. Inspect source and the actual dev server; do not rely on temporary artifacts or old state.
5. Make the requested change, verify appropriately, and update this current-state handoff without appending contradictory historical snapshots.
