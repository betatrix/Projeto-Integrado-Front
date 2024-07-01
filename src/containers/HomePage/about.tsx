import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import {
    aboutBoxStyles,
    gridItemImageStyles,
    imageStyles,
    gridItemTextStyles,
    typographyTitleStyles,
    dividerBoxStyles,
    typographyBodyStyles,
    typographySmallBodyStyles,
    typographyAboutTitleStyles,
    gridAboutContainerStyles
} from './styles';
import backgroundIcone from '../../assets/img/backgroundIcone.png';

export const About: React.FC = () => {
    return (
        <>
            <Box sx={aboutBoxStyles}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" sx={gridAboutContainerStyles}>
                    <Grid item xs={12} md={6} sx={gridItemImageStyles}>
                        <img src={backgroundIcone} alt="Ícone de fundo" style={imageStyles} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={gridItemTextStyles}>
                        <Typography variant="h3" sx={typographyTitleStyles}>
                            Sobre nós
                            <Box sx={dividerBoxStyles} />
                        </Typography>
                        <Typography variant="body1" sx={typographyBodyStyles}>
                            Nós somos a <b>VOCCO</b>, uma plataforma destinada a orientar alunos do ensino médio da rede pública de educação no Brasil,
                             auxiliando-os na escolha consciente de suas futuras carreiras profissionais.
                        </Typography>
                        <Typography variant="h4" sx={typographyAboutTitleStyles}>
                            Nome Vocco
                        </Typography>
                        <Typography variant="body1" sx={typographySmallBodyStyles}>
                            Nosso nome deriva da palavra vocação em Latim.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default About;
