//import React from 'react';
import { Subtitle, SquareButton, TextButton } from './styles';
import { Grid, Box } from '@mui/material';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';
import { Link } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

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
                                    <AccountCircleRoundedIcon style={{ fontSize: 80, color: '#1b1f27' }} />
                                </SquareButton>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                <SquareButton>
                                    <TextButton>
                                        Resultado do Teste Vocacional
                                    </TextButton>
                                    <AssignmentTurnedInRoundedIcon style={{ fontSize: 80, color: '#1b1f27' }} />
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
