import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';
import poliedro from '../../../assets/img/poliedro.png';
import objetivo from '../../../assets/img/objetivo.png';
import stoodi from '../../../assets/img/stoodi.png';
import hexag from '../../../assets/img/hexag.png';
import descomplica from '../../../assets/img/descomplica.png';

const LogoCarousel: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Padrão para desktop
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 960, // Tablets
                settings: {
                    slidesToShow: 3, // Mostra 3 logos em telas médias
                },
            },
            {
                breakpoint: 600, // Mobile
                settings: {
                    slidesToShow: 2, // Mostra 2 logos em telas pequenas
                },
            },
            {
                breakpoint: 480, // Mobile bem pequenos
                settings: {
                    slidesToShow: 2, // Mostra 1 logo em telas menores
                },
            },
        ],
    };

    const logos = [
        poliedro,
        objetivo,
        stoodi,
        hexag,
        descomplica,
    ];

    return (
        <Box sx={{ maxWidth: '100%', padding: '0.3rem', }}>
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'center'}}>
                        <img 
                            src={logo} 
                            alt={`Logo ${index + 1}`} 
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%', 
                                paddingLeft: '2.5rem',
                                objectFit: 'contain',
                            }} 
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default LogoCarousel;
