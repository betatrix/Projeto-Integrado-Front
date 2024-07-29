import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import StudentHeader from '../../../components/studentHeader';
import AnnouncementBar from './announcement';
import { SquareButton, TextButton, CardContentBox, TestButton, homePageBoxStyles } from './styles';
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

    console.log('AuthContext:', authContext);
    console.log('Decrypted User Data:', userData);
    console.log('Parsed User:', user);

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
                        date: test.data,
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
                <Grid container justifyContent="center">
                    <Grid container spacing={25} justifyContent="center">
                        <Grid item>
                            <Paper sx={{ backgroundColor: 'white' }}>
                                <SquareButton>
                                    <TextButton>Testes Preenchidos</TextButton>
                                    <InsightsIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                                    <Typography variant="h3" component="div">
                                        {testCount}
                                    </Typography>
                                </SquareButton>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper sx={{ backgroundColor: 'white' }}>
                                <SquareButton>
                                    <TextButton>Perfis mais recorrentes</TextButton>
                                    <ListAltIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                                    <CardContentBox>
                                        <Card sx={{ width: '100%', mt: 2 }}>
                                            <CardContent>
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
                                            </CardContent>
                                        </Card>
                                    </CardContentBox>
                                </SquareButton>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper sx={{ backgroundColor: 'white' }}>
                                <SquareButton>
                                    <TextButton>Resultados</TextButton>
                                    <BarChartIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                                    <CardContentBox>
                                        <Slider {...carouselSettings}>
                                            {testHistory.length > 0 ? (
                                                testHistory.map((test, index) => (
                                                    <Card key={index} sx={{ width: '100%', mt: 2 }}>
                                                        <CardContent>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Data: {test.date}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Teste: {test.tipo}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Resultado: {test.result.join(', ')}
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                ))
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    Nenhum teste realizado.
                                                </Typography>
                                            )}
                                        </Slider>
                                    </CardContentBox>
                                </SquareButton>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2" color="text.secondary">
                                Histórico de testes
                                <ListAltIcon style={{ fontSize: '80px', color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                            </Typography>
                            <Box sx={{ mt: '20px', textAlign: 'center', marginTop: '50px' }}>
                                <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" size="large" sx={TestButton}>
                                        Responder Novamente
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                <StudentFooter />
            </Box>
        </>
    );
};

export default StudentDashboard;
