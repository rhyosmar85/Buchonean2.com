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
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true)
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
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
    document.documentElement.style.fontSize = '125%'
  })
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).toBe(true)
})
