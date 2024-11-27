import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/vocacionalTestHeader';
import { IconButton, Box, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider, useMediaQuery} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { CenteredDiv, ButtonGroup, Global, homePageBoxStyles, StyledTypography,
    CustomButton, ModalText, BackButton, CustomLink, CourseCustomButton,
    StyledLinearProgress,
    componentTheme,
    CountDisplay} from './styles';
import axios from 'axios';
import AnswerOptions from './answerOptions';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import { useTranslation } from 'react-i18next';
import { images } from './images';
import { useSwipeable } from 'react-swipeable';

interface Teste {
    id: number;
}

interface Pergunta {
    id: number,
    texto: string,
    textoIngles: string,
    ativo: true
    imagem: string,
}

interface Usuario {
    id: number;
}

const VocacionalTest: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const{ t, i18n } = useTranslation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(30).fill(0));
    const [questions, setQuestions] = useState<Pergunta[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [teste, setTeste] = useState<Teste | null>(null);
    const [showModal, setShowModal] = useState(true);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [modalStep, setModalStep] = useState(1);
    const [isButtonSelected, setIsButtonSelected] = useState(false);

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

    // configura o swiping
    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (answers[currentQuestion] !== 0) {
                handleNext();
            }
        },
        onSwipedRight: handlePrev,
        trackMouse: true,
    });
    const authcontext = useContext(AuthContext);

    if (!authcontext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }
    const userData = authcontext.user ? decryptData(authcontext.user) : null;

    const user = userData ? JSON.parse(userData) : null;

    const handleSubmit = async () => {
        const payload = {
            tipo: selectedButton === 'graduation' ? 'SUPERIOR' : 'TECNICO',
            estudanteTeste: {
                testeId: teste?.id,
                usuarioId: user.id,
            },
            respostas: answers.map((resposta, index) => ({
                perguntaId: questions[index].id,
                resposta,
            })),
        };

        console.log(payload);

        try {
            const response = await axios.post(`${apiUrl}/resposta`, payload);
            console.log(response);
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
    };

    const allQuestionsAnswered = answers.every((answer) => answer !== 0);

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

            <Box sx={homePageBoxStyles}
                {...handlers}

            >
                <CenteredDiv
                    style={{
                        marginTop: isMobile ? '25%' : '7%',
                        height: '100vh'
                    }}
                >

                    {isMobile && (
                        <ThemeProvider theme={componentTheme}>
                            <StyledTypography variant="h6" gutterBottom style={{marginTop: '15px', marginBottom: '10px', fontSize: '18px'}}>
                                {i18n.language === 'en' ? questions[currentQuestion]?.textoIngles : questions[currentQuestion]?.texto}
                            </StyledTypography>

                        </ThemeProvider>
                    )}

                    {!isMobile && (
                        <ThemeProvider theme={componentTheme}>
                            <StyledTypography variant="h6" gutterBottom style={{marginTop: '15px', marginBottom: '10px'}}>
                                {i18n.language === 'en' ? questions[currentQuestion]?.textoIngles : questions[currentQuestion]?.texto}
                            </StyledTypography>

                        </ThemeProvider>
                    )}

                    <CountDisplay
                        style={{
                            fontSize: isMobile ? '14px' : '16px',
                            top: isMobile ? '15px' : '18px',
                            right: isMobile ? '13px' : '18px'
                        }}
                    >
                        {currentQuestion + 1} / {questions.length}
                    </CountDisplay>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '15px'
                        }}
                    >
                        <IconButton
                            onClick={handlePrev}
                            style={{ fontSize: '3rem', left: -170, top: 25}}
                            disabled={currentQuestion === 0}
                        >
                            <NavigateBeforeIcon fontSize="inherit" />
                        </IconButton>

                        {/* imagem do S3 */}
                        {/* {questions[currentQuestion] && questions[currentQuestion].imagem && (
                            <img
                                src={`${apiUrl}/arquivos/download/test/${questions[currentQuestion].imagem}`}
                                alt={`Imagem para a pergunta ${currentQuestion + 1}`}
                                style={{
                                    maxWidth: isMobile ? '350px' : '550px',
                                    height: 'auto',
                                    borderRadius: '20px',
                                    display: 'block',
                                    margin: '0 auto'
                                }}
                            />
                        )} */}

                        {/* imagem do array fixo */}
                        <img
                            src={images[currentQuestion]}
                            alt={`Imagem para a pergunta ${currentQuestion + 1}`}
                            style={{
                                maxWidth: isMobile ? '350px' : '550px',
                                height: 'auto',
                                borderRadius: '20px',
                                display: 'block',
                                margin: '0 auto'
                            }}
                        />

                        <IconButton
                            onClick={handleNext}
                            style={{ fontSize: '3rem', right: -170, top: 25 }}
                            disabled={answers[currentQuestion] === 0}
                            id='navigateNextTestButton'
                        >
                            <NavigateNextIcon fontSize="inherit"/>
                        </IconButton>
                    </Box>

                    <AnswerOptions
                        value={answers[currentQuestion]}
                        onChange={handleAnswerChange}
                        disabled={!questions[currentQuestion]?.ativo}
                    />

                    {currentQuestion === questions.length - 1 && allQuestionsAnswered ? (
                        <CustomButton
                            onClick={handleSubmit}
                            id='sendTestButton'
                        >
                            {t('sendButton')}
                        </CustomButton>
                    ) : (

                        <Box sx={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>

                            <StyledLinearProgress
                                variant="determinate"
                                value={(currentQuestion + 1) / questions.length * 100}
                            />
                        </Box>

                    )}

                </CenteredDiv>
            </Box>

            <Dialog
                open={showModal}
                PaperProps={{
                    style: {
                        width: isMobile ? '90%' : '800px',
                        maxWidth: '800px',
                        height: isMobile ? 'auto' : '470px',
                        borderRadius: '20px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'solid',
                        borderColor: '#185D8E',
                    },
                }}
            >
                <ThemeProvider theme={componentTheme}>
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
                </ThemeProvider>

                <DialogContent
                    style={{
                        marginTop: '40px',
                        fontSize: '20px',
                        textAlign: 'center',
                    }}
                >
                    {modalStep === 1 && (
                        <>
                            <ThemeProvider theme={componentTheme}>
                                <ModalText variant="body1" style={{ fontSize: '18px' }}>
                                    {t('testIntro1')}
                                </ModalText>
                                <br />
                                <ModalText style={{ fontSize: '18px' }}>
                                    {t('testIntro2')}
                                </ModalText>
                            </ThemeProvider>

                        </>
                    )}

                    {modalStep === 2 && (
                        <>
                            <ThemeProvider theme={componentTheme}>
                                <ModalText variant="body1" style={{ fontSize: '18px' }}>
                                    {t('testChooseCourseType')}
                                </ModalText>
                            </ThemeProvider>

                            <ButtonGroup>
                                <CourseCustomButton
                                    onClick={() => handleCourseTypeSelection('graduation')}
                                    selected={selectedButton === 'graduation'}
                                    id='graduationButton'
                                >
                                    {t('testGraduationButton')}
                                </CourseCustomButton>
                                <CourseCustomButton
                                    onClick={() => handleCourseTypeSelection('technical')}
                                    selected={selectedButton === 'technical'}
                                >
                                    {t('testTechnicalButton')}
                                </CourseCustomButton>
                            </ButtonGroup>
                        </>
                    )}
                </DialogContent>

                <DialogActions>
                    <IconButton
                        onClick={handleBeforeModalStep}
                        style={{ marginRight: '5px' }}
                        disabled={modalStep === 1}
                    >
                        <NavigateBeforeIcon style={{ fontSize: '2rem', color: modalStep === 1 ? 'gray' : '#185D8E' }} />
                    </IconButton>

                    {modalStep === 1 ? (
                        <IconButton
                            onClick={handleNextModalStep}
                            style={{ marginLeft: '203px' }}
                            id='navigateNextButton'
                        >
                            <NavigateNextIcon style={{ fontSize: '2rem', color: '#185D8E' }} />
                        </IconButton>
                    ) : (
                        <>
                            <CustomButton
                                onClick={handleStartTest}
                                color="primary"
                                style={{ justifyItems: 'center', width: '200px', height: '40px', marginBottom: '10px' }}
                                disabled={!isButtonSelected}
                                id='testIntroButton'
                            >
                                {t('testIntroButton')}
                            </CustomButton>

                            <IconButton
                                onClick={handleNextModalStep}
                                style={{ marginLeft: '8px' }}
                                disabled={modalStep === 2}
                            >
                                <NavigateNextIcon style={{ fontSize: '2rem', color: modalStep === 2 ? 'gray' : '#185D8E' }} />
                            </IconButton>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default VocacionalTest;
