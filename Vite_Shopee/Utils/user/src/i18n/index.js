import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { STORAGE } from '../utils'
import EN from './en.json'
import JP from './jp.json'
import VI from './vi.json'

const resources = {
  vi: {
    translation: VI
  },
  en: {
    translation: EN
  },
  jp: {
    translation: JP
  }
}

const INIT_LANGUAGE = window.localStorage.getItem(STORAGE.LANGUAGE) || 'jp'

i18next
  .use(initReactI18next)
  .init({
    resources,
    backend: {
      loadPath: './{{lng}}.json'
    },
    react: {
      useSuspense: true
    },
    lng: INIT_LANGUAGE,
    fallbackLng: INIT_LANGUAGE,
    preload: [INIT_LANGUAGE],
    interpolation: { escapeValue: false }
  })

i18next.off('languageChanged')
i18next.on('languageChanged', (language) => {
  window.localStorage.setItem(STORAGE.LANGUAGE, language)
})

export default i18next
