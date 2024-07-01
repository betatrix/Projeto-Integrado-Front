import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import InitialPageHeader from '../../components/HomeHeader/';
import Footer from '../../components/AdminFooter';
import About from './about';
import Faq from './faq';
import {
    homePageBoxStyles,
    gridIndexContainerStyles,
    gridItemStyles,
    boxTitleStyles,
    typographyTitleStyles,
    typographySubtitleStyles,
    boxButtonContainerStyles,
    buttonStyles,
} from './styles';
import TestInformation from './testInf';

export const HomePage: React.FC = () => {
    return (
        <>
            <InitialPageHeader />

            <Box sx={homePageBoxStyles} id="home">
                <Grid container spacing={4} alignItems="center" justifyContent="center" sx={gridIndexContainerStyles}>
                    <Grid item xs={12} md={6} sx={gridItemStyles}>
                        <Box sx={boxTitleStyles}>
                            <Typography variant="h1" sx={typographyTitleStyles}>
                                VOCCO
                            </Typography>
                            <Typography variant="h6" sx={typographySubtitleStyles}>
                                ENCONTRE UNIVERSIDADES E FAÇA TESTES VOCACIONAIS PARA DECIDIR SEU FUTURO PROFISSIONAL.
                            </Typography>
                        </Box>
                        <Box sx={boxButtonContainerStyles}>
                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item>
                                    <Link to="/cadastro" style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" size="large" sx={buttonStyles}>
                                            Cadastre-se
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box id="about">
                <About />
            </Box>
            <Box id="faq">
                <Faq />
            </Box>
            <Box id="testInformation">
                <TestInformation />
            </Box>
            <Footer />
        </>
    );
};

export default HomePage;
