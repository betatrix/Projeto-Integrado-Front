import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import  Dashboard  from '../containers/AdminDashboard/index';
import {CadastroInstituicao} from '../containers/Institution Register/index';
import { Course } from '../containers/Institution Register/searchCourse';
import InstitutionManagement from '../containers/Institution Management/index';
import Login from '../containers/Login/index';
import Register from '../containers/Register/index';
import NovaSenha from '../containers/New Password';
import RecuperarSenha from '../containers/Recover Password';
import SucessPassword from '../containers/SucessPassword';

export const AppRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<CadastroInstituicao/>}/>
                <Route path="/cursos" element={<Course/>}/>
                <Route path="/gerenciamento-instituicao" element={<InstitutionManagement/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/recuperar-senha" element={<RecuperarSenha/>}/>
                <Route path="/nova-senha" element={<NovaSenha/>}/>
                <Route path="/success-change-password" element={<SucessPassword/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/pagina-inicial" element={<Dashboard/>}/>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};