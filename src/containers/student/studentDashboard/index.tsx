import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import StudentHeader from '../../../components/studentHeader';
import AnnouncementBar from './announcement';
import { TestButton, boxStyles, gridStyles, homePageBoxStyles, paperStyles } from './styles';
import StudentFooter from '../../../components/studentFooter';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person'; // Importando o ícone desejado
import { contarTeste, buscarTestesDeEstudante, buscarPerfisRecorrentes } from '../../../services/apiService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';

const StudentDashboard: React.FC = () => {
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [testCount, setTestCount] = useState(0);
    const [testHistory, setTestHistory] = useState<{ date: string, tipo: string, result: string[] }[]>([]);
    const [recorrentes, setRecorrentes] = useState<string[]>([]);

    const authContext = useContext(AuthContext);
    const userData = authContext?.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    useEffect(() => {
        const fetchTestCount = async () => {
            try {
                if (user?.id) {
                    const count = await contarTeste(user.id);
                    setTestCount(count);
                }
            } catch (error) {
                console.error('Erro ao buscar contagem de testes:', error);
            }
        };

        const fetchTestHistory = async () => {
            try {
                if (user?.id) {
                    const tests = await buscarTestesDeEstudante(user.id);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedTests = tests.map((test: any) => ({
                        date: new Date(test.data).toLocaleDateString('pt-BR'),
                        tipo: test.teste,
                        result: test.perfis,
                    }));
                    setTestHistory(formattedTests);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico de testes:', error);
            }
        };

        const fetchPerfisRecorrentes = async () => {
            try {
                if (user?.id) {
                    const profiles = await buscarPerfisRecorrentes(user.id);
                    setRecorrentes(profiles);
                }
            } catch (error) {
                console.error('Erro ao buscar perfis recorrentes:', error);
            }
        };

        fetchTestCount();
        fetchTestHistory();
        fetchPerfisRecorrentes();
    }, [user?.id]);

    const handleCloseAnnouncement = () => {
        setShowAnnouncement(false);
    };

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    if (!authContext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }

    return (
        <>
            <StudentHeader />
            {showAnnouncement && (
                <AnnouncementBar
                    imageUrl="URL_DA_IMAGEM"
                    onClose={handleCloseAnnouncement}
                />
            )}
            <Box sx={homePageBoxStyles}>
                <Grid container sx={gridStyles} spacing={2}>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Box sx={boxStyles}>
                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="3rem" component="div" color="#1b1f27">
                                {testCount}
                            </Typography>
                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" component="div" color="#1b1f27">
                                TESTES RESPONDIDOS
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Box sx={boxStyles}>
                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" component="div">
                                PERFIS MAIS RECORRENTES <br />NOS SEUS RESULTADOS
                            </Typography>
                            {recorrentes.length > 0 ? (
                                recorrentes.map((profile, index) => (
                                    <Box key={index} display="flex" alignItems="center" justifyContent="center" marginTop="0.5rem">
                                        <PersonIcon style={{ marginRight: '8px', color: '#1b1f27' }} />
                                        <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                            {profile}
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Descubra seu perfil fazendo um teste.
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
                <Container sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Box sx={{ width: '40%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <Typography textAlign="center" fontFamily="Exo 2" fontWeight="bold" fontSize="1.5rem" marginBottom="5%">
                            HISTÓRICO DE TESTES
                        </Typography>
                    </Box>
                </Container>
                <Grid container justifyContent="center" alignItems="center" display="flex" spacing={2}>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        {/* <Box sx={boxStyles}> */}
                        <Paper sx={paperStyles}>
                            <ListAltIcon style={{ fontSize: '50px', color: '#1b1f27' }} />
                            <Box sx={{ mt: '20px', textAlign: 'center' }} component="div">
                                <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" sx={TestButton}>
                                        {testCount === 0 ? 'Fazer Teste' : 'Refazer Teste'}
                                    </Button>
                                </Link>
                            </Box>
                        </Paper>
                        {/* </Box> */}
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Paper sx={paperStyles}>
                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27" component="div">
                                RESULTADOS
                            </Typography>
                            {testHistory.length > 1 ? (
                                <Slider {...carouselSettings}>
                                    {testHistory.map((test, index) => (
                                        <Box key={index} sx={{ padding: '1%' }}>
                                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                                Data: {test.date}
                                            </Typography>
                                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                                Teste: {test.tipo}
                                            </Typography>
                                            <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                                Resultado: {test.result.join(', ')}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Slider>
                            ) : testHistory.length === 1 ? (
                                <Box sx={{ padding: '1%' }}>
                                    <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                        Data: {testHistory[0].date}
                                    </Typography>
                                    <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                        Teste: {testHistory[0].tipo}
                                    </Typography>
                                    <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                        Resultado: {testHistory[0].result.join(', ')}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography fontFamily="Exo 2" fontWeight="bold" fontSize="1rem" color="#1b1f27">
                                    Nenhum teste realizado.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <StudentFooter />
        </>
    );
};

export default StudentDashboard;
