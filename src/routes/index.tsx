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
// import HomePage from '../containers/HomePage';
// import StudentDashboard from '../containers/StudentDashboard';
// import InstitutionList from '../containers/HomePage/searchInstitution';
// import About from '../containers/HomePage/about';
// import CourseList from '../containers/Course Management';
import VocacionalTest from '../containers/Vocacional Test';

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
                    {/* <Route path='/gerenciamento-curso' element={<CourseList/>}/>
                    <Route path='/instituicao' element={<InstitutionList/>}/>
                    <Route path='/estudante' element={<StudentDashboard />} />
                    <Route path='/sobre' element={<About />} /> */}
                    <Route path='/admin' element={<Dashboard />} />
                    <Route path='/teste-vocacional' element={<VocacionalTest/>}/>
                    <Route path="/pagina-inicial" element={<Dashboard/>}/>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </InstitutionProvider>
        </BrowserRouter>
    );
};
