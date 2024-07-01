import { Box, Card, CardMedia, Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TestInfoContent, TestInfoTitle, dividerBoxTestInfStyles, testInfBoxStyles } from './styles';
import Realista from '../../assets/img/Realista.png';
import Investigativo from '../../assets/img/Investigativo.png';
import Artistico from '../../assets/img/Artistico.png';
import Social from '../../assets/img/Social.png';
import Empreendedor from '../../assets/img/Empreendedor.png';
import Convencional from '../../assets/img/Convencional.png';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
        title: 'Artístico (I)',
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
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                    <Box sx={TestInfoTitle}>
                        <Typography variant="h4">Teoria de John Holland</Typography>
                    </Box>
                    <Box sx={dividerBoxTestInfStyles} />
                    <Box mt={2} sx={TestInfoContent}>
                        <Typography variant="body1">
                            Nosso teste vocacional é fundamentado nos estudos do psicólogo John L. Holland, que desenvolveu a Teoria dos
                            Tipos Vocacionais. <br />Esta teoria identifica seis tipos principais de personalidade e ambientes de trabalho,
                            conhecidos pela sigla RIASEC. <br /> Ao responder ao nosso teste, suas características pessoais são comparadas com os
                            tipos RIASEC para identificar carreiras e <br /> áreas de estudo que correspondem ao seu perfil, aumentando as
                            chances de satisfação e sucesso profissional. Veja abaixo os tipos de personalidades da Teoria de Holland, depois faça
                            nosso teste e descubra a sua:
                        </Typography>
                        <Typography variant="h6" mt={2}>
                            Os Seis Tipos de Holland
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                py: 1,
                                overflow: 'auto',
                                width: '100%',
                                scrollSnapType: 'x mandatory',
                                '& > *': {
                                    scrollSnapAlign: 'center',
                                },
                                '::-webkit-scrollbar': { display: 'none' },
                            }}
                        >
                            {visibleData.map((item) => (
                                <Card key={item.title} variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 300, minWidth: 300 }}>
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
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TestInformation;
