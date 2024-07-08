import { Box, Card, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import Realista from '../../assets/img/Realista.png';
import Investigativo from '../../assets/img/Investigativo.png';
import Artistico from '../../assets/img/Artistico.png';
import Social from '../../assets/img/Social.png';
import Empreendedor from '../../assets/img/Empreendedor.png';
import Convencional from '../../assets/img/Convencional.png';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
    BoxCardHollandStyles,
    BoxTitleAndDividerBoxStyles,
    CardStyle,
    GridItemText,
    TestInfoContent,
    TestInfoTitle,
    dividerBoxTestInfStyles,
    testInfBoxStyles,
} from './styles';

const data = [
    {
        src: Realista,
        title: 'Realista (R)',
        description: 'Práticos e com habilidades manuais. Áreas: Mecânica, construção, engenharia.',
    },
    {
        src: Investigativo,
        title: 'Investigativo (I)',
        description: 'Analíticos, curiosos e intelectuais. Áreas: Ciências, pesquisa, tecnologia.',
    },
    {
        src: Artistico,
        title: 'Artístico (A)',
        description: 'Criativos e expressivos. Áreas: Artes, música, design.',
    },
    {
        src: Social,
        title: 'Social (S)',
        description: 'Comunicativos e cooperativos. Áreas: Educação, saúde, serviços sociais.',
    },
    {
        src: Empreendedor,
        title: 'Empreendedor (E)',
        description: 'Energéticos e líderes. Áreas: Negócios, gestão, vendas.',
    },
    {
        src: Convencional,
        title: 'Convencional (C)',
        description: 'Organizados e detalhistas. Áreas: Contabilidade, administração, finanças.',
    },
];

export const TestInformation: React.FC = () => {
    const [index, setIndex] = useState(0);
    const itemsToShow = 3;

    const handleIndicatorClick = (newIndex: number) => {
        setIndex(newIndex);
    };

    const visibleData = data.slice(index, index + itemsToShow).concat(
        index + itemsToShow > data.length
            ? data.slice(0, index + itemsToShow - data.length)
            : []
    );

    return (
        <Box sx={testInfBoxStyles}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} sx={GridItemText}>
                    <Box sx={BoxTitleAndDividerBoxStyles}>
                        <Typography sx={TestInfoTitle} variant='h3' >Teoria de John Holland</Typography>
                        <Box sx={dividerBoxTestInfStyles} />
                    </Box>
                    <Typography variant="body1" sx={TestInfoContent}>
                        Nosso teste vocacional é fundamentado nos estudos do psicólogo John L. Holland, que desenvolveu a Teoria dos
                        Tipos Vocacionais. Esta teoria identifica seis tipos principais de personalidade e ambientes de trabalho,
                        conhecidos pela sigla RIASEC. Ao responder nosso  teste, suas características pessoais são comparadas com os
                        tipos RIASEC para identificar carreiras e áreas de estudo que correspondem  ao seu perfil, aumentando as
                        chances de satisfação e sucesso profissional.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" mt={20} sx={{ textAlign: 'center' }}>
                        Os Seis Tipos Vocacionais
                    </Typography>
                    <Box sx={BoxCardHollandStyles}>
                        {visibleData.map((item) => (
                            <Card key={item.title} variant="outlined" sx={CardStyle}>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    image={item.src}
                                    alt={item.title}
                                />
                                <Box sx={{ whiteSpace: 'collapse', mx: 1, textAlign: 'center' }}>
                                    <Typography variant="h6">{item.title}</Typography>
                                    <Typography variant="body2">{item.description}</Typography>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        {Array.from({ length: Math.ceil(data.length / itemsToShow) }).map((_, i) => (
                            <IconButton
                                key={i}
                                onClick={() => handleIndicatorClick(i * itemsToShow)}
                                color={i * itemsToShow === index ? 'primary' : 'default'}
                            >
                                <FiberManualRecordIcon />
                            </IconButton>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TestInformation;
