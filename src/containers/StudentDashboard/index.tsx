import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Card, CardContent, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import StudentHeader from '../../components/StudentHeader';
import AnnouncementBar from './announcement';
import { SquareButton, TextButton, CardContentBox, TestButton, homePageBoxStyles } from './styles';
// import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import StudentFooter from '../../components/StudentFooter';
import { contarTeste, buscarTestesDeEstudante } from '../../services/apiService'; // Importar as funções necessárias

const StudentDashboard: React.FC = () => {
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [testCount, setTestCount] = useState(0);
    const [testHistory, setTestHistory] = useState<{ date: string, result: string }[]>([]); // State para histórico de testes

    useEffect(() => {
        // Função para buscar a contagem de testes
        const fetchTestCount = async () => {
            try {
                const count = await contarTeste();
                setTestCount(count);
            } catch (error) {
                console.error('Erro ao buscar contagem de testes:', error);
            }
        };

        // Função para buscar o histórico de testes do estudante
        const fetchTestHistory = async () => {
            try {
                const estudanteId = 1; // Substitua pelo ID real do estudante
                const tests = await buscarTestesDeEstudante(estudanteId);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formattedTests = tests.map((test: any) => ({
                    date: test.data,
                    result: test.teste, // Ajuste conforme necessário para obter parte do resultado
                }));
                setTestHistory(formattedTests);
            } catch (error) {
                console.error('Erro ao buscar histórico de testes:', error);
            }
        };

        fetchTestCount(); // Chamar a função ao carregar o componente
        fetchTestHistory(); // Chamar a função ao carregar o componente
    }, []);

    const handleCloseAnnouncement = () => {
        setShowAnnouncement(false);
    };

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
                            <Paper sx={{backgroundColor:'white'}}>
                                <SquareButton>
                                    <TextButton>Testes Preenchidos</TextButton>
                                    <InsightsIcon style={{ fontSize: 80, color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                                    <Typography variant="h3" component="div">
                                        {testCount}
                                    </Typography>
                                </SquareButton>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper sx={{backgroundColor:'white'}}>
                                <SquareButton>
                                    <TextButton>Resultados</TextButton>
                                    <BarChartIcon style={{ fontSize: 80, color: 'linear-gradient(90deg, #040410, #302EB7)' }} />
                                    <CardContentBox>
                                        <Card sx={{ width: '100%', mt: 2 }}>
                                            <CardContent>
                                                {testHistory.length > 0 ? (
                                                    testHistory.map((test, index) => (
                                                        <Typography key={index} variant="body2" color="text.secondary">
                                                            {test.date}: {test.result.substring(0, 30)}...
                                                        </Typography>
                                                    ))
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">
                                                        Nenhum teste realizado.
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </CardContentBox>
                                </SquareButton>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{ mt: '20px', textAlign: 'center', marginTop: '50px' }}>
                    <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" sx={TestButton}>
                            Fazer Teste Vocacional
                        </Button>
                    </Link>
                </Box>
                <StudentFooter />
            </Box>
        </>
    );
};

export default StudentDashboard;
