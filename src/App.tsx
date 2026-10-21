import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  UsersRound,
  Sprout,
  MessageCircle,
  Heart,
  Compass,
  CircleHelp,
  Plus,
  Smartphone,
} from 'lucide-react'
import { content, paths, pages, type Locale, type Page } from './content'

type Props = { locale: Locale; page: Page; found: boolean }

function ConnectionArt({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? 'connection-art compact' : 'connection-art'}
      viewBox="0 0 540 520"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="270"
        cy="260"
        r="205"
        stroke="currentColor"
        strokeOpacity=".2"
      />
      <circle
        cx="270"
        cy="260"
        r="147"
        stroke="currentColor"
        strokeOpacity=".2"
      />
      <path
        d="M70 268C160 133 352 113 467 235M89 368C175 431 373 397 454 300"
        stroke="currentColor"
        strokeOpacity=".3"
        strokeDasharray="5 8"
      />
      <path
        d="M266 357C164 341 111 273 132 218C153 164 222 170 268 246C306 151 372 140 406 183C452 243 369 328 266 357Z"
        fill="#d9efbd"
      />
      <path
        d="M267 355C281 296 286 238 348 198M267 355C239 287 204 241 161 216"
        stroke="#125c41"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="114" cy="126" r="40" fill="#fff" />
      <circle cx="114" cy="117" r="10" fill="#79a787" />
      <path d="M94 148C94 124 134 124 134 148" fill="#79a787" />
      <circle cx="431" cy="355" r="46" fill="#e5eddf" />
      <circle cx="431" cy="344" r="12" fill="#125c41" />
      <path d="M408 379C408 350 454 350 454 379" fill="#125c41" />
      <circle cx="150" cy="420" r="29" fill="#d9efbd" />
      <path d="M138 420H162M150 408V432" stroke="#125c41" strokeWidth="2" />
      <circle cx="383" cy="97" r="8" fill="#d9efbd" />
      <circle cx="71" cy="319" r="5" fill="#d9efbd" />
      <path d="M302 79V97M293 88H311" stroke="currentColor" strokeWidth="2" />
    </svg>
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
          <a
            className="wordmark"
            href={links.home}
            aria-label="Buchonean2"
            title={c.footer.brand}
          >
            buchonean<span>2</span>
            <span className="brand-dot" aria-hidden="true" />
          </a>
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
            <section className="container hero">
              <div className="hero-copy">
                <span className="status-pill">
                  <span />
                  {c.soon}
                </span>
                <h1>{c.hero.title}</h1>
                <p>{c.hero.body}</p>
                <a className="button primary" href={links.community}>
                  {c.discover}
                  <ArrowUpRight size={19} />
                </a>
                <div className="hero-note">
                  <span className="tiny-line" />
                  {c.hero.tag}
                </div>
              </div>
              <div className="hero-visual">
                <div className="art-top">
                  <span>buchonean2</span>
                  <span className="art-symbol" aria-hidden="true">
                    ✳
                  </span>
                </div>
                <ConnectionArt />
                <div className="art-bottom">
                  <p>{c.hero.caption}</p>
                  <span>{c.hero.captionSmall}</span>
                </div>
              </div>
            </section>
            <section className="container section intro">
              <div className="section-heading">
                <h2>{c.intro.title}</h2>
                <p>{c.intro.body}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 pillar-grid">
                {c.pillars.map((item, i) => {
                  const Icon = [UsersRound, Sprout, CircleHelp][i]
                  return (
                    <article className="pillar" key={item.title}>
                      <div className="icon-box">
                        <Icon size={25} />
                      </div>
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
                <div className="community-mark" aria-hidden="true">
                  <UsersRound strokeWidth={1} />
                  <span className="orbit-dot" />
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
                <span className="icon-box">
                  <MessageCircle size={24} />
                </span>
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
                  <span className="icon-box">
                    <Smartphone size={28} />
                  </span>
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
                  <ConnectionArt compact />
                  <h2>{c.community.heading}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8 values-grid">
                  {c.community.values.map((value, i) => {
                    const Icon = [Heart, Compass, UsersRound][i]
                    return (
                      <article className="pillar" key={value.title}>
                        <span className="icon-box">
                          <Icon size={25} />
                        </span>
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
                  <span className="icon-box">
                    <MessageCircle size={26} />
                  </span>
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
          <section className="availability">
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
            <a className="wordmark" href={links.home} title={c.footer.brand}>
              buchonean<span>2</span>
              <span className="brand-dot" aria-hidden="true" />
            </a>
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
