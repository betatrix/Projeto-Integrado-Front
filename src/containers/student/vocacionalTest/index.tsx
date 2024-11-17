import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/vocacionalTestHeader';
import { IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button as MuiButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CenteredDiv, ButtonGroup, StyledLinearProgress, Global, IntroText, homePageBoxStyles, StyledTypography,
    CustomButton, ModalText, BackButton, CustomLink, CourseCustomButton } from './styles';
import axios from 'axios';
import AnswerOptions from './answerOptions';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import { useTranslation } from 'react-i18next';

interface Teste {
    id: number;
}

interface Pergunta {
    id: number,
    texto: string,
    textoIngles: string,
    ativo: true
}

interface Usuario {
    id: number;
}

const VocacionalTest: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const{ t, i18n } = useTranslation();
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
                const response = await axios.get(`${apiUrl}/pergunta/teste/1`, {
                    params: { language: i18n.language }
                });
                setQuestions(response.data);
            } catch (error) {
                console.error('Erro ao buscar perguntas');
                throw error;
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
                console.error('Erro ao buscar dados iniciais');
                throw error;
            }
        };

        fetchQuestions();
        fetchInitialData();
    }, [apiUrl, i18n, teste?.id, usuario?.id]);

    useEffect(() => {
        const savedAnswers = localStorage.getItem('vocationalTestAnswers');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

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

        localStorage.setItem('vocationalTestAnswers', JSON.stringify(updatedAnswers));
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

            localStorage.removeItem('vocationalTestAnswers');

            navigate('/resultado', { state: { resultado: response.data } });
        } catch (error) {
            console.error('Erro ao enviar as respostas');
            throw error;
        }
    };

    const handleStartTest = () => {
        setShowModal(false);
    };

    const confirmExit = () => {
        setShowExitModal(false);
        navigate('/estudante');
    };

    const cancelExit = () => {
        setShowExitModal(false);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [modalStep, setModalStep] = useState(1);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isButtonSelected, setIsButtonSelected] = useState(false);

    const handleNextModalStep = () => {
        if (modalStep < 2) {
            setModalStep(modalStep + 1);
        }
    };

    const handleBeforeModalStep = () => {
        if (modalStep === 2) {
            setModalStep(modalStep - 1);
        }
    };

    const handleCourseTypeSelection = (type: string) => {
        setSelectedButton(type);
        setIsButtonSelected(true);
        console.log(`Tipo de curso selecionado: ${type}`);
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

            <BackButton
                startIcon={<ArrowBackIcon />}

            >
                <CustomLink to={'/estudante'}> {t('backButton')}
                </CustomLink>
            </BackButton>

            <Box sx={homePageBoxStyles}>
                <CenteredDiv>
                    <IntroText variant="body1" align="center" paragraph>
                        {t('testInstruction')}
                    </IntroText>
                    <StyledLinearProgress variant="determinate" value={progress} />
                    <StyledTypography variant="h6" gutterBottom>
                        {i18n.language === 'en' ? questions[currentQuestion]?.textoIngles : questions[currentQuestion]?.texto}
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

                        {currentQuestion === questions.length - 1 && allQuestionsAnswered ? (
                            <CustomButton
                                onClick={handleSubmit}
                            >
                                {t('sendButton')}
                            </CustomButton>
                        ) : (
                            <IntroText marginTop={'20px'}>
                                {currentQuestion + 1} - {questions.length}
                            </IntroText>
                        )}

                        <IconButton
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1 || !isAnswerSelected}
                            style={{ fontSize: '3rem' }}
                        >
                            <NavigateNextIcon fontSize="inherit" />
                        </IconButton>
                    </ButtonGroup>
                </CenteredDiv>
            </Box>

            <Dialog
                open={showModal}
                PaperProps={{
                    style: {
                        width: '90%',
                        maxWidth: '800px',
                        borderRadius: '20px',
                        height: '470px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'solid',
                        borderColor: '#185D8E'
                    },
                }}
            >
                <DialogTitle
                    style={{
                        textAlign: 'center',
                        fontSize: '22px',
                        marginBottom: '15px',
                        marginTop: '15px',
                        fontWeight: 'bold',
                        color: '#185D8E',
                    }}
                >
                    {t('testIntroTitle')}
                </DialogTitle>

                <DialogContent
                    style={{
                        marginTop: '40px',
                        fontSize: '20px',
                        textAlign: 'center',
                    }}
                >
                    {modalStep === 1 && (
                        <>
                            <ModalText variant="body1" style={{ fontSize: '18px' }}>
                                {t('testIntro1')}
                            </ModalText>
                            <br />
                            <ModalText style={{ fontSize: '18px' }}>
                                {t('testIntro2')}
                            </ModalText>
                        </>
                    )}

                    {modalStep === 2 && (
                        <>
                            <ModalText variant="body1" style={{ fontSize: '18px' }}>
                                {t('testChooseCourseType')}
                            </ModalText>
                            <ButtonGroup style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '30px' }}>
                                <CourseCustomButton
                                    onClick={() => handleCourseTypeSelection('graduation')}
                                    style={{ marginRight: '10px', flexGrow: 1 }}
                                    selected={selectedButton === 'graduation'}
                                >
                                    {t('testGraduationButton')}
                                </CourseCustomButton>
                                <CourseCustomButton
                                    onClick={() => handleCourseTypeSelection('technical')}
                                    style={{ marginLeft: '10px', flexGrow: 1 }}
                                    selected={selectedButton === 'technical'}

                                >
                                    {t('testTechnicalButton')}
                                </CourseCustomButton>
                            </ButtonGroup>
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    {modalStep === 1 ? (
                        <><IconButton onClick={handleBeforeModalStep} style={{ marginRight: '90px'}}>
                            <NavigateBeforeIcon style={{ fontSize: '2rem', color: '#185D8E' }} />
                        </IconButton><IconButton onClick={handleNextModalStep} style={{marginLeft: '90px'}}>
                            <NavigateNextIcon style={{ fontSize: '2rem', color: '#185D8E' }} />
                        </IconButton></>
                    ) : (
                        <><IconButton onClick={handleBeforeModalStep} style={{ marginRight: '10px'}}>
                            <NavigateBeforeIcon style={{ fontSize: '2rem', color: '#185D8E' }} />
                        </IconButton>
                        <CustomButton
                            onClick={handleStartTest}
                            color="primary"
                            style={{ justifyItems: 'center', width: '200px', height: '40px', marginBottom: '10px' }}
                            disabled={!isButtonSelected}
                        >
                            {t('testIntroButton')}
                        </CustomButton>
                        <IconButton onClick={handleNextModalStep} style={{marginLeft: '10px'}}>
                            <NavigateNextIcon style={{ fontSize: '2rem', color: '#185D8E' }} />
                        </IconButton></>
                    )}
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
                <DialogTitle style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px' }}>{t('testWarningTitle')}</DialogTitle>
                <DialogContent>
                    <ModalText variant="body1" style={{ fontSize: '16px' }}>
                        {t('testWarning')}
                    </ModalText>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={confirmExit} color="primary">
                        {t('testWarningExit')}
                    </MuiButton>
                    <MuiButton onClick={cancelExit} color="secondary">
                        {t('testWarningCancel')}
                    </MuiButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VocacionalTest;
