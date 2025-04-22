import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from './locales/en.json';
import translationUz from './locales/uz.json';
import translationRu from './locales/ru.json';

const resources = {
  en: { translation: translationEn },
  uz: { translation: translationUz },
  ru: { translation: translationRu },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
