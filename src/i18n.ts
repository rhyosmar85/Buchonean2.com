import { createInstance } from 'i18next'
import type { Locale } from './content'
import { content } from './content'

export function createI18n(locale: Locale) {
  const instance = createInstance()
  void instance.init({
    lng: locale,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    resources: {
      es: { translation: content.es },
      en: { translation: content.en },
    },
    initImmediate: false,
    showSupportNotice: false,
    interpolation: { escapeValue: false },
  })
  return instance
}
