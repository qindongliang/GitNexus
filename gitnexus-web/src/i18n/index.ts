import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGE_CODES,
  getLanguageMetadata,
} from './languages';
import { namespaceList, resources } from './resources';

const DEFAULT_NAMESPACE = 'common';

function syncDocumentLanguage(language: string | undefined): void {
  if (typeof document === 'undefined') return;
  const metadata = getLanguageMetadata(language);
  document.documentElement.lang = metadata.code;
  document.documentElement.dir = metadata.dir;
}

export const i18nReady = i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    load: 'currentOnly',
    ns: namespaceList,
    defaultNS: DEFAULT_NAMESPACE,
    fallbackNS: false,
    returnEmptyString: false,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })
  .then(() => {
    const language = i18n.resolvedLanguage || i18n.language;
    syncDocumentLanguage(language);
  });

i18n.on('languageChanged', (language) => {
  const resolvedLanguage = i18n.resolvedLanguage || language;
  syncDocumentLanguage(resolvedLanguage);
});

export default i18n;
