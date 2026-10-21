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
    <meta property="og:image" content="${escape(origin)}/social-${locale}.jpg" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escape('Buchonean2. ' + c.footer.line + ' ' + c.hero.photoAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(metadata.title)}" />
    <meta name="twitter:description" content="${escape(metadata.description)}" />
    <meta name="twitter:image" content="${escape(origin)}/social-${locale}.jpg" />
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
  const lines = content[locale].hero.lines
  const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101e18"/><path d="M64 177H490M64 575H1136" stroke="#809e8a"/><g font-family="Arial,sans-serif" fill="#f2f3ec"><text x="166" y="119" font-size="28" font-weight="bold">BUCHONEAN2</text>${lines.map((line, i) => `<text x="64" y="${260 + i * 76}" font-size="53" font-weight="bold">${escape(line)}</text>`).join('')}<text x="64" y="535" font-size="23">${escape(content[locale].soon)}</text></g></svg>`
  const photo = await sharp('public/assets/source/palomean2_image1.jpg')
    .resize(600, 384, { fit: 'inside' })
    .toBuffer()
  const logo = await sharp('public/assets/source/Buchonean2_logo.png')
    .resize(80, 80)
    .toBuffer()
  await sharp(Buffer.from(background))
    .composite([
      { input: photo, left: 550, top: 132 },
      { input: logo, left: 64, top: 62 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`dist/social-${locale}.jpg`)
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
