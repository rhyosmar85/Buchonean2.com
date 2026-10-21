import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { render, content, paths, pages } from '../.prerender/entry-server.js'

const siteUrl = new URL(process.env.SITE_URL || 'https://buchonean2.com')
if (
  !['https:', 'http:'].includes(siteUrl.protocol) ||
  siteUrl.pathname !== '/' ||
  siteUrl.search ||
  siteUrl.hash ||
  siteUrl.username ||
  siteUrl.password
)
  throw new Error(
    'SITE_URL must be an HTTP(S) origin without path, credentials, query or hash',
  )
const origin = siteUrl.origin
const indexable = process.env.SITE_INDEXABLE !== 'false'
const template = await readFile('dist/index.html', 'utf8')
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  )
const cspHashes = new Set()

function documentFor(locale, page, found = true) {
  const c = content[locale]
  const metadata = found
    ? c.meta[page]
    : { title: `404 | Buchonean2`, description: c.notFound.body }
  const canonical = `${origin}${paths[locale][page]}`
  const structuredData = found
    ? {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${origin}/#website`,
            name: 'Buchonean2',
            url: `${origin}/`,
            inLanguage: ['es', 'en'],
          },
          {
            '@type': page === 'faq' ? 'FAQPage' : 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: metadata.title,
            description: metadata.description,
            inLanguage: locale,
            isPartOf: { '@id': `${origin}/#website` },
            ...(page === 'faq'
              ? {
                  mainEntity: c.questions.map(({ q, a }) => ({
                    '@type': 'Question',
                    name: q,
                    acceptedAnswer: { '@type': 'Answer', text: a },
                  })),
                }
              : {}),
          },
        ],
      }
    : undefined
  const json = structuredData
    ? JSON.stringify(structuredData).replace(/</g, '\\u003c')
    : ''
  if (json)
    cspHashes.add(
      `'sha256-${createHash('sha256').update(json).digest('base64')}'`,
    )
  const head = `
    <title>${escape(metadata.title)}</title>
    <meta name="description" content="${escape(metadata.description)}" />
    <meta name="robots" content="${found && indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow'}" />
    ${
      found
        ? `<link rel="canonical" href="${escape(canonical)}" />
    <link rel="alternate" hreflang="es" href="${escape(origin + paths.es[page])}" />
    <link rel="alternate" hreflang="en" href="${escape(origin + paths.en[page])}" />
    <link rel="alternate" hreflang="x-default" href="${escape(origin + paths.es[page])}" />`
        : ''
    }
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Buchonean2" />
    <meta property="og:title" content="${escape(metadata.title)}" />
    <meta property="og:description" content="${escape(metadata.description)}" />
    <meta property="og:locale" content="${locale === 'es' ? 'es_ES' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${locale === 'es' ? 'en_US' : 'es_ES'}" />
    ${found ? `<meta property="og:url" content="${escape(canonical)}" />` : ''}
    <meta property="og:image" content="${escape(origin)}/social-${locale}.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape('Buchonean2. ' + c.footer.line)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(metadata.title)}" />
    <meta name="twitter:description" content="${escape(metadata.description)}" />
    <meta name="twitter:image" content="${escape(origin)}/social-${locale}.png" />
    ${json ? `<script type="application/ld+json">${json}</script>` : ''}`
  return template
    .replace('<html lang="es">', `<html lang="${locale}">`)
    .replace('<!--seo-head-->', head)
    .replace('<!--app-html-->', render(locale, page, found))
}

const sitemapEntries = []
for (const locale of ['es', 'en']) {
  for (const page of pages) {
    const path = paths[locale][page]
    await mkdir(`dist${path}`, { recursive: true })
    await writeFile(`dist${path}index.html`, documentFor(locale, page))
    sitemapEntries.push(
      `<url><loc>${escape(origin + path)}</loc>${['es', 'en', 'x-default'].map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escape(origin + paths[lang === 'x-default' ? 'es' : lang][page])}"/>`).join('')}</url>`,
    )
  }
  await writeFile(`dist/${locale}/404.html`, documentFor(locale, 'home', false))
  const tagline =
    locale === 'es'
      ? ['Una comunidad.', 'Un nuevo capítulo.']
      : ['One community.', 'A new chapter.']
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#125c41"/><circle cx="1030" cy="300" r="270" fill="none" stroke="#8baa79"/><circle cx="1030" cy="300" r="190" fill="none" stroke="#8baa79"/><path d="M980 440C780 360 850 220 975 330C1040 150 1220 250 980 440Z" fill="#d9efbd"/><g font-family="DejaVu Sans,sans-serif" fill="#edfadf"><text x="75" y="110" font-size="36" font-weight="bold">buchonean2</text><text x="75" y="285" font-size="64">${tagline[0]}</text><text x="75" y="370" font-size="64">${tagline[1]}</text><text x="75" y="535" font-size="24">${content[locale].soon}</text></g></svg>`
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(`dist/social-${locale}.png`)
}
await writeFile('dist/404.html', documentFor('es', 'home', false))
await writeFile('dist/index.html', documentFor('es', 'home'))
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemapEntries.join('')}</urlset>\n`,
)
await writeFile(
  'dist/robots.txt',
  `User-agent: *\n${indexable ? 'Allow: /' : 'Disallow: /'}\nSitemap: ${origin}/sitemap.xml\n`,
)
const headers = await readFile('dist/_headers', 'utf8')
await writeFile(
  'dist/_headers',
  headers.replace(
    "script-src 'self';",
    `script-src 'self' ${[...cspHashes].join(' ')};`,
  ),
)
console.log(
  `Prerendered 10 localized pages, 3 error pages, social images and SEO files. Origin: ${origin}. Indexable: ${indexable}.`,
)
