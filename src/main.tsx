import React from 'react';
import GlobalStyle from './styles/globalStyles';
import ReactDOM from 'react-dom/client';
import App from './app';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GlobalStyle />
        < App />
    </React.StrictMode>,
);

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import Login from './containers/Login'
// import GlobalStyle from './styles/globalStyles'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <GlobalStyle />
//     <Login />
//   </React.StrictMode>,
// )

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
// }
