
import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import InitialPageHeader from '../../components/HomeHeader/';
import Footer from '../../components/AdminFooter';
import { Subtitle } from '../HomePage/styles';
import studentLeft from '../../assets/img/studentLeft.png';

const HomePage = () => {
    return (
        <>
            <InitialPageHeader />
            <Box sx={{ height: 'calc(100vh - 64px)', padding: '20px' }}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', textAlign: 'center', height: '100%' }}>
                        <Box sx={{ mb: '5px', mt: '100px', ml:'80px' }}>
                            <Subtitle>
                                Bem-vindo a VOCCO!
                            </Subtitle>
                            <Typography variant="h3" sx={{ mb: '20px', mt: '30px' }} >
                                Encontre Universidades <br /> e faça Testes Vocacionais <br /> para decidir seu futuro <br /> profissional.
                            </Typography>
                        </Box>
                        <Box sx={{ mt: '20px', ml:'60px' }}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Link to="/testes" style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: '#5479f7',
                                                borderRadius: '20px',
                                                padding: '20px 40px',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#415bc4'
                                                }
                                            }}
                                        >
                                            Teste Vocacional
                                        </Button>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/instituicao" style={{ textDecoration: 'none' }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                backgroundColor: '#5479f7',
                                                borderRadius: '20px',
                                                padding: '20px 40px',
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                '&:hover': {
                                                    backgroundColor: '#415bc4'
                                                }
                                            }}
                                        >
                                            Universidades
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <img src={studentLeft} alt="Imagem representativa" style={{ maxWidth: '80%', maxHeight: '100%' }} />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default HomePage;
