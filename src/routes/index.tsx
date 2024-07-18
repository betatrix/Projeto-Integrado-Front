import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../containers/AdminDashboard/index';
import {CadastroInstituicao} from '../containers/Institution Register/index';
import { BuscaCurso } from '../containers/Institution Register/searchCourse';
import InstitutionManagement from '../containers/Institution Management/index';
import Login from '../containers/Login/index';
import Register from '../containers/Register/index';
import NovaSenha from '../containers/New Password';
import RecuperarSenha from '../containers/Recover Password';
import SucessPassword from '../containers/SucessPassword';
import { InstitutionProvider } from '../context/institutionContext';
import VocacionalTest from '../containers/VocacionalTest';

export const AppRoutes = () =>{
    return(
        <BrowserRouter>
            <InstitutionProvider>
                <Routes>
                    <Route path="/cadastro" element={<CadastroInstituicao/>}/>
                    <Route path="/cursos" element={<BuscaCurso/>}/>
                    <Route path="/gerenciamento-instituicao" element={<InstitutionManagement/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/recuperar-senha" element={<RecuperarSenha/>}/>
                    <Route path="/nova-senha" element={<NovaSenha/>}/>
                    <Route path="/success-change-password" element={<SucessPassword/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/pagina-inicial" element={<Dashboard/>}/>
                    <Route path="/teste-vocacional" element={<VocacionalTest/>}/>
                    <Route path="*" element={<Navigate to="/teste-vocacional" replace />} />
                </Routes>
            </InstitutionProvider>
        </BrowserRouter>
    );
};