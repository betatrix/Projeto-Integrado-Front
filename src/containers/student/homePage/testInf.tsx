import { Box, Card, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import Realista from '../../../assets/img/Realista.png';
import Investigativo from '../../../assets/img/Investigativo.png';
import Artistico from '../../../assets/img/Artistico.png';
import Social from '../../../assets/img/Social.png';
import Empreendedor from '../../../assets/img/Empreendedor.png';
import Convencional from '../../../assets/img/Convencional.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    BoxCardHollandStyles,
    CardStyle,
    GridItemCards,
    GridItemText,
    TestInfoContent,
    TestInfoTitle,
    testInfBoxStyles,
} from './styles';

const data = [
    {
        src: Realista,
        title: 'Realista',
        description: 'Práticos e com habilidades manuais.',
    },
    {
        src: Investigativo,
        title: 'Investigativo',
        description: 'Analíticos, curiosos e intelectuais.',
    },
    {
        src: Artistico,
        title: 'Artístico',
        description: 'Criativos e expressivos.',
    },
    {
        src: Social,
        title: 'Social',
        description: 'Comunicativos e cooperativos.',
    },
    {
        src: Empreendedor,
        title: 'Empreendedor',
        description: 'Energéticos e líderes.',
    },
    {
        src: Convencional,
        title: 'Convencional',
        description: 'Organizados e detalhistas.',
    },
];

export const TestInformation: React.FC = () => {
    const [index, setIndex] = useState(0);

    const handlePrevClick = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    const getVisibleData = () => {
        const items = [];
        for (let i = -1; i <= 1; i++) {
            items.push(data[(index + i + data.length) % data.length]);
        }
        return items;
    };

    const visibleData = getVisibleData();

    return (
        <Box sx={testInfBoxStyles}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} sx={GridItemText}>
                    <Box>
                        <Typography sx={TestInfoTitle}>Teoria de John Holland</Typography>
                    </Box>
                    <Typography sx={TestInfoContent}>
                        Nosso teste vocacional é fundamentado nos estudos do psicólogo John L. Holland, que desenvolveu a Teoria dos
                        Tipos Vocacionais. Esta teoria identifica seis tipos principais de personalidade e ambientes de trabalho,
                        conhecidos pela sigla RIASEC. Ao responder nosso teste, suas características pessoais são comparadas com os
                        tipos RIASEC para identificar carreiras e áreas de estudo que correspondem ao seu perfil, aumentando as
                        chances de satisfação e sucesso profissional.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={GridItemCards}>
                    {/* <Typography mt={20} sx={{ textAlign: 'center', fontFamily: 'Exo 2', fontSize: 'Poppins', marginBottom: '0.5rem' }}>
                        Tipos Vocacionais
                    </Typography> */}
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}> */}
                    <Box sx={BoxCardHollandStyles}>
                        <IconButton onClick={handlePrevClick}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        {visibleData.map((item, idx) => (
                            <Card key={item.title} variant="outlined" sx={{ ...CardStyle, transform: idx === 1 ? 'scale(1.1)' : 'scale(0.8)' }}>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={item.src}
                                    alt={item.title}
                                />
                                <Box sx={{ whiteSpace: 'nowrap', padding: '1rem', textAlign: 'center' }}>
                                    <Typography sx={{fontFamily:'Poppins', fontSize:'0.8rem', fontWeight: 'bold', color:'#1b1f27'}}>{item.title}</Typography>
                                    {/* <Typography>{item.description}</Typography> */}
                                </Box>
                            </Card>
                        ))}
                        <IconButton onClick={handleNextClick}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>

                    {/* </Box> */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TestInformation;
