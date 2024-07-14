// src/components/PrivateRoute.tsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const authContext = useContext(AuthContext);
    console.log(authContext)
    console.log("HERE2--------------------")

    if (!authContext) {
        console.log('AuthContext is undefined');
        return null;
    }

    const { isAuthenticated } = authContext;

    console.log('isAuthenticated:', isAuthenticated);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;