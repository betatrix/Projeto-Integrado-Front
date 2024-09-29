import { Box, CardMedia, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable'; // Importar a biblioteca de swipe
import Realista from '../../../assets/img/Realista.png';
import Investigativo from '../../../assets/img/Investigativo.png';
import Artistico from '../../../assets/img/Artistico.png';
import Social from '../../../assets/img/Social.png';
import Empreendedor from '../../../assets/img/Empreendedor.png';
import Convencional from '../../../assets/img/Convencional.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BoxCardHollandStyles,
    testInfBoxStyles,
    TestInfoContainerStyles,
    TestInfoContent,
    TestInfoTitle,
    IndicatorContainerStyles,
    IndicatorStyles,
    ActiveIndicatorStyles } from './styles';
import { useTranslation } from 'react-i18next';

const data = [
    {
        src: Realista,
        title: 'jonhHollandTitle',
        content: 'jonhHollandContent',
        content2: 'jonhHollandContent2'
    },
    {
        src: Realista,
        title: 'realistaTitle',
        content: 'realistaContent',
        content2: 'realistaContent2'
    },
    {
        src: Investigativo,
        title: 'investigativoTitle',
        content: 'investigativoContent',
        content2: 'investigativoContent2'
    },
    {
        src: Artistico,
        title: 'artisticoTitle',
        content: 'artisticoContent',
        content2: 'artisticoContent2'
    },
    {
        src: Social,
        title: 'socialTitle',
        content: 'socialContent',
        content2: 'socialContent2'
    },
    {
        src: Empreendedor,
        title: 'empreendedorTitle',
        content: 'empreendedorContent',
        content2: 'empreendedorContent2'
    },
    {
        src: Convencional,
        title: 'convencionalTitle',
        content: 'convencionalContent',
        content2: 'convencionalContent2'
    },
];

export const TestInformation: React.FC = () => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [index, setIndex] = useState(0);

    const handlePrevClick = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    // Configurações do swipe para detecção de gestos de arrastar
    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNextClick,
        onSwipedRight: handlePrevClick,
        trackMouse: true,
    });

    return (
        <Box sx={testInfBoxStyles}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item>
                    <Box {...swipeHandlers} sx={BoxCardHollandStyles}>
                        <IconButton onClick={handlePrevClick}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Grid container alignItems="colum" justifyContent="flex-start" sx={TestInfoContainerStyles}>
                            <Grid item xs={12} md={10}>
                                <Box>
                                    <Typography variant="h5" component="div" sx={TestInfoTitle}>
                                        {t(data[index].title)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={TestInfoContent}>
                                        {t(data[index].content)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={TestInfoContent}>
                                        {t(data[index].content2)}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        {!isMobile && (
                            <CardMedia
                                component="img"
                                height="auto"
                                image={data[index].src}
                                alt={t(data[index].title)}
                            />
                        )}
                        <IconButton onClick={handleNextClick}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>

                    {/* Indicadores (bolinhas) */}
                    <Box sx={IndicatorContainerStyles}>
                        {data.map((_, idx) => (
                            <Box
                                key={idx}
                                sx={idx === index ? ActiveIndicatorStyles : IndicatorStyles}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TestInformation;
