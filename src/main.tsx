import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import { createI18n } from './i18n'
import { paths, resolveRoute } from './content'
import './fonts.css'
import './styles.css'

const route = resolveRoute(
  window.location.pathname === '/' ? '/es/' : window.location.pathname,
)

// A language chosen with the ES / EN switch is remembered. Visitors arriving
// from another site are sent to the equivalent page in that language; links
// inside the site always keep the language in the URL.
try {
  const preferred = localStorage.getItem('buchonean2-locale')
  const external =
    !document.referrer ||
    new URL(document.referrer).origin !== window.location.origin
  if (
    route.found &&
    external &&
    (preferred === 'es' || preferred === 'en') &&
    preferred !== route.locale
  )
    window.location.replace(paths[preferred][route.page])
} catch {
  /* Storage can be unavailable; the URL still carries the language. */
}

const app = (
  <StrictMode>
    <I18nextProvider i18n={createI18n(route.locale)}>
      <App {...route} />
    </I18nextProvider>
  </StrictMode>
)
const root = document.getElementById('root')!
if (root.querySelector('main')) hydrateRoot(root, app)
else createRoot(root).render(app)
