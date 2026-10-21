import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import { createI18n } from './i18n'
import { resolveRoute } from './content'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/barlow-condensed/latin-700.css'
import './styles.css'

const route = resolveRoute(
  window.location.pathname === '/' ? '/es/' : window.location.pathname,
)
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
