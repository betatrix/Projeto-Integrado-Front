import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../../components/studentHeader';
import Footer from '../../../components/studentFooter';
import { IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button as MuiButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CenteredDiv, ButtonGroup, StyledLinearProgress, Global, IntroText, homePageBoxStyles, StyledTypography, CustomButton, ModalText, BackButton } from './styles';
import axios from 'axios';
import AnswerOptions from './answerOptions';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';

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
    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(30).fill(0));
    const [questions, setQuestions] = useState<Pergunta[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [teste, setTeste] = useState<Teste | null>(null);
    const [showModal, setShowModal] = useState(true);
    const [showExitModal, setShowExitModal] = useState(false);

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

    const authcontext = useContext(AuthContext);

    if (!authcontext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }
    const userData = authcontext.user ? decryptData(authcontext.user) : null;

    const user = userData ? JSON.parse(userData) : null;

    const handleSubmit = async () => {
        const payload = {
            estudanteTeste: {
                testeId: teste?.id,
                usuarioId: user.id,
            },
            respostas: answers.map((resposta, index) => ({
                perguntaId: questions[index].id,
                resposta,
            })),
        };

        try {
            const response = await axios.post(`${apiUrl}/resposta`, payload);
            console.log('Respostas enviadas com sucesso:', response.data);

            navigate('/resultado', { state: { resultado: response.data } });
        } catch (error) {
            console.error('Erro ao enviar as respostas:', error);
        }
    };

    const handleStartTest = () => {
        setShowModal(false);
    };

    const handleBackToDashboard = () => {
        setShowExitModal(true);
    };

    const confirmExit = () => {
        setShowExitModal(false);
        navigate('/estudante');
    };

    const cancelExit = () => {
        setShowExitModal(false);
    };

    const allQuestionsAnswered = answers.every((answer) => answer !== 0);
    const isAnswerSelected = answers[currentQuestion] !== 0;
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <>
            <Global />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
            </style>
            <Header />
            <BackButton startIcon={<ArrowBackIcon />} onClick={handleBackToDashboard} style={{fontSize: '12px', fontWeight: 'bold'}}>
                Dashboard
            </BackButton>
            <Box sx={homePageBoxStyles}>
                <CenteredDiv>
                    <IntroText variant="body1" align="center" paragraph>
                        Responda às afirmações abaixo com o quanto você se identifica com cada uma delas
                    </IntroText>
                    <StyledLinearProgress variant="determinate" value={progress} />
                    <StyledTypography variant="h6" gutterBottom>
                        {questions[currentQuestion]?.texto}
                    </StyledTypography>
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
                        <IntroText variant="body1">
                            {currentQuestion + 1} - {questions.length}
                        </IntroText>
                        <IconButton
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1 || !isAnswerSelected}
                            style={{ fontSize: '3rem' }}
                        >
                            <NavigateNextIcon fontSize="inherit" />
                        </IconButton>
                    </ButtonGroup>
                    {currentQuestion === questions.length - 1 && allQuestionsAnswered && (
                        <CustomButton
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            style={{ marginTop: '30px' }}
                        >
                            Enviar
                        </CustomButton>
                    )}
                </CenteredDiv>
            </Box>
            <Footer />

            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                PaperProps={{
                    style: {
                        width: '90%',
                        maxWidth: '800px',
                        margin: 'auto',
                        borderRadius: '10px',
                        height: '470px',
                        padding: '20px'
                    },
                }}
            >
                <DialogTitle style={{ textAlign: 'center', fontSize: '22px', marginBottom: '15px' }}>Antes de começar ...</DialogTitle>

                <DialogContent>
                    <ModalText variant="body1" style={{ fontSize: '16px' }}>
                        Nosso teste vocacional é inpirado na teoria do psicólogo John L. Holland, conhecida como RIASEC - Realista, Investigativo, Artístico, Social, Empreendedor e Convencional.
                    </ModalText>
                    <br />
                    <ModalText>
                        Essa teoria divide as pessoas em seis tipos diferentes de personalidade e ambientes de trabalho. Ao responder ao teste, suas características são comparadas com esses seis tipos para sugerir carreiras e áreas de estudo que combinam com o seu perfil.
                    </ModalText>
                    <br />
                    <ModalText>
                        Além disso, usamos essas informações para ajudar você a encontrar cursos e universidades que se encaixam no seu perfil, aumentando suas chances de se sentir realizado e ter sucesso na sua trajetória profissional.
                    </ModalText>
                </DialogContent>

                <DialogActions>
                    <CustomButton onClick={handleStartTest} color="primary" style={{ justifyItems: 'center', width: '200px', height: '40px' }}>
                        Iniciar Teste
                    </CustomButton>
                </DialogActions>
            </Dialog>

            {/* Modal de Confirmação de Saída */}
            <Dialog
                open={showExitModal}
                onClose={cancelExit}
                PaperProps={{
                    style: {
                        width: '90%',
                        maxWidth: '400px',
                        margin: 'auto',
                        borderRadius: '10px',
                        padding: '20px',
                    },
                }}
            >
                <DialogTitle style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px' }}>Tem certeza de que deseja sair?</DialogTitle>
                <DialogContent>
                    <ModalText variant="body1" style={{ fontSize: '16px' }}>
                        Suas respostas atuais não serão salvas se você sair agora.
                    </ModalText>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={confirmExit} color="primary">
                        Sair
                    </MuiButton>
                    <MuiButton onClick={cancelExit} color="secondary">
                        Cancelar
                    </MuiButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VocacionalTest;
