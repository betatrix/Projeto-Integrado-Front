import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../containers/AdminDashboard/index';
import {CadastroInstituicao} from '../containers/Institution Register/index';
import { BuscaCurso } from '../containers/Institution Register/searchCourse';
import InstitutionManagement from '../containers/Institution Management/index';
import HomePage from '../containers/HomePage';
import StudentDashboard from '../containers/StudentDashboard';
import InstitutionList from '../containers/StudentDashboard/searchInstitution';
import About from '../containers/HomePage/about';
import CourseList from '../containers/Course Management';
import DataStudent from '../containers/StudentDashboard/perfilStudent';
import VocacionalTest from '../containers/VocacionalTest';
import Login from '../containers/Login/index';
import Register from '../containers/Register/index';
import SucessPassword from '../containers/Register/SucessPassword';
import NovaSenha from '../containers/New Password';
import RecuperarSenha from '../containers/Recover Password';
import { BuscaPoliticas } from '../containers/Institution Register/searchPolicies';
import { InstitutionProvider } from '../context/institutionContext';
import ResultadoTeste from '../containers/ResultTest';
import { AuthProvider } from '../contexts/auth';
import PrivateRoute from '../components/routes/privateRoutes';

export const AppRoutes = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <InstitutionProvider>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/recuperar-senha" element={<RecuperarSenha/>}/>
                        <Route path="/nova-senha" element={<NovaSenha/>}/>
                        <Route path="/success-change-password" element={<SucessPassword/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/resultado" element={<ResultadoTeste/>}/>
                        <Route path='/perfil' element={<DataStudent/>}/>
                        <Route path='/estudante' element={<StudentDashboard />} />
                        <Route path='/sobre' element={<About />} />
                        <Route path='/admin' element={<Dashboard />} />
                        <Route path='/teste-vocacional' element={<VocacionalTest/>}/>
                        <Route path='/pagina-inicial' element={<HomePage />} />

                        {/* Private Routes - Admin */}
                        <Route element={<PrivateRoute requiredRole="ADMINISTRADOR" />}>
                            <Route path="/cadastro" element={<CadastroInstituicao />} />
                            <Route path="/cursos" element={<BuscaCurso />} />
                            <Route path='/politicas' element={<BuscaPoliticas />} />
                            <Route path='/gerenciamento-curso' element={<CourseList/>}/>
                            <Route path='/instituicao' element={<InstitutionList/>}/>
                            <Route path="/gerenciamento-instituicao" element={<InstitutionManagement />} />
                            <Route path="/pagina-inicial" element={<Dashboard />} />
                        </Route>

                        <Route path='*' element={<Navigate to='/pagina-inicial' replace />} />
                        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                    </Routes>
                </InstitutionProvider>
            </BrowserRouter>
        </AuthProvider>
    );
};
