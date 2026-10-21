import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpRight, ArrowRight, Menu, X, Plus } from 'lucide-react'
import { content, paths, pages, type Locale, type Page } from './content'

type Props = { locale: Locale; page: Page; found: boolean }

function Brand({ href }: { href: string }) {
  return (
    <a className="brand" href={href} aria-label="Buchonean2">
      <img
        src="/assets/images/buchonean2-logo-64.webp"
        srcSet="/assets/images/buchonean2-logo-64.webp 1x, /assets/images/buchonean2-logo-128.webp 2x"
        width="48"
        height="48"
        alt=""
      />
      <span>
        BUCHONEAN<span className="brand-number">2</span>
      </span>
    </a>
  )
}

function PigeonPhoto({
  locale,
  priority = false,
}: {
  locale: Locale
  priority?: boolean
}) {
  const sizes =
    '(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 54vw, 690px'
  return (
    <picture className="pigeon-photo">
      <source
        type="image/avif"
        srcSet="/assets/images/palomean-flight-480.avif 480w, /assets/images/palomean-flight-768.avif 768w, /assets/images/palomean-flight-1024.avif 1024w"
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet="/assets/images/palomean-flight-480.webp 480w, /assets/images/palomean-flight-768.webp 768w, /assets/images/palomean-flight-1024.webp 1024w"
        sizes={sizes}
      />
      <img
        src="/assets/images/palomean-flight-1024.webp"
        width="1024"
        height="654"
        alt={content[locale].hero.photoAlt}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
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
          width="24"
          height="28"
          fill="currentColor"
        >
          <path d="M17.1 4.5c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.7 2-.8.9-1.5 2.4-1.3 3.9 1.4.1 2.8-.7 3.7-1.8ZM21 19.4c-.6 1.3-.9 1.9-1.7 3-1.1 1.6-2.5 3.5-4.3 3.5-1.6 0-2-1-4.2-1-2.1 0-2.6 1-4.2 1-1.8 0-3.1-1.7-4.2-3.3C-.7 18.1-1.5 12 1 8.8c1.8-2.3 4.6-2.5 6.5-1.5 1.3.6 2.1.6 3.4.1 2.3-1 4.9-1 6.8 1.2-5.9 3.2-4.9 9.6 3.3 10.8Z" />
        </svg>
        <span>
          <small>{c.soon}</small>
          <strong>App Store</strong>
        </span>
      </div>
      <div className="store-badge">
        <svg
          aria-hidden="true"
          viewBox="0 0 28 30"
          width="26"
          height="28"
          fill="none"
        >
          <path d="M3 2L18 15L3 28V2Z" fill="currentColor" />
          <path
            d="M5 1L22 11L19 14L5 1ZM20 16L24 12L28 15L24 18L20 16ZM5 29L19 17L22 19L5 29Z"
            fill="currentColor"
          />
        </svg>
        <span>
          <small>{c.soon}</small>
          <strong>Google Play</strong>
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

export default function App({ locale, page, found }: Props) {
  const { t } = useTranslation()
  const c = content[locale]
  const [menuOpen, setMenuOpen] = useState(false)
  const links = paths[locale]
  const alternate = found ? page : 'home'
  return (
    <>
      <a href="#main" className="skip-link">
        {t('skip')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand href={links.home} />
          <nav
            className="desktop-nav"
            aria-label={
              locale === 'es' ? 'Navegación principal' : 'Main navigation'
            }
          >
            {pages
              .filter((p) => p !== 'home')
              .map((p) => (
                <a
                  key={p}
                  href={links[p]}
                  aria-current={found && page === p ? 'page' : undefined}
                >
                  {c.nav[p]}
                </a>
              ))}
          </nav>
          <div className="header-actions">
            <nav className="language-switch" aria-label={t('language')}>
              <a
                href={paths.es[alternate]}
                hrefLang="es"
                lang="es"
                aria-current={locale === 'es' ? 'true' : undefined}
                aria-label="Español"
              >
                ES
              </a>
              <span aria-hidden="true">/</span>
              <a
                href={paths.en[alternate]}
                hrefLang="en"
                lang="en"
                aria-current={locale === 'en' ? 'true' : undefined}
                aria-label="English"
              >
                EN
              </a>
            </nav>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t('close') : t('menu')}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
          aria-label={
            locale === 'es' ? 'Navegación móvil' : 'Mobile navigation'
          }
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
            <span className="status-pill">404</span>
            <h1>{c.notFound.title}</h1>
            <p>{c.notFound.body}</p>
            <a className="button primary" href={links.home}>
              {c.notFound.link}
              <ArrowRight size={18} />
            </a>
          </section>
        ) : page === 'home' ? (
          <>
            <section className="hero-section">
              <div className="container hero">
                <div className="hero-heading">
                  <p className="hero-kicker">
                    <img
                      src="/assets/images/buchonean2-logo-128.webp"
                      width="48"
                      height="48"
                      alt={c.footer.brand}
                    />
                    <span>{c.hero.tag}</span>
                  </p>
                  <h1>
                    {c.hero.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h1>
                </div>
                <figure className="hero-visual">
                  <PigeonPhoto locale={locale} priority />
                  <figcaption>
                    <span>{c.hero.caption}</span>
                    <span>{c.hero.captionSmall}</span>
                  </figcaption>
                </figure>
                <div className="hero-copy">
                  <p>{c.hero.body}</p>
                  <div className="hero-actions">
                    <a className="button primary" href={links.features}>
                      {c.explore}
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </a>
                    <span className="launch-note">
                      <span />
                      {c.soon}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hero-signature container">
                <span>{c.hero.signature}</span>
                <span>{c.hero.signatureEnd}</span>
              </div>
            </section>
            <section className="container section intro">
              <div className="section-heading">
                <h2>{c.intro.title}</h2>
                <p>{c.intro.body}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 pillar-grid">
                {c.pillars.map((item, i) => {
                  return (
                    <article className="pillar" key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                      <a
                        className="text-link"
                        href={
                          links[(['community', 'features', 'faq'] as const)[i]]
                        }
                      >
                        {item.link}
                        <ArrowUpRight size={17} />
                      </a>
                    </article>
                  )
                })}
              </div>
            </section>
            <section className="community-band">
              <div className="container community-inner">
                <div className="community-emblem">
                  <img
                    src="/assets/images/buchonean2-logo-256.webp"
                    width="256"
                    height="256"
                    alt={c.footer.brand}
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{c.communityTeaser.emblem}</p>
                </div>
                <div>
                  <h2>{c.communityTeaser.title}</h2>
                  <p>{c.communityTeaser.body}</p>
                  <a className="text-link" href={links.community}>
                    {c.communityTeaser.link}
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </section>
            <section className="container section home-faq">
              <div>
                <h2>{c.faqTitle}</h2>
                <a className="text-link" href={links.faq}>
                  {c.allFaq}
                  <ArrowUpRight size={18} />
                </a>
              </div>
              <FAQs locale={locale} limit={3} />
            </section>
          </>
        ) : (
          <>
            <section className={`container page-heading page-${page}`}>
              <span className="page-label">{c.nav[page]}</span>
              <h1>{c[page].title}</h1>
              <p>{c[page].intro}</p>
            </section>
            {page === 'features' && (
              <section className="container feature-section section-bottom">
                <div className="feature-intro">
                  <h2>{c.features.heading}</h2>
                  <p>{c.features.body}</p>
                </div>
                <ul className="feature-list">
                  {c.features.items.map((item) => (
                    <li key={item}>
                      <h3>{item}</h3>
                      <span>{c.features.status}</span>
                      <span className="feature-dot" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {page === 'community' && (
              <section className="container section-bottom">
                <div className="community-page-art">
                  <PigeonPhoto locale={locale} priority />
                  <h2>{c.community.heading}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8 values-grid">
                  {c.community.values.map((value) => {
                    return (
                      <article className="pillar" key={value.title}>
                        <h3>{value.title}</h3>
                        <p>{value.body}</p>
                      </article>
                    )
                  })}
                </div>
                <p className="content-note">{c.community.note}</p>
              </section>
            )}
            {page === 'faq' && (
              <section
                className="container narrow section-bottom"
                aria-label={c.nav.faq}
              >
                <FAQs locale={locale} />
              </section>
            )}
            {page === 'support' && (
              <section className="container support-grid section-bottom">
                <article className="support-panel">
                  <h2>{c.support.heading}</h2>
                  <p>{c.support.body}</p>
                  <a className="text-link" href={links.faq}>
                    {c.support.faq}
                    <ArrowUpRight size={18} />
                  </a>
                </article>
                <aside className="support-status">
                  <span className="status-pill">
                    <span />
                    {c.soon}
                  </span>
                  <h2>{c.support.status}</h2>
                  <p>{c.support.statusBody}</p>
                </aside>
              </section>
            )}
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
      <footer className="container site-footer">
        <div className="footer-top">
          <div>
            <Brand href={links.home} />
            <p>{c.footer.line}</p>
          </div>
          <nav aria-label={locale === 'es' ? 'Pie de página' : 'Footer'}>
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
      </footer>
    </>
  )
}
