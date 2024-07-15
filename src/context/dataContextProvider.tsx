import axios from 'axios';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Teste {
    id: number;
}

interface Usuario {
    id: number;
}

interface DataContext {
    usuario?: Usuario;
    teste?: Teste;
}

const DataContext = createContext<DataContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

interface DataProviderProps {
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
    const [teste, setTeste] = useState<Teste | undefined>(undefined);

    const loadData = async () => {

        try {
            const usuarioResponse = await axios.get(`${apiUrl}/obterUsuario`);
            setUsuario(usuarioResponse.data);

            const testeResponse = await axios.get(`${apiUrl}/teste/1`);
            setTeste(testeResponse.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    useEffect(() => {
        loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DataContext.Provider value={{ usuario, teste }}>
            {children}
        </DataContext.Provider>
    );
};
