import React, { useState, useEffect } from 'react';
import Header from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';
import { Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { CenteredDiv, ButtonGroup, RadioContainer } from './styles';
import axios from 'axios';

interface EstudanteTeste {
    id: number;
    teste: Teste;
    estudante: Estudante;
    data: string;
}

interface Estudante {
    id: number;
    nome: string;
    email: string;
    senha: string;
    dataNascimento: string;
    celular: string;
    ativo: boolean;
}

interface Teste {
    id: number;
    titulo: string;
    descricao: string;
    ativo: boolean;
}

const VocacionalTest: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(30).fill(0));
    const [questions, setQuestions] = useState<string[]>([]);
    const [estudanteTeste, setEstudanteTeste] = useState<EstudanteTeste | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/pergunta/teste/1`);
                setQuestions(response.data.map((pergunta: { texto: string }) => pergunta.texto));
            } catch (error) {
                console.error('Erro ao buscar perguntas:', error);
            }
        };

        const fetchEstudanteTeste = async () => {
            try {
                const response = await axios.get(`${apiUrl}/estudanteTeste/1`);
                setEstudanteTeste(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do estudante:', error);
            }
        };

        fetchQuestions();
        fetchEstudanteTeste();
    }, [apiUrl]);

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = parseInt(event.target.value, 10);
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        if (!estudanteTeste) {
            console.error('EstudanteTeste não carregado');
            return;
        }

        const payload = {
            estudanteTeste: {
                id: estudanteTeste.id,
                teste: estudanteTeste.teste,
                estudante: estudanteTeste.estudante,
                data: estudanteTeste.data,
            },
            respostas: answers.map((resposta, index) => ({
                perguntaId: index + 1,
                resposta
            }))
        };

        try {
            const response = await axios.post(`${apiUrl}/resposta`, payload);
            console.log('Respostas enviadas com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao enviar as respostas:', error);
        }
    };

    const allQuestionsAnswered = answers.every(answer => answer !== 0);

    return (
        <>
            <Header />
            <CenteredDiv>
                <Typography variant="h5" gutterBottom>
                    {questions[currentQuestion]}
                </Typography>
                <RadioGroup
                    row
                    value={answers[currentQuestion]}
                    onChange={handleAnswerChange}
                >
                    {[1, 2, 3, 4, 5].map((value) => (
                        <RadioContainer key={value}>
                            <FormControlLabel value={value} control={<Radio />} label="" />
                            <Typography variant="caption">{value}</Typography>
                        </RadioContainer>
                    ))}
                </RadioGroup>
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        disabled={currentQuestion === questions.length - 1}
                    >
                        Próximo
                    </Button>
                </ButtonGroup>
                {currentQuestion === questions.length - 1 && allQuestionsAnswered && (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                        style={{ marginTop: '20px' }}
                    >
                        Enviar
                    </Button>
                )}
            </CenteredDiv>
            <Footer />
        </>
    );
};

export default VocacionalTest;
