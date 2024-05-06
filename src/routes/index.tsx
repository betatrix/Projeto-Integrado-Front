import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from '../containers/Admin Dashboard/index';
import { CadastroInstituicao } from '../containers/Institution Register/index';
import { BuscaCurso } from '../containers/Institution Register/searchCourse';
import { BuscaPoliticas } from '../containers/Institution Register/searchPolicies';



export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/cadastro' element={<CadastroInstituicao />} />
                <Route path='/cursos' element={<BuscaCurso />} />
                <Route path='/politicas' element={<BuscaPoliticas />} />
                <Route path='/pagina-inicial' element={<Dashboard />} />
                <Route path='*' element={<Navigate to='/pagina-inicial' replace />} />
            </Routes>
        </BrowserRouter>
    );
};