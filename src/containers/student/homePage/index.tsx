import { Grid, Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import InitialPageHeader from '../../../components/homeHeader';
import About from './about';
import Faq from './faq';
import {
    homePageBoxStyles,
    gridIndexContainerStyles,
    typographyTitleStyles,
    typographySubtitleStyles,
    buttonStyles,
    CarouselTitle,
} from './styles';
import TestInformation from './testInf';
import InitialPageFooter from '../../../components/homeFooter';
import LogoCarousel from './logoCarousel';

export const HomePage: React.FC = () => {
    return (
        <>
            <InitialPageHeader />
            <Box sx={homePageBoxStyles} id="home">
                <Grid spacing={4} alignItems="colum" justifyContent="flex-start" sx={gridIndexContainerStyles}>
                    <Typography variant="h1" sx={typographyTitleStyles}>
                        VOCCO
                    </Typography>
                    <Typography variant="h6" sx={typographySubtitleStyles}>
                        Encontre o curso e a faculdade perfeitos para você!<br />
                        Tenha acesso ao nosso teste vocacional exclusivo e informações sobre <br />
                        universidades brasileiras clicando no botão abaixo:
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" sx={buttonStyles}>
                            Cadastre-se
                        </Button>
                    </Link>
                </Grid>
            </Box>
            {/* <Divider sx={{ borderColor: '#735fe4', borderBottomWidth: 2 }} /> */}
            <Container>
                <Typography sx={CarouselTitle}>
                    Nossos Parceiros
                </Typography>
                <LogoCarousel />
            </Container>
            <Box id="testInformation">
                <TestInformation />
            </Box>
            {/* <Divider sx={{ borderColor: '#735fe4', borderBottomWidth: 2 }} /> */}
            <Box id="about">
                <About />
            </Box>
            {/* <Divider sx={{ borderColor: '#735fe4', borderBottomWidth: 2 }} /> */}
            <Box id="faq">
                <Faq />
            </Box>
            <InitialPageFooter />
        </>
    );
};

export default HomePage;
