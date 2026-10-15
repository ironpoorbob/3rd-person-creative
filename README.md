# 3rd Person Creative

A portfolio website for **3rd Person Creative**—a place to showcase the group's work, introduce the people behind it, and help prospective clients get in touch.

The site is being adapted from the **3dinterior Astro theme** to reflect 3rd Person Creative's identity and the designer's evolving direction. The original theme provides the foundation; its layouts, typography, and components are being updated to suit the new design.

## Current development

- A custom homepage hero with separate desktop and mobile images and an SVG logo.
- Shared navigation featuring the 3rd Person Creative wordmark and contact links.
- An About page being developed from the designer's mock, with reusable, responsive callout and process components.
- Page content stored in `src/content/pages/`, keeping copy and process steps separate from component layout and styling.
- Support for deployment at the site root or under a configurable subfolder.

Local designer references are kept in `design-reference/`, which is excluded from Git.

## Editing About page sections

Edit `src/content/pages/about.md`. Its `sections` array controls what appears on the page and in what order. Each entry has a `type`: `pageIntro`, `aboutHero`, `statsRibbon`, `philosophyHistory`, `team`, `services`, `process`, `people`, or `callout`.

Move an entire entry to reorder it, remove it to hide that section, or add another entry to repeat a component with different content. The `pageIntro`, `services`, `process`, `people`, and `callout` entries contain their copy inside a nested `props` object; the original theme sections still keep their copy inside their components. An optional `props.id` on a process or callout section supplies an HTML anchor, not the component type. Use unique IDs when repeating sections.

```yaml
sections:
  - type: aboutHero
  - type: callout
    props:
      eyebrow: "Have something in mind?"
      headline: "Your Story, Our Mission."
      subheadline: "New idea. Growing business. Fresh perspective. Let's talk."
      linkText: "Start a conversation"
      href: "mailto:hello@3rdpersoncreative.com"
```

Theme sections without editable content can omit `props`. For a process component, its numbered items are in `props.subsections`; this is separate from the top-level `sections` array that orders the page components.

Page intro, services, people, callout, and process sections accept an optional `colorMode` inside `props`:

- `white`: pure white background with dark text.
- `orange`: brand orange background with dark text.
- `light`: brand paper background with dark text.
- `dark`: brand ink background with light text.

Callout defaults to `orange`; process and page intro default to `light`. For example, add `colorMode: dark` alongside `headline` inside a section's `props`, or pass `colorMode="dark"` when using the component directly. The schema validates these four values. The allowed values and shared `SectionColorProps` interface live in `src/types/section.ts`, imported by components and content validation. Palettes live in `src/styles/section-colors.css` and use the shared brand tokens; text, rules, arrows, and link focus outlines adapt together.

`pageIntro` is the two-column page introduction with an H1. Use it once at the start of a page. Its `headline` supports YAML line breaks; optional `headlineEmphasis` adds an italic ending. `subheadline` and `description` supply the two paragraphs, while `tagline` and the `services` array form the bottom sequence. `linkText` and `href` control the link. About links to the Services section at `#services`.

`services` renders a section heading and a `props.subsections` array of practice columns. Each column has `headline`, `tagline`, `description`, and a `services` list. Columns stack at 800px and below; the section defaults to `light`.

`people` renders `props.subsections` as profiles with `name`, `role`, `biography`, and exactly two `photos` (each with `src` and `alt`). Photo paths in About content are relative to `about.md`, pointing into `src/assets/img/people/`; Astro validates and optimizes them. Profiles stack below 751px. The default color mode is `light`.

Supported types and required fields are validated in `src/content.config.ts`. New component types must also be handled in the renderer switch in `src/pages/about.astro` before they can be used in content.

## Development and builds

Use Node.js **22.12 or newer**.

```bash
npm install
npm run dev
```

Build for the site root:

```bash
npm run build
```

Build for the current preview location, `https://www.bobconlon.com/3rd-person/`:

```bash
npm run build -- --base=/3rd-person/
```

Upload the contents of `dist/client/3rd-person/` into the host's `/3rd-person/` folder. Root builds output the site to `dist/client/`.

<br />

---

## Original theme documentation

The documentation below describes the original **3dinterior** theme, including its features, customization guidance, credits, and license. Some descriptions reflect the starting theme rather than the current 3rd Person Creative site.

---

<br />

# 🌆 3dinterior

<img src="./public/img/lighthouse-v-score.png" align="right"
     alt="100/100 Performance Score" width="230" height="245">

**Free Astro theme built for architects and design studios.** Blazing-fast performance meets stunning minimalist design.

<p align="center">
  <a href="https://astro.build">
    <img src="https://img.shields.io/badge/Astro-7.0-FF5D01?logo=astro&logoColor=white&style=for-the-badge" alt="Astro v7" />
  </a>
  <a href="https://tailwindcss.com">
    <img src="https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge" alt="Tailwind CSS v4" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" />
  </a>
</p>

## 📌 Key Features

- ✅ **100/100 Lighthouse score** - Optimized for performance
- ✅ **Portfolio-first design** - Showcase projects beautifully
- ✅ **Mobile-responsive** - Target different devices
- ✅ **Zero JavaScript** (optional) - Fast by default
- ✅ **Easy customization** - Tailwind + clean components

![3dinterior Theme Screenshot](./public/img/mac-3dinterior-preview.png)

---

## 🚀 Quick Start
```bash
# Clone and install
git clone https://github.com/nearmelab/3dinterior.git
cd 3dinterior
pnpm install

# Start dev server
pnpm dev
```

Visit `localhost:4321` - that's it! 🧑‍🚀

## Building for a subfolder

Use Node.js 22.12 or newer. The build defaults to the site root:

```bash
npm run build
```

To serve the site at `https://example.com/designer-preview/`, pass Astro's base flag:

```bash
npm run build -- --base=/designer-preview/
```

With the current Cloudflare adapter, the static files are written to
`dist/client/designer-preview/`. Copy that directory's contents into the
`designer-preview` folder on your host. Root builds write the site to `dist/client/`.
The base flag controls the URL path, not the domain.

For local development with the same path:

```bash
npm run dev -- --base=/designer-preview/
```

Open `/designer-preview/` on the local dev server. Omit `--base` to return to `/`.

When adding pages, use `withBase('/about')` from `src/utils/paths.ts` for internal
links and public asset URLs. Shared `Button` and `NavLink` components apply it
automatically, so pass them unprefixed paths. Import images from `src/assets/`; Astro handles their base path,
along with bundled CSS, scripts, and CSS `url()` references. External URLs and
fragment links such as `#contact` do not need a base path.

After either build, check its generated URLs with
`node scripts/check-build-paths.mjs` (root) or
`node scripts/check-build-paths.mjs /designer-preview/` (subfolder).

---

## 🎨 Customization

**Colors & Fonts:**
Edit `src/styles/global.css`

**Content:**
- Images: Replace in `src/assets/img/`
- Contact: Edit `src/pages/contact.astro`

**Components:**
All components in `src/components/` use standard Astro + Tailwind

---

## 📸 Image Credits

All images are sourced from [Pexels](https://pexels.com) and are free to use under the Pexels License.

For full attribution details, see **[src/assets/attribution.md](./src/assets/attribution.md)**.

---

## 🤝 Contributing

Found a bug? Want to improve something? PRs welcome!

1. Fork the repo
2. Create your branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

**Free to use for personal and commercial projects.**

---

## ⭐ Show Your Support

If you found this theme helpful, give it a star on GitHub!

Designed from 🫀 by [Nearmelab](https://nearmelab.digital)

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/medium.svg)](https://astro.build)
