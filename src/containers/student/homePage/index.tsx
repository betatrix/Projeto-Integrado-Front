import React from 'react';
import { Grid, Box, Typography, Button, Divider } from '@mui/material';
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
} from './styles';
import TestInformation from './testInf';
import InitialPageFooter from '../../../components/homeFooter';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <InitialPageHeader />
            <Box sx={homePageBoxStyles} id="home">
                <Grid alignItems="column" justifyContent="flex-start" sx={gridIndexContainerStyles}>
                    <Typography variant="h1" sx={typographyTitleStyles}>
                        VOCCO
                    </Typography>
                    <Typography variant="h6" sx={typographySubtitleStyles}>
                        {t('welcomeText1')} <br /> {t('welcomeText2')}
                    </Typography>
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" size="large" sx={buttonStyles}>
                            {t('registerButton')}
                        </Button>
                    </Link>
                </Grid>
            </Box>
            <Divider sx={{ borderColor: '#735fe4', borderBottomWidth: 2 }} />
            <Box id="testInformation">
                <TestInformation />
            </Box>
            <Divider sx={{ borderColor: '#735fe4', borderBottomWidth: 2 }} />
            <Box id="about">
                <About />
            </Box>
            <Divider sx={{ borderColor: '#735fe4', borderBottomWidth: 2 }} />
            <Box id="faq">
                <Faq />
            </Box>
            <InitialPageFooter />
        </>
    );
};

export default HomePage;
