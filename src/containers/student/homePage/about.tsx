import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import {
    aboutBoxStyles,
    gridItemTextStyles,
    typographyBodyStyles,
    typographyAboutTitleStyles,
    gridAboutContainerStyles,
} from './styles';
import { useTranslation } from 'react-i18next';

export const About: React.FC = () => {
    const{ t } = useTranslation();

    return (
        <>
            <Box sx={aboutBoxStyles}>
                <Grid container spacing={4} alignItems="left" justifyContent="left" sx={gridAboutContainerStyles}>
                    <Grid item xs={12} md={5} sx={gridItemTextStyles}>
                        <Typography sx={typographyAboutTitleStyles}>
                            {t('aboutTitle')}
                        </Typography>
                        <Typography sx={typographyBodyStyles}>
                            {t('aboutText1')}
                        </Typography>
                        <Typography sx={typographyBodyStyles}>
                            {t('aboutText2')}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default About;
