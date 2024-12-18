/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState, useEffect, createContext } from 'react';
import { decryptData, encryptData } from '../services/encryptionService';
import { StudentUpdateForm } from '../types/studentTypes';

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    student: any;
    admin: any;
    role: string | null;
    login: (token: string, user: any, role: string, student: any, admin: any) => void;
    logout: () => void;
    updateUserPhoto: (fotoUrl: string) => void;
    updateStudentInfo: (data: StudentUpdateForm) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [student, setStudent] = useState<any>(null);
    const [admin, setAdmin] = useState<any>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const login = (token: string, user: any, role: string, student: any, admin: any) => {
        const expirationTime = Date.now() + 3600 * 1000; // Token válido por 1 hora
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);
        localStorage.setItem('student', JSON.stringify(student));
        localStorage.setItem('admin', JSON.stringify(admin));
        localStorage.setItem('tokenExpiration', expirationTime.toString());
        setIsAuthenticated(true);
        setStudent(student);
        setAdmin(admin);
        setUser(user);
        setRole(role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('student');
        localStorage.removeItem('admin');
        localStorage.removeItem('role');
        localStorage.removeItem('tokenExpiration');
        setIsAuthenticated(false);
        setUser(null);
        setStudent(null);
        setAdmin(null);
        setRole(null);
        window.location.href = '/login';
    };

    const updateUserPhoto = (fotoUrl: string) => {
        setUser((prevUserEncrypted: any) => {
            const prevUserData = decryptData(prevUserEncrypted);

            if (!prevUserData) {
                console.error('Erro: Usuário anterior não encontrado');
                return null;
            }

            const prevUser = JSON.parse(prevUserData);

            const updatedUser = {
                ...prevUser,
                fotoDePerfil: fotoUrl,
            };

            const updatedUserEncrypted = encryptData(JSON.stringify(updatedUser));

            // Atualizar o localStorage com o user criptografado
            localStorage.setItem('user', updatedUserEncrypted);

            return updatedUserEncrypted;
        });
    };

    const updateStudentInfo = (data: StudentUpdateForm) => {
        setUser((prevStudentEncrypted: any) => {
            const prevStudentData = decryptData(prevStudentEncrypted);

            if (!prevStudentData) {
                console.error('Erro: Usuário anterior não encontrado');
                return null;
            }

            const prevStudent = JSON.parse(prevStudentData);

            const updatedStudent = {
                ...prevStudent,
                nome: data.nome,
                email: data.email,
                dataNascimento: data.dataNascimento,
                celular: data.celular,
                nivelEscolar: data.nivelEscolar,
            };

            const updatedStudentEncrypted = encryptData(JSON.stringify(updatedStudent));

            localStorage.setItem('student', JSON.stringify(updatedStudentEncrypted));

            return updatedStudentEncrypted;
        });
    };

    const checkTokenExpiration = () => {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
            logout();
        } else {
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        const storedStudent = localStorage.getItem('student');
        const storedAdmin = localStorage.getItem('admin');
        const storedRole = localStorage.getItem('role');

        if (token && storedUser) {
            try {
                const user = JSON.parse(storedUser);
                const student = storedStudent ? JSON.parse(storedStudent) : null;
                const admin = storedAdmin ? JSON.parse(storedAdmin) : null;
                const role = storedRole || null;
                checkTokenExpiration();
                if (token && user) {
                    setIsAuthenticated(true);
                    setUser(user);
                    setRole(role);
                    setStudent(student);
                    setAdmin(admin);
                }
            } catch (error) {
                console.error('Erro ao analisar os dados do usuário');
                logout();
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, student, admin, role, login, logout, updateUserPhoto, updateStudentInfo }}>
            {children}
        </AuthContext.Provider>
    );
};