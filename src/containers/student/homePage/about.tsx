import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import {
    aboutBoxStyles,
    gridItemImageStyles,
    imageStyles,
    gridItemTextStyles,
    typographyBodyStyles,
    typographyAboutTitleStyles,
    gridAboutContainerStyles,
} from './styles';
import backgroundIcone from '../../../assets/img/backgroundIcone.png';

export const About: React.FC = () => {
    return (
        <>
            <Box sx={aboutBoxStyles}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" sx={gridAboutContainerStyles}>
                    <Grid item xs={12} md={6} sx={gridItemImageStyles}>
                        <img src={backgroundIcone} alt="Ícone de fundo" style={imageStyles} />
                    </Grid>
                    <Grid item xs={12} md={6} sx={gridItemTextStyles}>
                        <Typography sx={typographyAboutTitleStyles}>
                            Sobre nós
                        </Typography>
                        <Typography sx={typographyBodyStyles}>
                            Nós somos a <b>VOCCO</b>, uma plataforma destinada a orientar alunos do ensino médio da rede pública de educação no Brasil,
                             auxiliando-os na escolha de suas futuras carreiras profissionais. Nosso nome deriva da palavra <b>VOCAÇÃO</b> em Latim.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default About;
