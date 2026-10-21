import { content, screens, type Locale, type ScreenId } from './content'

// iPhone 15/16 Pro proportions: a 393 x 852 pt screen, of which the top 54 pt
// is the status bar around the Dynamic Island. App screens fill the rest.
const SCREEN_W = 393
const CONTENT_H = 798

function StatusBar({ dark }: { dark: boolean }) {
  const ink = dark ? '#f4f6f4' : '#0b0c0c'
  return (
    <svg
      className="phone-status"
      viewBox="0 0 393 54"
      aria-hidden="true"
      focusable="false"
    >
      <text
        x="58"
        y="35"
        fill={ink}
        fontSize="17"
        fontWeight="650"
        textAnchor="middle"
      >
        9:41
      </text>
      <rect x="134" y="11" width="125" height="36" rx="18" fill="#000" />
      <g fill={ink}>
        <rect x="285" y="27" width="3.5" height="5" rx="1" />
        <rect x="290.5" y="24.5" width="3.5" height="7.5" rx="1" />
        <rect x="296" y="22" width="3.5" height="10" rx="1" />
        <rect x="301.5" y="19.5" width="3.5" height="12.5" rx="1" />
        <path d="M318 20.2a11 11 0 0 1 8.6 4.1l-1.6 1.5a8.8 8.8 0 0 0-14 0l-1.6-1.5a11 11 0 0 1 8.6-4.1Zm0 4.4a6.6 6.6 0 0 1 5.1 2.4l-1.6 1.5a4.4 4.4 0 0 0-7 0l-1.6-1.5a6.6 6.6 0 0 1 5.1-2.4Zm0 4.4 2 2-2 2-2-2 2-2Z" />
        <rect
          x="333.5"
          y="20.5"
          width="24"
          height="12"
          rx="3.6"
          fill="none"
          stroke={ink}
          strokeOpacity="0.4"
        />
        <rect x="335.5" y="22.5" width="20" height="8" rx="2.2" />
        <path d="M359.5 24.5c1.2.3 1.8 1 1.8 2s-.6 1.7-1.8 2Z" opacity="0.45" />
      </g>
    </svg>
  )
}

export function PhoneMockup({
  id,
  locale,
  sizes,
  eager = false,
}: {
  id: ScreenId
  locale: Locale
  sizes: string
  eager?: boolean
}) {
  const screen = screens[id]
  const file = screen.file[locale]
  const tone = screen.status[locale]
  const widest = screen.widths[screen.widths.length - 1]
  const set = (format: string) =>
    screen.widths
      .map((w) => `/assets/images/screens/${file}-${w}.${format} ${w}w`)
      .join(', ')
  return (
    <div className="phone">
      <div className="phone-body">
        <div className={`phone-screen tone-${tone}`}>
          <StatusBar dark={tone === 'dark'} />
          <picture>
            <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
            <img
              src={`/assets/images/screens/${file}-${widest}.webp`}
              srcSet={set('webp')}
              sizes={sizes}
              width={widest}
              height={Math.round((widest * CONTENT_H) / SCREEN_W)}
              alt={content[locale].screenAlt[id]}
              loading={eager ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
          <span className="phone-home" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

// The one presentation used wherever the app is shown: a soft stage, the
// device, and a caption saying what the screen is.
export function AppShowcase({
  id,
  locale,
  sizes = '(max-width: 639px) 66vw, 260px',
}: {
  id: ScreenId
  locale: Locale
  sizes?: string
}) {
  const c = content[locale]
  const spanishOnly = locale === 'en' && screens[id].file.en.endsWith('-es')
  return (
    <figure className="app-showcase">
      <PhoneMockup id={id} locale={locale} sizes={sizes} />
      <figcaption>
        {spanishOnly ? c.screenCaptionEs : c.screenCaption}
      </figcaption>
    </figure>
  )
}
