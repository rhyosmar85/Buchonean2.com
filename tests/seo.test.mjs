import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import { load } from 'cheerio'
import sharp from 'sharp'
import { paths, pages, content } from '../.prerender/entry-server.js'

const origin = new URL(process.env.SITE_URL || 'https://buchonean2.com').origin
const titles = new Set()
for (const locale of ['es', 'en']) {
  for (const page of pages) {
    test(`${locale}/${page}: complete HTML, localized SEO and crawlable navigation`, async () => {
      const path = paths[locale][page]
      const html = await readFile(`dist${path}index.html`, 'utf8')
      const $ = load(html)
      assert.equal($('html').attr('lang'), locale)
      assert.equal($('h1').length, 1)
      assert.ok($('main').text().length > 300)
      assert.equal($('title').text(), content[locale].meta[page].title)
      assert.ok(!titles.has($('title').text()), 'Unique title')
      titles.add($('title').text())
      assert.equal(
        $('meta[name=description]').attr('content'),
        content[locale].meta[page].description,
      )
      assert.equal($('link[rel=canonical]').attr('href'), origin + path)
      for (const lang of ['es', 'en', 'x-default'])
        assert.equal(
          $(`link[hreflang=${lang}]`).attr('href'),
          origin + paths[lang === 'x-default' ? 'es' : lang][page],
        )
      assert.equal(
        $('.language-switch a[lang=en]').attr('href'),
        paths.en[page],
      )
      assert.equal(
        $('.language-switch a[lang=es]').attr('href'),
        paths.es[page],
      )
      assert.equal($('.store-badge').length, 2)
      assert.equal($('.store-badge a').length, 0)
      assert.ok($('.store-badge').text().includes(content[locale].soon))
      assert.equal(
        $('a[href*="apps.apple.com"],a[href*="play.google.com"]').length,
        0,
      )
      const schema = JSON.parse($('script[type="application/ld+json"]').text())
      const webPage = schema['@graph'][1]
      assert.equal(webPage.url, origin + path)
      assert.equal(webPage.inLanguage, locale)
      if (page === 'faq') {
        assert.equal(webPage['@type'], 'FAQPage')
        assert.equal(webPage.mainEntity.length, $('details').length)
        assert.equal(
          webPage.mainEntity[0].acceptedAnswer.text,
          $('details p').first().text(),
        )
      }
      for (const a of $('a[href^="/"]').toArray()) {
        const href = $(a).attr('href')
        await stat(`dist${href}index.html`)
      }
      assert.ok(!html.includes('<!--app-html-->'))
    })
  }
}
test('sitemap contains exactly ten canonical pages and reciprocal alternates', async () => {
  const $ = load(await readFile('dist/sitemap.xml', 'utf8'), { xmlMode: true })
  assert.equal($('url').length, 10)
  for (const locale of ['es', 'en'])
    for (const page of pages)
      assert.ok(
        $('loc')
          .toArray()
          .some((loc) => $(loc).text() === origin + paths[locale][page]),
      )
  assert.equal($('xhtml\\:link').length, 30)
  assert.ok(
    (await readFile('dist/robots.txt', 'utf8')).includes(
      `Sitemap: ${origin}/sitemap.xml`,
    ),
  )
})
test('404s are localized, noindex and have no canonical', async () => {
  for (const locale of ['es', 'en']) {
    const $ = load(await readFile(`dist/${locale}/404.html`, 'utf8'))
    assert.equal($('html').attr('lang'), locale)
    assert.equal($('meta[name=robots]').attr('content'), 'noindex,follow')
    assert.equal($('link[rel=canonical]').length, 0)
    assert.equal($('h1').text(), content[locale].notFound.title)
  }
})
test('Cloudflare static routing, headers and image budget', async () => {
  const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'))
  assert.equal(config.assets.not_found_handling, '404-page')
  assert.equal(config.assets.html_handling, 'force-trailing-slash')
  assert.equal(config.workers_dev, false)
  assert.equal(config.routes, undefined)
  const headers = await readFile('dist/_headers', 'utf8')
  assert.ok(headers.includes("'sha256-"))
  assert.ok(headers.includes('max-age=31536000, immutable'))
  for (const locale of ['es', 'en'])
    assert.ok((await stat(`dist/social-${locale}.jpg`)).size < 150_000)
})

test('official source assets survive a clean build and delivery images are optimized', async () => {
  for (const file of ['palomean2_image1.jpg', 'Buchonean2_logo.png']) {
    assert.deepEqual(
      await readFile(`public/assets/source/${file}`),
      await readFile(`dist/assets/source/${file}`),
    )
  }
  for (const width of [480, 768, 1024]) {
    const file = `dist/assets/images/palomean-flight-${width}.avif`
    assert.equal((await sharp(file).metadata()).width, width)
    assert.ok((await stat(file)).size < 100_000)
  }
  assert.ok(
    (await stat('dist/assets/images/buchonean2-logo-64.webp')).size < 8_000,
  )
  const $ = load(await readFile('dist/es/index.html', 'utf8'))
  const hero = $('.hero-visual img')
  assert.equal(hero.attr('fetchpriority'), 'high')
  assert.equal(hero.attr('loading'), 'eager')
  assert.ok(hero.attr('alt').length > 30)
  assert.equal(hero.attr('width'), '1024')
  assert.equal(hero.attr('height'), '654')
  assert.equal($('.hero-visual source[type="image/avif"]').length, 1)
  assert.ok($('.brand img').first().attr('src').includes('buchonean2-logo'))
})
