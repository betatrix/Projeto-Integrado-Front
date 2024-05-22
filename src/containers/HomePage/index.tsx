import React from 'react';
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
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', height: '100%' }}>
                        <Subtitle>
                            Bem-vindo a VOCCO!
                        </Subtitle>
                        <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                            Encontre Universidades e faça Testes Vocacionais para decidir seu futuro profissional.
                        </Typography>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Link to="/testes" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" size="large">
                                        Teste Vocacional
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/instituicoes" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" size="large">
                                        Universidades
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
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
