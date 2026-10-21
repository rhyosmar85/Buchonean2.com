import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

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
  'Prepared responsive photography, official logo and favicons from maintained originals.',
)
