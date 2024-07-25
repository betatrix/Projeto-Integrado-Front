import React, { useState, useEffect } from 'react';
import Header from '../../../components/adminHeader';
import Footer from '../../../components/adminFooter';
import { IconButton, Typography, Box } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CenteredDiv, ButtonGroup, StyledLinearProgress, Global, StyledButton, IntroText, homePageBoxStyles } from './styles';
import axios from 'axios';
import AnswerOptions from './answerOptions';

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

    const handleAnswerChange = (value: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestion] = value;
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
            <Global />
            <Header />
            <Box sx={homePageBoxStyles}>
                <CenteredDiv>
                    <IntroText variant="body1" align="center" paragraph>
                    Responda às afirmações abaixo com o quanto você se identifica com cada uma delas
                    </IntroText>
                    <StyledLinearProgress variant="determinate" value={progress} />
                    <Typography variant="h5" gutterBottom>
                        {questions[currentQuestion]?.texto}
                    </Typography>
                    <AnswerOptions
                        value={answers[currentQuestion]}
                        onChange={handleAnswerChange}
                        disabled={!questions[currentQuestion]?.ativo}
                    />
                    <ButtonGroup>
                        <IconButton
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            style={{ fontSize: '3rem' }}
                        >
                            <NavigateBeforeIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1 || !isAnswerSelected}
                            style={{ fontSize: '3rem' }}
                        >
                            <NavigateNextIcon fontSize="inherit" />
                        </IconButton>
                    </ButtonGroup>
                    {currentQuestion === questions.length - 1 && allQuestionsAnswered && (
                        <StyledButton
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            style={{ marginTop: '30px' }}
                        >
                            Enviar
                        </StyledButton>
                    )}
                </CenteredDiv>
            </Box>
            <Footer />
        </>
    );
};

export default VocacionalTest;
