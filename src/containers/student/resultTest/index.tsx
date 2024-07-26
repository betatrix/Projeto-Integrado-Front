import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import Header from '../../../components/studentHeader';
import Footer from '../../../components/studentFooter';
import { Global, TitleResult, ResultContainerMessage, ResultMessage, CourseCard } from './styles';

interface ResultData {
    id: number;
    mensagem: string;
    cursos: {
        cursosPerfilPrimario: Array<{
            id: number;
            descricao: string;
            ativo: boolean;
            area: string;
            empregabilidade: string;
            possiveisCarreiras: string[];
        }>;
        cursosPerfilSecundario: Array<{
            id: number;
            descricao: string;
            ativo: boolean;
            area: string;
            empregabilidade: string;
            possiveisCarreiras: string[];
        }>;
    };
    perfis: Array<{
        id: number;
        descricao: string;
    }>;
}

const ResultScreen: React.FC = () => {
    const location = useLocation();
    const { resultado } = location.state as { resultado: ResultData };

    const allCourses = [
        ...resultado.cursos.cursosPerfilPrimario,
        ...resultado.cursos.cursosPerfilSecundario
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // número de slides visíveis
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    centerMode: true,
                    centerPadding: '0',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '20px',
                }
            }
        ]
    };

    return (
        <>
            <Global/>
            <Header />
            <Box sx={{ padding: '20px' }}>
                <TitleResult variant="h4" gutterBottom>
                    Resultado do Teste
                </TitleResult>
                <ResultContainerMessage>
                    <ResultMessage variant="body1" gutterBottom>
                        {resultado.mensagem}
                    </ResultMessage>
                </ResultContainerMessage>

                <Box sx={{ padding: '20px', maxWidth: '100%', overflow: 'hidden' }}>
                    <Slider {...settings}>
                        {allCourses.map(curso => (
                            <CourseCard key={curso.id}>
                                <Typography variant="h6" gutterBottom>
                                    {curso.descricao}
                                </Typography>
                                <Typography variant="body1">
                    Área: {curso.area}
                                </Typography>
                                <Typography variant="body1">
                    Empregabilidade: {curso.empregabilidade}
                                </Typography>
                                <Typography variant="body2">
                    Possíveis Carreiras: {curso.possiveisCarreiras.join(', ')}
                                </Typography>
                            </CourseCard>
                        ))}
                    </Slider>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default ResultScreen;
