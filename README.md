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

The visual system takes its greens from the official logo (loft-green tile, leaf wing, off-white "B") on a cool limewash paper, with deep pine bands reserved for the community section, availability and footer. Typography is one self-hosted family, Archivo (variable weight and width): semi-condensed sentence-case headlines, normal-width body. The pigeon ring (anilla) is the one recurring motif: list bullets and the "planned" status are open rings. Tokens and rationale are at the top of `src/styles.css`.

The homepage opens with the approved buchón photograph and a real app screen, then indexes all twelve app modules, presents them in six groups (each with a real app screen, photography or the care list), states current availability honestly, and ends with FAQ and store availability. The Features page details every module with its status (In development / Planned) and a planned-work list. The Community page covers public lofts, opt-in visibility, approximate location, public captures, local rankings, nearby stores and listings.

Product claims come from the Buchonean2 app repository (`docs/`, localization files and feature modules). Every module exists in the app source and is described as "in development"; nothing is presented as released. The iPhone app is described as in internal testing and Android as planned. Prices, ratings, launch dates and download URLs are not published.

Maintained originals live in `public/assets/source/` and are never modified:

- `Buchonean2_logo.png`, `palomean2_image1.jpg` (original site assets)
- `buchonean2_buchon.png`, byte-identical to the app's approved sign-in photograph (`buchonean2_assets/buchonean2_hero.png` in the app repository)
- `screens/*.png`, real app screens rendered by the app's own UI tests with test data, copied from the app repository's `docs/` folders. `scripts/prepare-assets.mjs` fits each one to the iPhone 15/16 Pro screen below the status bar (393 × 798 pt) by removing rows from a completely empty background band (pigeon and breeding screens, so the tab bar stays) or trimming the bottom like a scrolled screen (flight and profile). Nothing inside the interface is altered.

App screens are only ever shown through `src/PhoneMockup.tsx`: `PhoneMockup` draws a graphite iPhone (titanium band, black bezel, side buttons, Dynamic Island status bar matched to the screen's light or dark app bar, home indicator), sized entirely from `--phone-w`; `AppShowcase` places it on the shared soft stage with the standard caption. It is CSS-only (no inline styles, so the CSP is unchanged) and serves responsive AVIF/WebP `srcset`s.

`scripts/prepare-assets.mjs` derives AVIF/WebP photographs, cropped screens, logos and favicons. It runs before `npm run dev` and `npm run build`, so deleting `dist/` never deletes source assets. The hero photograph loads eagerly at high priority with explicit dimensions; other images load lazily.

ES/EN stays visible on every page and preserves the equivalent page. Choosing a language with the switch is remembered in `localStorage`; a visitor arriving from another site at a page in the other language is sent to the equivalent page (crawlers and storage-less browsers always get the URL's language). Navigation, native FAQ disclosures, keyboard focus, skip link, reduced motion and 44px touch targets target WCAG 2.2 AA. The home page carries `MobileApplication` structured data without offers, ratings or download URLs; inner pages carry `BreadcrumbList`.

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

The Node suite checks that all twelve modules appear with a status on both Features pages and are linked from both homepages, generated HTML, localized metadata, canonical/hreflang, sitemap entries, internal links, JSON-LD, missing download links, noindex 404s, Cloudflare configuration, CSP and image size budgets. Playwright tests all ten pages on desktop and mobile Chromium with axe WCAG 2.0/2.1/2.2 A/AA scans, verifies switching languages, keyboard FAQ operation, mobile navigation, 320px layout, enlarged text, no-JavaScript content, redirects and HTTP 404s against local Wrangler. Browser reports and screenshots stay local in `test-results/`.

Lab performance is not field Core Web Vitals. Field LCP/INP/CLS require real traffic after a separately authorized launch.

`npm run test:performance` runs mobile Lighthouse against a separate local Cloudflare server, saves ES/EN HTML reports and JSON metrics in `reports/`, and captures desktop/mobile homepage screenshots there. It requires the Chromium installation above.

## Files

- `src/App.tsx`: responsive pages, navigation, module showcase, real app screens, store badges, photography and the official logo.
- `src/content.ts`, `src/i18n.ts`: bilingual copy, the twelve-module inventory with statuses and anchors, route mapping and i18next.
- `src/fonts.css`: self-hosted Archivo variable font (Latin subset).
- `src/styles.css`: Tailwind entry and visual system.
- `src/main.tsx`, `src/entry-server.tsx`: hydration and static server rendering.
- `scripts/prerender.mjs`: static documents, SEO and social assets.
- `scripts/prepare-assets.mjs`: repeatable image optimization from the maintained originals.
- `public/`: official brand source assets, optimized image derivatives, favicons, redirects and security/cache header templates.
- `wrangler.jsonc`: Workers Static Assets configuration.
- `tests/`, `playwright.config.ts`: static and browser verification.

Implementation follows Cloudflare's [static site generation and custom 404 documentation](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).
