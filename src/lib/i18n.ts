import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../public/locale/en-US/en.json';
import ptTranslations from '../public/locale/pt-BR/pt.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            ...enTranslations
        },

        pt: {
            ...ptTranslations
        },
    },
    lng: 'en',
});
