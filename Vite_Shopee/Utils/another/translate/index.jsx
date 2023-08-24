import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { en, jp } from './listLangs.jsx';

const selectedLanguage = localStorage.getItem('selectedLanguage');
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    lng: selectedLanguage || 'jp',
    resources: {
      en,
      jp,
    },
  });

export default i18n;
