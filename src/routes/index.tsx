import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import  Dashboard  from '../containers/AdminDashboard/index';

import { CadastroInstituicao } from '../containers/Institution Register/index';
import { BuscaCurso } from '../containers/Institution Register/searchCourse';
import { BuscaPoliticas } from '../containers/Institution Register/searchPolicies';
import { InstitutionProvider } from '../context/institutionContext';
import  InstitutionManagement  from '../containers/Institution Management/index';


export const AppRoutes: React.FC = () => {
    return (
        <Router>
            <InstitutionProvider>
                <Routes>
                    <Route path='/cadastro' element={<CadastroInstituicao />} />
                    <Route path='/cursos' element={<BuscaCurso />} />
                    <Route path='/politicas' element={<BuscaPoliticas />} />
                    <Route path='/gerenciamento-instituicao' element={<InstitutionManagement/>}/>
                    <Route path='/pagina-inicial' element={<Dashboard />} />
                    <Route path='*' element={<Navigate to='/pagina-inicial' replace />} /> 
                </Routes>
            </InstitutionProvider>
        </Router>
    );
};