import sharp from 'sharp'
import { mkdir, rm } from 'node:fs/promises'

// The original files are preserved byte-for-byte. Only derived delivery formats
// are resized/compressed; no recoloring, retouching or generated replacement art.
const directory = 'public/assets'
await mkdir(`${directory}/images`, { recursive: true })
for (const width of [480, 768, 1024]) {
  const photo = sharp(`${directory}/source/palomean2_image1.jpg`)
    .rotate()
    .resize({ width, withoutEnlargement: true })
  await photo
    .clone()
    .avif({ quality: 62, effort: 6 })
    .toFile(`${directory}/images/palomean-flight-${width}.avif`)
  await photo
    .clone()
    .webp({ quality: 82 })
    .toFile(`${directory}/images/palomean-flight-${width}.webp`)
}
// Approved buchón photograph (same file the app's sign-in screen uses).
for (const width of [640, 960, 1350]) {
  const photo = sharp(`${directory}/source/buchonean2_buchon.png`).resize({
    width,
    withoutEnlargement: true,
  })
  await photo
    .clone()
    .avif({ quality: 58, effort: 6 })
    .toFile(`${directory}/images/buchon-${width}.avif`)
  await photo
    .clone()
    .webp({ quality: 80 })
    .toFile(`${directory}/images/buchon-${width}.webp`)
}
// Real app screens rendered from the Flutter app, shown inside iPhone mockups.
// Each is fitted to the iPhone 15/16 Pro screen below the status bar
// (393 x 798 pt) without altering the interface: either rows are removed from
// a band that is completely empty background (keeping the bottom tab bar), or
// the bottom is trimmed like a scrolled screen. Device screenshots keep their
// own status bar and are fitted to the whole screen (393 x 852 pt).
await rm(`${directory}/images/screens`, { recursive: true, force: true })
await mkdir(`${directory}/images/screens`, { recursive: true })
const screens = {
  'pigeon-es': { removeAt: 1300, widths: [400, 640, 860] },
  'pigeon-en': { removeAt: 1300, widths: [400, 640, 860] },
  'breeding-es': { removeAt: 1150, widths: [400, 640, 780] },
  'breeding-en': { removeAt: 1150, widths: [400, 640, 780] },
  'flight-es': { widths: [390] },
  'profile-es': { widths: [320] },
  'profile-en': { widths: [320] },
  'profile-device-es': { device: true, widths: [400, 640, 860] },
}
for (const [name, fit] of Object.entries(screens)) {
  const file = `${directory}/source/screens/${name}.png`
  const { width, height } = await sharp(file).metadata()
  const target = Math.round((width * (fit.device ? 852 : 798)) / 393)
  const removed = height - target
  let screen
  if (fit.removeAt) {
    const top = await sharp(file)
      .extract({ left: 0, top: 0, width, height: fit.removeAt })
      .png()
      .toBuffer()
    const bottomTop = fit.removeAt + removed
    const bottom = await sharp(file)
      .extract({ left: 0, top: bottomTop, width, height: height - bottomTop })
      .png()
      .toBuffer()
    screen = await sharp({
      create: { width, height: target, channels: 4, background: '#ffffff' },
    })
      .composite([
        { input: top, left: 0, top: 0 },
        { input: bottom, left: 0, top: fit.removeAt },
      ])
      .png()
      .toBuffer()
  } else {
    screen = await sharp(file)
      .extract({ left: 0, top: 0, width, height: target })
      .png()
      .toBuffer()
  }
  for (const w of fit.widths) {
    const sized = sharp(screen).resize({ width: w, withoutEnlargement: true })
    await sized
      .clone()
      .avif({ quality: 70, effort: 6 })
      .toFile(`${directory}/images/screens/${name}-${w}.avif`)
    await sized
      .clone()
      .webp({ quality: 88 })
      .toFile(`${directory}/images/screens/${name}-${w}.webp`)
  }
}
for (const width of [64, 128, 256]) {
  await sharp(`${directory}/source/Buchonean2_logo.png`)
    .resize(width, width)
    .webp({ quality: 90 })
    .toFile(`${directory}/images/buchonean2-logo-${width}.webp`)
}
await sharp(`${directory}/source/Buchonean2_logo.png`)
  .resize(64, 64)
  .png()
  .toFile('public/favicon.png')
await sharp(`${directory}/source/Buchonean2_logo.png`)
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')
console.log(
  'Prepared responsive photography, app screens, official logo and favicons from maintained originals.',
)
