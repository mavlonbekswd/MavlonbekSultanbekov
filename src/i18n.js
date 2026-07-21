import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en.json';
import translationRu from './locales/ru.json';
import translationUz from './locales/uz.json';

const resources = {
  en: { translation: translationEn },
  ru: { translation: translationRu },
  uz: { translation: translationUz },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'uz'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'portfolio-language-preference',
    },
  });

const updateDocumentLanguage = (language) => {
  document.documentElement.lang = language?.split('-')[0] || 'en';
};

updateDocumentLanguage(i18n.resolvedLanguage);
i18n.on('languageChanged', updateDocumentLanguage);

export default i18n;
