import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight,
  Bird,
  Droplets,
  Egg,
  Flag,
  HeartPulse,
  MapPin,
  Menu,
  Network,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
  Store,
  Syringe,
  Tag,
  Timer,
  Trophy,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { AppShowcase, PhoneMockup } from './PhoneMockup'
import {
  anchors,
  content,
  groupLayout,
  moduleIds,
  moduleScreen,
  moduleStatus,
  paths,
  pages,
  type Locale,
  type ModuleId,
  type Page,
  type Status,
} from './content'

type Props = { locale: Locale; page: Page; found: boolean }

const moduleIcons: Record<ModuleId, LucideIcon> = {
  pigeons: Bird,
  breeding: Egg,
  pedigree: Network,
  captures: Flag,
  health: HeartPulse,
  flights: Timer,
  community: Users,
  nearby: MapPin,
  rankings: Trophy,
  stores: Store,
  sale: Tag,
  privacy: ShieldCheck,
}
const careIcons = [Syringe, Pill, Droplets, Stethoscope]

function moduleHref(locale: Locale, id: ModuleId) {
  return `${paths[locale].features}#${anchors[locale][id]}`
}

function Brand({ href }: { href: string }) {
  return (
    <a className="brand" href={href} aria-label="Buchonean2">
      <img
        src="/assets/images/buchonean2-logo-64.webp"
        srcSet="/assets/images/buchonean2-logo-64.webp 1x, /assets/images/buchonean2-logo-128.webp 2x"
        width="40"
        height="40"
        alt=""
      />
      <span>Buchonean2</span>
    </a>
  )
}

const photos = {
  buchon: {
    base: 'buchon',
    widths: [640, 960, 1350],
    width: 1350,
    height: 1165,
  },
  flight: {
    base: 'palomean-flight',
    widths: [480, 768, 1024],
    width: 1024,
    height: 654,
  },
}

function Photo({
  id,
  alt,
  sizes,
  priority = false,
  className,
}: {
  id: keyof typeof photos
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}) {
  const photo = photos[id]
  const set = (format: string) =>
    photo.widths
      .map((w) => `/assets/images/${photo.base}-${w}.${format} ${w}w`)
      .join(', ')
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/assets/images/${photo.base}-${photo.widths[1]}.webp`}
        width={photo.width}
        height={photo.height}
        alt={alt}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}

function StatusChip({ status, locale }: { status: Status; locale: Locale }) {
  return (
    <span className={`status status-${status}`}>
      <span aria-hidden="true" />
      {content[locale].statusLabel[status]}
    </span>
  )
}

function StoreBadges({ locale }: { locale: Locale }) {
  const c = content[locale]
  return (
    <div className="store-badges" aria-label={c.availability.note}>
      <div className="store-badge">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 28"
          width="22"
          height="26"
          fill="currentColor"
        >
          <path d="M17.1 4.5c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.7 2-.8.9-1.5 2.4-1.3 3.9 1.4.1 2.8-.7 3.7-1.8ZM21 19.4c-.6 1.3-.9 1.9-1.7 3-1.1 1.6-2.5 3.5-4.3 3.5-1.6 0-2-1-4.2-1-2.1 0-2.6 1-4.2 1-1.8 0-3.1-1.7-4.2-3.3C-.7 18.1-1.5 12 1 8.8c1.8-2.3 4.6-2.5 6.5-1.5 1.3.6 2.1.6 3.4.1 2.3-1 4.9-1 6.8 1.2-5.9 3.2-4.9 9.6 3.3 10.8Z" />
        </svg>
        <span>
          <small>{c.soon}</small>
          <strong>App Store</strong>
          <em>{c.availability.ios}</em>
        </span>
      </div>
      <div className="store-badge">
        <svg
          aria-hidden="true"
          viewBox="0 0 28 30"
          width="24"
          height="26"
          fill="currentColor"
        >
          <path d="M3 2L18 15L3 28V2Z" />
          <path d="M5 1L22 11L19 14L5 1ZM20 16L24 12L28 15L24 18L20 16ZM5 29L19 17L22 19L5 29Z" />
        </svg>
        <span>
          <small>{c.soon}</small>
          <strong>Google Play</strong>
          <em>{c.availability.android}</em>
        </span>
      </div>
    </div>
  )
}

function FAQs({ locale, limit }: { locale: Locale; limit?: number }) {
  return (
    <div className="faq-list">
      {content[locale].questions.slice(0, limit).map(({ q, a }) => (
        <details key={q}>
          <summary>
            {q}
            <Plus size={20} aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

function CareLedger({ locale }: { locale: Locale }) {
  const c = content[locale].care
  return (
    <div className="care">
      <p className="care-title">{c.title}</p>
      <ul>
        {c.items.map((item, i) => {
          const Icon = careIcons[i]
          return (
            <li key={item}>
              <Icon size={22} aria-hidden="true" />
              {item}
            </li>
          )
        })}
      </ul>
      <p className="care-note">{c.footnote}</p>
    </div>
  )
}

function Home({ locale }: { locale: Locale }) {
  const c = content[locale]
  const links = paths[locale]
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-tag">
            <img
              src="/assets/images/buchonean2-logo-128.webp"
              width="44"
              height="44"
              alt={c.footer.brand}
            />
            {c.hero.tag}
          </p>
          <h1>
            {c.hero.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="hero-body">{c.hero.body}</p>
          <div className="hero-actions">
            <a className="button primary" href={links.features}>
              {c.hero.cta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <p className="hero-status">
              <span aria-hidden="true" />
              {c.hero.status}
            </p>
          </div>
        </div>
        <div className="hero-media">
          <figure className="hero-visual">
            <Photo
              id="buchon"
              alt={c.hero.photoAlt}
              sizes="(max-width: 899px) 100vw, 56vw"
              priority
            />
          </figure>
          <div className="hero-screen">
            <PhoneMockup
              id="pigeon"
              locale={locale}
              sizes="(max-width: 899px) 34vw, 220px"
              eager
            />
          </div>
        </div>
      </section>

      <section className="section index" aria-labelledby="index-title">
        <div className="container">
          <div className="section-head">
            <h2 id="index-title">{c.index.title}</h2>
            <p>{c.index.body}</p>
          </div>
          <ul className="module-index">
            {moduleIds.map((id) => {
              const Icon = moduleIcons[id]
              return (
                <li key={id}>
                  <a href={moduleHref(locale, id)}>
                    <Icon size={22} aria-hidden="true" />
                    <span>
                      <strong>{c.modules[id].name}</strong>
                      <span>{c.modules[id].summary}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {groupLayout.map((group, i) => {
        const copy = c.groups[i]
        const dark = group.media.kind === 'photo'
        return (
          <section
            key={copy.title}
            className={`showcase ${i % 2 ? 'is-reversed' : ''} ${dark ? 'is-dark' : ''}`}
            aria-labelledby={`group-${i}`}
          >
            <div className="container showcase-inner">
              <div className="showcase-copy">
                <h2 id={`group-${i}`}>{copy.title}</h2>
                <p className="lead">{copy.body}</p>
                <div className="showcase-modules">
                  {group.modules.map((id) => {
                    const Icon = moduleIcons[id]
                    const m = c.modules[id]
                    return (
                      <article key={id} className="showcase-module">
                        <h3>
                          <Icon size={20} aria-hidden="true" />
                          {m.name}
                        </h3>
                        <p>{m.body}</p>
                        <a
                          className="text-link"
                          href={moduleHref(locale, id)}
                          aria-label={`${c.details}: ${m.name}`}
                        >
                          {c.details}
                        </a>
                      </article>
                    )
                  })}
                </div>
              </div>
              <div className={`showcase-media media-${group.media.kind}`}>
                {group.media.kind === 'screen' && (
                  <AppShowcase id={group.media.id} locale={locale} />
                )}
                {group.media.kind === 'photo' && (
                  <Photo
                    id={group.media.id}
                    alt={c.flightAlt}
                    sizes="(max-width: 899px) 100vw, 50vw"
                    className="showcase-photo"
                  />
                )}
                {group.media.kind === 'care' && <CareLedger locale={locale} />}
              </div>
            </div>
          </section>
        )
      })}

      <section className="section today" aria-labelledby="today-title">
        <div className="container">
          <h2 id="today-title">{c.today.title}</h2>
          <dl className="today-list">
            {c.today.items.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>
          <a className="text-link" href={links.features}>
            {c.today.link}
          </a>
        </div>
      </section>

      <section className="section home-faq">
        <div className="container home-faq-inner">
          <div>
            <h2>{c.faqTitle}</h2>
            <a className="text-link" href={links.faq}>
              {c.allFaq}
            </a>
          </div>
          <FAQs locale={locale} limit={3} />
        </div>
      </section>
    </>
  )
}

function PageHeading({
  locale,
  page,
  title,
  intro,
}: {
  locale: Locale
  page: Page
  title: string
  intro: string
}) {
  return (
    <section className="container page-heading">
      <p className="page-label">{content[locale].nav[page]}</p>
      <h1>{title}</h1>
      <p className="page-intro">{intro}</p>
    </section>
  )
}

function Features({ locale }: { locale: Locale }) {
  const c = content[locale]
  return (
    <>
      <PageHeading
        locale={locale}
        page="features"
        title={c.features.title}
        intro={c.features.intro}
      />
      <div className="container">
        <dl className="legend">
          {c.statusLegend.map((item) => (
            <div key={item.status}>
              <dt>
                <StatusChip status={item.status} locale={locale} />
              </dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
        <nav className="jump" aria-label={c.features.jump}>
          <p>{c.features.jump}</p>
          <ul>
            {moduleIds.map((id) => (
              <li key={id}>
                <a href={`#${anchors[locale][id]}`}>{c.modules[id].name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="module-list">
        {moduleIds.map((id) => {
          const Icon = moduleIcons[id]
          const m = c.modules[id]
          const screen = moduleScreen[id]
          return (
            <section
              key={id}
              id={anchors[locale][id]}
              className={`module ${screen ? 'has-screen' : ''}`}
              aria-labelledby={`${id}-title`}
            >
              <div className="container module-inner">
                <div className="module-head">
                  <Icon size={28} aria-hidden="true" className="module-icon" />
                  <h2 id={`${id}-title`}>{m.name}</h2>
                  <StatusChip status={moduleStatus[id]} locale={locale} />
                  <p className="lead">{m.summary}</p>
                  <p>{m.body}</p>
                </div>
                <div className="module-detail">
                  <h3>{c.features.points}</h3>
                  <ul className="points">
                    {m.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {m.note && <p className="module-note">{m.note}</p>}
                </div>
                {screen && (
                  <div className="module-screen">
                    <AppShowcase id={screen} locale={locale} />
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>
      <section className="section planned" aria-labelledby="planned-title">
        <div className="container planned-inner">
          <div>
            <h2 id="planned-title">{c.features.plannedTitle}</h2>
            <p>{c.features.plannedBody}</p>
          </div>
          <ul>
            {c.features.planned.map((item) => (
              <li key={item}>
                <span>{item}</span>
                <StatusChip status="planned" locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

const communityModules: ModuleId[] = [
  'community',
  'nearby',
  'captures',
  'rankings',
  'stores',
  'sale',
]

function Community({ locale }: { locale: Locale }) {
  const c = content[locale]
  const cc = c.community
  return (
    <>
      <section className="community-hero">
        <div className="container community-hero-inner">
          <div>
            <p className="page-label">{c.nav.community}</p>
            <h1>{cc.title}</h1>
            <p className="page-intro">{cc.intro}</p>
          </div>
          <figure className="hero-visual community-photo">
            <Photo
              id="flight"
              alt={c.flightAlt}
              sizes="(max-width: 899px) 100vw, 50vw"
              priority
            />
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="explore-title">
        <div className="container">
          <h2 id="explore-title" className="section-title">
            {cc.explore}
          </h2>
          <div className="explore-grid">
            {communityModules.map((id) => {
              const Icon = moduleIcons[id]
              const m = c.modules[id]
              return (
                <article key={id} className="explore-item">
                  <h3>
                    <Icon size={22} aria-hidden="true" />
                    {m.name}
                  </h3>
                  <p>{m.body}</p>
                  {m.note && <p className="module-note">{m.note}</p>}
                  <a
                    className="text-link"
                    href={moduleHref(locale, id)}
                    aria-label={`${c.details}: ${m.name}`}
                  >
                    {c.details}
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="showcase is-dark" aria-labelledby="privacy-title">
        <div className="container showcase-inner">
          <div className="showcase-copy">
            <h2 id="privacy-title">{cc.privacyTitle}</h2>
            <div className="privacy-split">
              <div>
                <h3>{cc.privateTitle}</h3>
                <ul className="points">
                  {cc.privateItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{cc.publicTitle}</h3>
                <ul className="points">
                  {cc.publicItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="showcase-media media-screen">
            <AppShowcase id="profile" locale={locale} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container explainers">
          <article>
            <MapPin size={26} aria-hidden="true" />
            <h2>{cc.locationTitle}</h2>
            <p>{cc.locationBody}</p>
          </article>
          <article>
            <Trophy size={26} aria-hidden="true" />
            <h2>{cc.rankingTitle}</h2>
            <p>{cc.rankingBody}</p>
          </article>
        </div>
      </section>

      <section className="section values" aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title" className="section-title">
            {cc.valuesTitle}
          </h2>
          <div className="values-grid">
            {cc.values.map((value) => (
              <article key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
          <p className="content-note">{cc.note}</p>
        </div>
      </section>
    </>
  )
}

export default function App({ locale, page, found }: Props) {
  const { t } = useTranslation()
  const c = content[locale]
  const [menuOpen, setMenuOpen] = useState(false)
  const links = paths[locale]
  const alternate = found ? page : 'home'
  const rememberLocale = (value: Locale) => {
    try {
      localStorage.setItem('buchonean2-locale', value)
    } catch {
      /* Storage can be unavailable; the URL still carries the language. */
    }
  }
  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand href={links.home} />
          <nav className="desktop-nav" aria-label={c.mainNav}>
            {pages
              .filter((p) => p !== 'home')
              .map((p) => (
                <a
                  key={p}
                  href={links[p]}
                  aria-current={found && page === p ? 'page' : undefined}
                >
                  {c.navShort[p]}
                </a>
              ))}
          </nav>
          <div className="header-actions">
            <nav className="language-switch" aria-label={t('language')}>
              {(['es', 'en'] as const).map((value) => (
                <a
                  key={value}
                  href={paths[value][alternate]}
                  hrefLang={value}
                  lang={value}
                  aria-current={locale === value ? 'true' : undefined}
                  aria-label={value === 'es' ? 'Español' : 'English'}
                  onClick={() => rememberLocale(value)}
                >
                  {value.toUpperCase()}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t('close') : t('menu')}
            >
              {menuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label={c.mobileNav}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setMenuOpen(false)
              document.querySelector<HTMLButtonElement>('.menu-button')?.focus()
            }
          }}
        >
          {pages.map((p) => (
            <a
              key={p}
              href={links[p]}
              aria-current={found && page === p ? 'page' : undefined}
            >
              {c.nav[p]}
            </a>
          ))}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        {!found ? (
          <section className="container page-heading not-found">
            <p className="page-label">404</p>
            <h1>{c.notFound.title}</h1>
            <p className="page-intro">{c.notFound.body}</p>
            <a className="button primary" href={links.home}>
              {c.notFound.link}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </section>
        ) : page === 'home' ? (
          <Home locale={locale} />
        ) : page === 'features' ? (
          <Features locale={locale} />
        ) : page === 'community' ? (
          <Community locale={locale} />
        ) : page === 'faq' ? (
          <>
            <PageHeading
              locale={locale}
              page="faq"
              title={c.faq.title}
              intro={c.faq.intro}
            />
            <section
              className="container narrow section-bottom"
              aria-label={c.nav.faq}
            >
              <FAQs locale={locale} />
            </section>
          </>
        ) : (
          <>
            <PageHeading
              locale={locale}
              page="support"
              title={c.support.title}
              intro={c.support.intro}
            />
            <section className="container support-grid section-bottom">
              <article className="support-panel">
                <h2>{c.support.heading}</h2>
                <p>{c.support.body}</p>
                <a className="text-link" href={links.faq}>
                  {c.support.faq}
                </a>
              </article>
              <aside className="support-status">
                <StatusChip status="development" locale={locale} />
                <h2>{c.support.status}</h2>
                <p>{c.support.statusBody}</p>
              </aside>
            </section>
          </>
        )}
        {found && (
          <section className="availability" id="availability">
            <div className="container availability-inner">
              <div>
                <h2>{c.availability.title}</h2>
                <p>{c.availability.body}</p>
              </div>
              <div>
                <StoreBadges locale={locale} />
                <p className="download-note">{c.availability.note}</p>
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <Brand href={links.home} />
              <p>{c.footer.line}</p>
            </div>
            <nav aria-label={c.footerNav}>
              {pages
                .filter((p) => p !== 'home')
                .map((p) => (
                  <a key={p} href={links[p]}>
                    {c.nav[p]}
                  </a>
                ))}
            </nav>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {c.footer.rights}
            </span>
            <p>{c.footer.note}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
