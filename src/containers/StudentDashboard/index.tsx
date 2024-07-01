import React, { useState } from 'react';
import { Grid, Box, Typography, Card, CardContent, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
//import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import StudentHeader from '../../components/StudentHeader';
import Footer from '../../components/AdminFooter';
import AnnouncementBar from './announcement';
import { SquareButton, TextButton, CardContentBox, TestButton } from './styles';
// import { Subtitle, SquareButton, TextButton, CardContentBox, TestButton } from './styles';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';

const StudentDashboard: React.FC = () => {
    const [showAnnouncement, setShowAnnouncement] = useState(true);
    const [contarTeste] = useState(0); // Simulating test count
    // const [testCount, setTestCount] = useState(0); // Simulating test count

    const handleCloseAnnouncement = () => {
        setShowAnnouncement(false);
    };

    const testHistory = [
        { date: '2023-06-10', result: 'Carreira X' },
        { date: '2023-07-15', result: 'Carreira Y' },
    ]; // Simulating test history

    return (
        <>
            <StudentHeader />
            {showAnnouncement && (
                <AnnouncementBar
                    imageUrl="URL_DA_IMAGEM"
                    onClose={handleCloseAnnouncement}
                />
            )}
            <Box sx={{ marginTop: '40px', padding: '20px' }}>
                <Grid container justifyContent="center">
                    {/* <Subtitle>Ferramentas para Estudantes</Subtitle> */}
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Paper>
                                <SquareButton>
                                    <TextButton>Testes Preenchidos</TextButton>
                                    <InsightsIcon style={{ fontSize: 80, color: '#1b1f27' }} />
                                    <Typography variant="h3" component="div">
                                        {contarTeste}
                                    </Typography>
                                </SquareButton>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper>
                                <SquareButton>
                                    <TextButton>Resultados</TextButton>
                                    <BarChartIcon style={{ fontSize: 80, color: '#1b1f27' }} />
                                    <CardContentBox>
                                        <Card sx={{ width: '100%', mt: 2 }}>
                                            <CardContent>
                                                {testHistory.length > 0 ? (
                                                    testHistory.map((test, index) => (
                                                        <Typography key={index} variant="body2" color="text.secondary">
                                                            {test.date}: {test.result}
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
                <Box sx={{ mt: '20px', textAlign: 'center' }}>
                    <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                        <TestButton variant="contained" size="large" startIcon={<VideogameAssetIcon />}>
                            Realize um Teste Vocacional
                        </TestButton>
                    </Link>

                </Box>

                <Footer />
            </Box>
        </>
    );
};

export default StudentDashboard;
