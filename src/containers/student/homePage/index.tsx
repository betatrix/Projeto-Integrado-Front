import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
    BoxCarouselStyles,
} from './styles';
import TestInformation from './testInf';
import InitialPageFooter from '../../../components/homeFooter';
import LogoCarousel from './logoCarousel';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
    const{ t } = useTranslation();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    
    return (
        <>
            <InitialPageHeader />
            <Box sx={homePageBoxStyles} id="home">
                <Grid container spacing={4} alignItems="colum" justifyContent="flex-start" sx={gridIndexContainerStyles}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={typographyTitleStyles}>
                            {t('welcomeText1')}
                        </Typography>
                        <Typography sx={typographySubtitleStyles}>
                            {t('welcomeText2')}
                        </Typography>
                        <Button type="button" onClick={handleLogin} variant="outlined" sx={buttonStyles} >
                            {t('registerButton')}
                        </Button>
                    </Grid>
                </Grid>
            <Box sx={BoxCarouselStyles}>
                <Typography sx={CarouselTitle}>
                    {t('partner')}
                </Typography>
                <LogoCarousel />
            </Box>
            </Box>
            <Box id="testInformation">
                <TestInformation />
            </Box>
            <Box id="about">
                <About />
            </Box>
            <Box id="faq">
                <Faq />
            </Box>
            <InitialPageFooter />
        </>
    );
};

export default HomePage;
