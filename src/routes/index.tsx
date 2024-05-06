import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { Dashboard } from '../containers/Admin Dashboard/index';
import { CadastroInstituicao } from '../containers/Institution Register/index';
import { BuscaCurso } from '../containers/Institution Register/searchCourse';
import { BuscaPoliticas } from '../containers/Institution Register/searchPolicies';
import { InstitutionProvider } from '../context/institutionContext';



export const AppRoutes: React.FC = () => {
    return (
        <Router>
        <InstitutionProvider>
            <Routes>
                <Route path='/cadastro' element={<CadastroInstituicao />} />
                <Route path='/cursos' element={<BuscaCurso />} />
                <Route path='/politicas' element={<BuscaPoliticas />} />
                <Route path='/' element={<Dashboard />} />
                <Route path='*' element={<Navigate to='/pagina-inicial' replace />} /> 
            </Routes>
        </InstitutionProvider>
        </Router>
    );
};