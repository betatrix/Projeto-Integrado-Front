import React, { useEffect, useState } from 'react';
import Header from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';
import axios from 'axios';
import { CenteredDiv, ResultText } from './styles';

interface Resultado {
    id: number;
    mensagem: string;
}

const ResultadoTeste: React.FC<{ /*estudanteTestId: number*/ }> = (/*{ estudanteTestId }*/) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [resultado, setResultado] = useState<Resultado | null>(null);

    useEffect(() => {
        const fetchResultado = async () => {
            try {
                const response = await axios.get(`${apiUrl}/resultado/estudanteTeste/1`);
                setResultado(response.data);
            } catch (error) {
                console.error('Erro ao buscar resultado do teste:', error);
            }
        };

        fetchResultado();
    }, [apiUrl]);

    return (
        <>
            <Header />
            <CenteredDiv>
                <ResultText>{resultado?.mensagem}</ResultText>
            </CenteredDiv>
            <Footer />
        </>
    );
};

export default ResultadoTeste;
