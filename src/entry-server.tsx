import { renderToString } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import { createI18n } from './i18n'
import {
  content,
  paths,
  pages,
  moduleIds,
  anchors,
  type Locale,
  type Page,
} from './content'

export { content, paths, pages, moduleIds, anchors }
export function render(locale: Locale, page: Page, found = true) {
  return renderToString(
    <I18nextProvider i18n={createI18n(locale)}>
      <App locale={locale} page={page} found={found} />
    </I18nextProvider>,
  )
}
