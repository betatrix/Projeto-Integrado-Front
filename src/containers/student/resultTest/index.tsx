import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, List, ListItem, Modal } from '@mui/material';
import Slider from 'react-slick';
import Header from '../../../components/studentHeader';
import Footer from '../../../components/studentFooter';
import { Global, TitleResult, ResultContainerMessage, ResultMessage, CourseCard, CarouselContainer, CustomButton, ModalContent } from './styles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

interface Institution {
    id: number;
    nome: string;
    sigla: string;
    site: string;
    notaMec: number;
}

const ResultScreen: React.FC = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const location = useLocation();
    const { resultado } = location.state as { resultado: ResultData };

    const [openModal, setOpenModal] = useState(false);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

    const perfilPrimarioDescricao = resultado.perfis[0]?.descricao || 'Perfil Primário';
    const perfilSecundarioDescricao = resultado.perfis[1]?.descricao || 'Perfil Secundário';

    const allCourses = [
        ...resultado.cursos.cursosPerfilPrimario.map(curso => ({ ...curso, perfil: perfilPrimarioDescricao })),
        ...resultado.cursos.cursosPerfilSecundario.map(curso => ({ ...curso, perfil: perfilSecundarioDescricao }))
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
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

    const handleOpenModal = async (cursoId: number) => {
        setSelectedCourse(cursoId);
        try {
            const response = await fetch(`${apiUrl}/cursoInstituicao/curso/mec/${cursoId}`);
            const data: Institution[] = await response.json();
            setInstitutions(data);
            setOpenModal(true);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Global />
            <Header />
            <Box sx={{ padding: '20px', overflow: 'hidden' }}>
                <TitleResult variant="h4" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '30px' }}>
                    Resultado do Teste
                </TitleResult>
                <ResultContainerMessage>
                    <ResultMessage variant="body1" gutterBottom style={{textAlign: 'justify'}}>
                        {resultado.mensagem}
                    </ResultMessage>
                </ResultContainerMessage>

                <CarouselContainer>
                    <Slider {...settings}>
                        {allCourses.map((curso, index) => (
                            <CourseCard key={curso.id}>
                                <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
                                    {index < 3 ? perfilPrimarioDescricao : perfilSecundarioDescricao}
                                </Typography>
                                <Typography variant="body1">
                                    Curso recomendado: {curso.descricao}
                                </Typography>
                                <Typography variant="body1">
                                    Área: {curso.area}
                                </Typography>
                                <Typography variant="body1">
                                    Empregabilidade: {curso.empregabilidade}
                                </Typography>
                                <Typography variant="body1">
                                    Possíveis Carreiras:
                                </Typography>
                                <List>
                                    {curso.possiveisCarreiras.map((carreira, i) => (
                                        <ListItem key={i}>
                                            - {carreira}
                                        </ListItem>
                                    ))}
                                </List>
                                <CustomButton
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpenModal(curso.id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Ver Instituições
                                </CustomButton>
                            </CourseCard>
                        ))}
                    </Slider>
                </CarouselContainer>

                <Modal open={openModal} onClose={handleCloseModal}>
                    <ModalContent
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            maxWidth: '600px',
                            maxHeight: '60vh', // Limita a altura máxima do modal
                            overflowY: 'auto', // Adiciona barra de rolagem vertical
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                        Instituições que oferecem o curso
                        </Typography>
                        {institutions.length > 0 ? (
                            <List>
                                {institutions.map((inst) => (
                                    <ListItem key={inst.id}>
                                        <Typography variant="body1">
                                            {inst.nome} ({inst.sigla}) - <a href={inst.site} target="_blank" rel="noopener noreferrer">Site</a> - Nota MEC: {inst.notaMec}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1">Nenhuma instituição encontrada.</Typography>
                        )}
                    </ModalContent>
                </Modal>

            </Box>
            <Footer />
        </>
    );
};

export default ResultScreen;
