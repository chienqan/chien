import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './en.json';
import viTranslations from './vi.json';

i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      vi: {
        translation: viTranslations
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next; 