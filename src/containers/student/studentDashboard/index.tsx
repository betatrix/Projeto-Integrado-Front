import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import StudentHeader from '../../../components/studentHeader';
import AnnouncementBar from './announcement';
import { TestButton, homePageBoxStyles, paperStyles } from './styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import StudentFooter from '../../../components/studentFooter';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
                    console.log('Histórico de testes retornado pela API:', tests);
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
                <Grid container justifyContent="center" spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={paperStyles}>
                            <Typography variant="h6" component="div">
                                Testes Preenchidos
                            </Typography>
                            <InsightsIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                            <Typography variant="h3" component="div">
                                {testCount}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={paperStyles}>
                            <Typography variant="h6" component="div">
                                Perfis mais recorrentes
                            </Typography>
                            <ListAltIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                            {recorrentes.length > 0 ? (
                                recorrentes.map((profile, index) => (
                                    <Typography key={index} variant="body2" color="text.secondary">
                                        {profile}
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Nenhum perfil encontrado.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={paperStyles}>
                            <Typography variant="h6" component="div">
                                Histórico de testes
                            </Typography>
                            <ListAltIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                            <Box sx={{ mt: '20px', textAlign: 'center' }}>
                                <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" size="large" sx={TestButton}>
                                        {testCount === 0 ? 'Fazer Teste' : 'Refazer Teste'}
                                    </Button>
                                </Link>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center">
                        <Paper sx={paperStyles}>
                            <Typography variant="h6" component="div">
                                Resultados
                            </Typography>
                            <BarChartIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                            {testHistory.length > 0 ? (
                                <Slider {...carouselSettings}>
                                    {testHistory.map((test, index) => (
                                        <Box key={index} sx={{ padding: '1%' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Data: {test.date}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Teste: {test.tipo}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Resultado: {test.result.join(', ')}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Slider>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Nenhum teste realizado.
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
                <StudentFooter />
            </Box>
        </>
    );
};

export default StudentDashboard;
