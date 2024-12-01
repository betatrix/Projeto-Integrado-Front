import { Grid, Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InitialPageHeader from '../../../components/homeHeader';
import About from './about';
import Faq from './faq';
import Sources from './sources';
import TestInformation from './testInf';
import {
    homePageBoxStyles,
    gridIndexContainerStyles,
    typographyTitleStyles,
    typographySubtitleStyles,
    buttonStyles,
    CarouselTitle,
    BoxCarouselStyles,
    container,
} from './styles';
import initialImage from '../../../assets/img/imagem-principal.png';
import InitialPageFooter from '../../../components/homeFooter';
import LogoCarousel from './logoCarousel';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
    const{ t } = useTranslation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <InitialPageHeader />
            <Box sx={homePageBoxStyles} id="home">
                <Box sx={container}>
                    <Grid container spacing={1} alignItems="center" justifyContent="space-between" sx={gridIndexContainerStyles}>
                        <Grid item xs={12} md={6}>
                            <Typography sx={typographyTitleStyles}>
                                {t('welcomeText1')}
                            </Typography>
                            <Typography sx={typographySubtitleStyles}>
                                {t('welcomeText2')}
                            </Typography>
                            <Button type="button" id='loginHomePageButton' onClick={handleLogin} variant="outlined" sx={buttonStyles}>
                                {t('registerButton')}
                            </Button>
                        </Grid>
                        {!isMobile && (
                            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                    src={initialImage}
                                    alt="Imagem ilustrativa"
                                    style={{ width: '100%', maxWidth: '47rem', height: 'auto', marginLeft:'7.5rem' }}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
                <Box sx={BoxCarouselStyles}>
                    <Typography sx={CarouselTitle}>
                        {t('partner')}
                    </Typography>
                    <LogoCarousel />
                </Box>
            </Box>
            <Box id="about">
                <About />
            </Box>
            <Box id="testInformation">
                <TestInformation />
            </Box>
            <Box
                sx={{
                    '@media (max-width: 600px)': {
                        padding: '20rem 0rem'
                    }
                }}
                id="sources"
            >
                <Sources />
            </Box>
            <Box id="faq">
                <Faq />
            </Box>
            <InitialPageFooter />
        </>
    );
};

export default HomePage;
