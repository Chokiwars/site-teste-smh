import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '@/locales/en/translation.json';
import translationPT from '@/locales/pt/translation.json';

i18n
  .use(LanguageDetector) // detecta idioma do navegador
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      pt: { translation: translationPT },
    },
    fallbackLng: 'pt',
    supportedLngs: ['en', 'pt'],
    detection: {
      order: ['localStorage', 'navigator'], // 👈 prioridade de detecção
      caches: ['localStorage'], // 👈 salva o idioma no localStorage
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
