import { chromium } from '@playwright/test'
import lighthouse from 'lighthouse'
import { spawn } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'

const server = spawn(
  process.execPath,
  [
    'node_modules/wrangler/bin/wrangler.js',
    'dev',
    '--ip',
    '127.0.0.1',
    '--port',
    '8788',
    '--inspector-port',
    '9230',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'] },
)
let serverLog = ''
server.stdout.on('data', (data) => {
  serverLog += data
})
server.stderr.on('data', (data) => {
  serverLog += data
})
let browser
try {
  let ready = false
  for (let i = 0; i < 90; i++) {
    try {
      if ((await fetch('http://127.0.0.1:8788/es/')).ok) {
        ready = true
        break
      }
    } catch {
      /* Local server is starting. */
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  if (!ready)
    throw new Error(`Local Cloudflare server did not start: ${serverLog}`)
  browser = await chromium.launch({ args: ['--remote-debugging-port=9222'] })
  await mkdir('reports', { recursive: true })
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  })
  await page.goto('http://127.0.0.1:8788/es/')
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'reports/home-desktop.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'reports/home-mobile.png', fullPage: true })
  await page.close()
  const summaries = []
  for (const locale of ['es', 'en']) {
    const result = await lighthouse(`http://127.0.0.1:8788/${locale}/`, {
      port: 9222,
      output: 'html',
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    })
    if (!result || result.lhr.runtimeError)
      throw new Error(
        JSON.stringify(result?.lhr.runtimeError || 'No Lighthouse result'),
      )
    await writeFile(`reports/lighthouse-${locale}.html`, result.report)
    const audits = result.lhr.audits
    const summary = {
      locale,
      scores: Object.fromEntries(
        Object.entries(result.lhr.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          'first-contentful-paint',
          'largest-contentful-paint',
          'total-blocking-time',
          'cumulative-layout-shift',
        ].map((key) => [key, audits[key].displayValue]),
      ),
    }
    summaries.push(summary)
    console.log(JSON.stringify(summary, null, 2))
  }
  await writeFile(
    'reports/performance.json',
    JSON.stringify(summaries, null, 2),
  )
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
