import React, { useState, useEffect } from 'react';
import Header from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';
import { Button, Typography, RadioGroup, FormControlLabel, Radio, LinearProgress } from '@mui/material';
import { CenteredDiv, ButtonGroup, RadioContainer } from './styles';
import axios from 'axios';

interface Teste {
    id: number;
}

interface Pergunta {
    id: number;
    texto: string;
    ativo: boolean;
    testeId: number;
}

interface Usuario {
    id: number;
}

const VocacionalTest: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(30).fill(0));
    const [questions, setQuestions] = useState<Pergunta[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [teste, setTeste] = useState<Teste | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/pergunta/teste/1`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Erro ao buscar perguntas:', error);
            }
        };

        const fetchInitialData = async () => {
            try {
                const testeResponse = await axios.get(`${apiUrl}/teste/1`);
                setTeste(testeResponse.data);

                if (usuario?.id) {
                    const usuarioResponse = await axios.get(`${apiUrl}/estudante/${usuario.id}`);
                    setUsuario(usuarioResponse.data);
                }
            } catch (error) {
                console.error('Erro ao buscar dados iniciais:', error);
            }
        };

        fetchQuestions();
        fetchInitialData();
    }, [apiUrl, teste?.id, usuario?.id]);

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
        const payload = {
            estudanteTeste: {
                testeId: teste?.id,
                usuarioId: 1,
            },
            respostas: answers.map((resposta, index) => ({
                perguntaId: questions[index].id,
                resposta,
            })),
        };

        try {
            const response = await axios.post(`${apiUrl}/resposta`, payload);
            console.log('Respostas enviadas com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao enviar as respostas:', error);
        }
    };

    const allQuestionsAnswered = answers.every((answer) => answer !== 0);

    const isAnswerSelected = answers[currentQuestion] !== 0;

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <>
            <Header />
            <CenteredDiv>
                <LinearProgress style={{ width: '70%', marginBottom: '70px' }} variant="determinate" value={progress} />
                <Typography variant="h5" gutterBottom>
                    {questions[currentQuestion]?.texto}
                </Typography>
                <RadioGroup row value={answers[currentQuestion]} onChange={handleAnswerChange}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <RadioContainer key={value}>
                            <FormControlLabel
                                value={value}
                                control={<Radio />}
                                label=""
                                disabled={!questions[currentQuestion]?.ativo}
                            />
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
                        disabled={currentQuestion === questions.length - 1 || !isAnswerSelected}
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
