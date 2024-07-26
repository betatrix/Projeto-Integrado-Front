import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import {
    aboutBoxStyles,
    gridItemImageStyles,
    imageStyles,
    gridItemTextStyles,
    dividerBoxStyles,
    typographyBodyStyles,
    typographySmallBodyStyles,
    typographyAboutTitleStyles,
    gridAboutContainerStyles,
} from './styles';
import backgroundIcone from '../../../assets/img/backgroundIcone.png';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
    const{ t } = useTranslation();

    return (
        <>
            <Box sx={aboutBoxStyles}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" sx={gridAboutContainerStyles}>
                    <Grid item xs={12} md={6} sx={gridItemImageStyles}>
                        <img src={backgroundIcone} alt="Ícone de fundo" style={imageStyles} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={gridItemTextStyles}>
                        <Typography variant="h3" sx={typographyAboutTitleStyles}>
                            {t('aboutTitle1')}
                        </Typography>
                        <Box sx={dividerBoxStyles} />
                        <Typography variant="body1" sx={typographyBodyStyles}>
                            {t('aboutText1')}            
                        </Typography>
                        <Typography variant="h4" sx={{marginLeft:'40px'}}>
                            {t('aboutTitle2')}
                        </Typography>
                        <Typography variant="body1" sx={typographySmallBodyStyles}>
                            {t('aboutText2')}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default About;
