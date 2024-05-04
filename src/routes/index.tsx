import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../containers/AdminDashboard/index';
import { CadastroInstituicao } from '../containers/Institution Register/index';
import { Course } from '../containers/Institution Register/searchCourse';

export const AppRoutes = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<CadastroInstituicao/>}/>
                <Route path="/cursos" element={<Course/>}/>
                <Route path="/geren-instituicao"/>
                <Route path="/pagina-inicial" element={<Dashboard/>}/>
                <Route path="*" element={<Navigate to="/pagina-inicial" replace />} />
            </Routes>
        </BrowserRouter>
    );
};