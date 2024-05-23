//import { useState, useEffect } from 'react';
import { Subtitle, SquareButton, TextButton } from './styles';
import { Grid, Box } from '@mui/material';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';
import { Link } from 'react-router-dom';

const MyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg"
        height="80px" viewBox="0 -960 960 960" width="80px" fill="#1b1f27">
        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332
            274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
    </svg>
);
const StudentDashboard = () => {
    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '40px' }}>
                <Grid container justifyContent="center">
                    <Subtitle>
                        Ferramentas para Estudantes
                    </Subtitle>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Link to="/perfil" style={{ textDecoration: 'none' }}>
                                <SquareButton>
                                    <TextButton>
                                        Perfil
                                    </TextButton>
                                    <MyIcon />
                                </SquareButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                <SquareButton>
                                    <TextButton>
                                      Seu Resultado<br/> do Teste Vocacional
                                    </TextButton>
                                    <MyIcon />
                                </SquareButton>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Footer />
            </Box>
        </>
    );
};

export default StudentDashboard;
