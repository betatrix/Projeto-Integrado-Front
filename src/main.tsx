import React from 'react';
import GlobalStyle from './styles/globalStyles';
import ReactDOM from 'react-dom/client';
import App from './app';
import { AuthProvider } from './contexts/auth';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <React.StrictMode>
            <GlobalStyle />
            < App />
        </React.StrictMode>
    </AuthProvider>
);

//TODO(beatriz.andrade) utilizar nas páginas que precisa de tradução
//TODO(beatriz.andrade) verificar modo de armazenar estado do handleChangeLanguage

// const{
//     t,
//     i18n: {
//         changeLanguage, language
//     },
// } = useTranslation();

// const[currentLanguage, setCurrentLanguage] = useState(language);

// const handleChangeLanguage = () => {
//     const newLanguage = currentLanguage === 'en' ? 'pt' : 'en'
//     changeLanguage(newLanguage);
//     setCurrentLanguage(newLanguage);
// };

