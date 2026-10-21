import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { paths, pages } from '../../src/content'

for (const locale of ['es', 'en'] as const) {
  for (const route of pages) {
    test(`${locale}/${route} renders accessibly without hydration errors`, async ({
      page,
    }) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text())
      })
      const response = await page.goto(paths[locale][route])
      expect(response?.status()).toBe(200)
      await expect(page.locator('h1')).toBeVisible()
      await expect(page.locator('.language-switch')).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute('lang', locale)
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true)
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
            .analyze()
        ).violations,
      ).toEqual([])
      expect(errors).toEqual([])
    })
  }
}

test('language switch preserves the corresponding page', async ({ page }) => {
  await page.goto('/es/funciones/')
  await page
    .locator('.language-switch')
    .getByRole('link', { name: 'English' })
    .click()
  await expect(page).toHaveURL(/\/en\/features\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page
    .locator('.language-switch')
    .getByRole('link', { name: 'Español' })
    .click()
  await expect(page).toHaveURL(/\/es\/funciones\/$/)
})

test('FAQ works with keyboard and mobile menu is usable', async ({
  page,
  isMobile,
}) => {
  await page.goto('/en/faq/')
  const question = page.locator('summary').first()
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.locator('#mobile-nav')).toBeVisible()
    await page
      .locator('#mobile-nav')
      .getByRole('link', { name: 'Support' })
      .click()
    await expect(page).toHaveURL(/\/en\/support\/$/)
  }
})

test('Cloudflare redirects and genuine localized 404 responses', async ({
  request,
}) => {
  const root = await request.get('/', { maxRedirects: 0 })
  expect(root.status()).toBe(302)
  expect(root.headers().location).toBe('/es/')
  const slash = await request.get('/en/features', { maxRedirects: 0 })
  expect([301, 307, 308]).toContain(slash.status())
  expect(slash.headers().location).toMatch(/\/en\/features\/$/)
  const image = await request.get('/assets/images/palomean-flight-480.avif')
  expect(image.status()).toBe(200)
  expect(image.headers()['cache-control']).toContain('max-age=86400')
  expect(image.headers()['cache-control']).not.toContain('immutable')
  const html = await (await request.get('/es/')).text()
  const stylesheet = html.match(/href="(\/build-assets\/[^\"]+\.css)"/)?.[1]
  expect(stylesheet).toBeTruthy()
  const css = await request.get(stylesheet!)
  expect(css.headers()['cache-control']).toContain(
    'max-age=31536000, immutable',
  )
  for (const locale of ['es', 'en']) {
    const missing = await request.get(`/${locale}/does-not-exist/`)
    expect(missing.status()).toBe(404)
    expect(await missing.text()).toContain(`<html lang="${locale}">`)
    expect(await missing.text()).toContain('noindex,follow')
  }
})

test('content, navigation and FAQ are available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:8787/es/')
  await expect(page.locator('h1')).toBeVisible()
  await page
    .locator('.language-switch')
    .getByRole('link', { name: 'English' })
    .click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await page.goto('http://127.0.0.1:8787/en/faq/')
  await page.locator('summary').first().click()
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  await context.close()
})

test('320px screen, large text and reduced motion retain usable content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/es/')
  await expect(page.locator('.language-switch')).toBeVisible()
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true)
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%'
  })
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true)
})

test('tablet layouts retain navigation and translated content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 1024 })
  for (const locale of ['es', 'en'] as const) {
    for (const route of pages) {
      await page.goto(paths[locale][route])
      await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('.language-switch')).toBeVisible()
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true)
    }
  }
})

test('hero images load and navigation supports keyboard dismissal', async ({
  page,
  isMobile,
}) => {
  await page.goto('/es/')
  const photo = page.locator('.hero-visual img')
  await expect(photo).toBeVisible()
  await expect(photo).toHaveAttribute('alt', /Paloma/)
  expect(
    await photo.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
    ),
  ).toBe(true)
  expect(
    await page
      .locator('.brand img')
      .first()
      .evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
  ).toBe(true)
  for (const link of await page.locator('.language-switch a').all()) {
    const box = await link.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(44)
    expect(box?.width).toBeGreaterThanOrEqual(24)
  }
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Abrir menú' })
    await menu.click()
    await page.locator('#mobile-nav a').first().focus()
    await page.keyboard.press('Escape')
    await expect(menu).toBeFocused()
    await expect(menu).toHaveAttribute('aria-expanded', 'false')
  }
})
