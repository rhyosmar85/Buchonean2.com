# Buchonean2 marketing website

React + TypeScript + Vite, Tailwind CSS, i18next and Cloudflare Workers Static Assets. No deployment has been performed. No DNS or production configuration is changed by any build or test command.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, using `/es/` or `/en/`. Vite development mode is for UI work; production metadata is generated during the build.

```sh
npm run build
npm run preview:cloudflare
```

The Cloudflare preview runs locally at `http://127.0.0.1:8787`. It verifies actual Workers Static Assets redirects, security headers and 404 behavior. `npm run preview` uses Vite's preview server, whose fallback behavior is not the production routing contract.

## Pages and routing

| Page      | Spanish                     | English          |
| --------- | --------------------------- | ---------------- |
| Home      | `/es/`                      | `/en/`           |
| Features  | `/es/funciones/`            | `/en/features/`  |
| Community | `/es/comunidad/`            | `/en/community/` |
| FAQ       | `/es/preguntas-frecuentes/` | `/en/faq/`       |
| Support   | `/es/soporte/`              | `/en/support/`   |

`src/content.ts` is the typed route and copy source. Routing uses native document links and a small path resolver, with no client router dependency. Language switching preserves the equivalent page. Navigation and FAQ disclosures work without JavaScript; React hydrates the mobile menu. i18next is instantiated separately per render so Spanish and English cannot leak between generated pages.

## SEO and static generation

`npm run build` typechecks, bundles the client and server renderer, then generates complete HTML for all ten URLs. Each has a unique title and description, absolute canonical URL, reciprocal ES/EN/x-default alternates, Open Graph/Twitter metadata and WebSite/WebPage structured data. The FAQ page also has FAQPage data matching its visible content; this does not guarantee a search rich result. No ratings, prices, launch dates or app download URLs are fabricated.

`scripts/prerender.mjs` generates `dist/sitemap.xml`, `dist/robots.txt`, localized social JPEGs, the root fallback and three noindex 404 documents. The script adds hashes for its JSON-LD to the generated Content Security Policy. `.prerender/` is a private build intermediate and is never included in the public asset directory.

The canonical origin defaults to `https://buchonean2.com`. Override it at build time if needed:

```sh
SITE_URL=https://preview.example.com SITE_INDEXABLE=false npm run build
```

The default build is indexable for eventual production use. Set `SITE_INDEXABLE=false` for any authorized public preview. Environment settings are read from the build process; `.env.example` is a reference, not automatically loaded by the Node prerender script.

Cloudflare serves `/` as a temporary 302 redirect to `/es/`, normalizes trailing slashes and serves nearest localized 404 files with HTTP 404. There is no SPA fallback that could turn missing pages into 200 responses. `wrangler.jsonc` contains no domain routes and disables workers.dev/preview URLs. There is intentionally no deployment npm script.

## Design and performance

Palomero Premium uses deep emerald, charcoal, restrained metallic accents, self-hosted Barlow Condensed headings and DM Sans body text. The mobile hero places the real pigeon photograph directly after the headline. The official emblem appears in navigation, the hero, community section, footer, favicons and social artwork. There are no invented app screens or illustrations.

Both originals are preserved without alterations in `public/assets/source/`: `palomean2_image1.jpg` and `Buchonean2_logo.png`. `scripts/prepare-assets.mjs` generates responsive 480/768/1024px AVIF and WebP photographs, 64/128/256px WebP logos and PNG favicons. It runs automatically before `npm run dev` and `npm run build`, so deleting `dist/` never deletes source assets. The photo keeps its original framing and color, with localized descriptive alt text and explicit dimensions. The hero image loads eagerly at high priority; secondary images load lazily. All assets and fonts are served locally.

ES/EN remains visible on mobile. Navigation, native FAQ disclosures, keyboard focus, skip link, reduced-motion support and 44px-high navigation controls target WCAG 2.2 AA. Hashed Vite assets retain immutable caching; named image derivatives revalidate after one day. Store badges remain non-interactive and explicitly say Coming soon / Próximamente.

The product positioning and cultural direction follow the redesign brief. Detailed feature specifications, compatibility, release dates, support channels and store links remain unconfirmed and are not fabricated. Publication still requires separate authorization.

## Validation

```sh
npm run typecheck
npm run build
npm test
npx playwright install chromium
npm run test:browser
npm run test:performance
npm run format:check
```

The Node suite checks generated HTML, localized metadata, canonical/hreflang, sitemap entries, internal links, JSON-LD, missing download links, noindex 404s, Cloudflare configuration, CSP and image size budgets. Playwright tests all ten pages on desktop and mobile Chromium with axe WCAG 2.0/2.1/2.2 A/AA scans, verifies switching languages, keyboard FAQ operation, mobile navigation, 320px layout, enlarged text, no-JavaScript content, redirects and HTTP 404s against local Wrangler. Browser reports and screenshots stay local in `test-results/`.

Lab performance is not field Core Web Vitals. Field LCP/INP/CLS require real traffic after a separately authorized launch.

`npm run test:performance` runs mobile Lighthouse against a separate local Cloudflare server, saves ES/EN HTML reports and JSON metrics in `reports/`, and captures desktop/mobile homepage screenshots there. It requires the Chromium installation above.

## Files

- `src/App.tsx`: responsive pages, navigation, store badges, responsive pigeon photography and the official logo.
- `src/content.ts`, `src/i18n.ts`: bilingual copy, route mapping and i18next.
- `src/styles.css`: Tailwind entry and visual system.
- `src/main.tsx`, `src/entry-server.tsx`: hydration and static server rendering.
- `scripts/prerender.mjs`: static documents, SEO and social assets.
- `scripts/prepare-assets.mjs`: repeatable image optimization from the maintained originals.
- `public/`: official brand source assets, optimized image derivatives, favicons, redirects and security/cache header templates.
- `wrangler.jsonc`: Workers Static Assets configuration.
- `tests/`, `playwright.config.ts`: static and browser verification.

Implementation follows Cloudflare's [static site generation and custom 404 documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).
