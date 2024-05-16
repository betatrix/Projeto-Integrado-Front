import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend) /** permite leitura dos arquivos no diretório public/locales ou de uma aplicação externa */
    .use(LanguageDetector) /** detecta idioma do navegador */
    .use(initReactI18next) /** inicializa a biblioteca */
    .init({ /** opções de configuração da biblioteca */
        fallbackLng: 'pt-BR' /** idioma utilizado caso o idioma detectado não seja suportado */,
        supportedLngs: ['pt-BR', 'en-US'] /** idiomas suportados */,
    });

export default i18n;