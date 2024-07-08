import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../public/locale/en-US/en.json';
import ptTranslations from '../public/locale/pt-BR/pt.json';

// i18n.use(initReactI18next).init({
//     resources: {
//         en: {
//             ...enTranslations
//         },

//         pt: {
//             ...ptTranslations
//         },
//     },
//     lng: 'en',
// });

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslations
        },
        pt: {
            translation: ptTranslations
        },
    },
    lng: 'en', // Define o idioma padrão
    fallbackLng: 'en', // Define o idioma de fallback
    interpolation: {
        escapeValue: false // O React já faz escaping dos valores
    }
});

export default i18n;
