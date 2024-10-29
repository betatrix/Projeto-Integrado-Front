/* eslint-disable max-len */
import React, { useState } from 'react';
import { Grid, CardContent, List, Box, Button, Typography, Modal, TextField, IconButton, ListItem, useMediaQuery } from '@mui/material';
import Header from '../../../components/resultTestHeader';
import { DetailsResult, Global, CourseTitle, CareerListItem, PageTile, CourseCard, BackButton, CustomLink, ScrollableList, ModalContent, MobileBackButton } from './new-styles';
import { useLocation } from 'react-router-dom';
import Footer from '../../../components/homeFooter';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PaidIcon from '@mui/icons-material/Paid';
import BookIcon from '@mui/icons-material/Book';

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
    const isMobile = useMediaQuery('(max-width:600px)');

    const [openModal, setOpenModal] = useState(false);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<{ id: number, descricao: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);

    const handleOpenModal = async (cursoId: number, descricao: string) => {
        setSelectedCourse({ id: cursoId, descricao });
        try {
            const response = await fetch(`${apiUrl}/cursoInstituicao/curso/mec/${cursoId}`);
            const data: Institution[] = await response.json();
            setInstitutions(data);
            setFilteredInstitutions(data);
            setOpenModal(true);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredInstitutions(institutions.filter(inst =>
            inst.nome.toLowerCase().includes(term) || inst.sigla.toLowerCase().includes(term)
        ));
    };

    return (
        <>
            <Global />
            <Header />

            {isMobile && (
                <MobileBackButton
                    startIcon={<ArrowCircleLeftIcon style={{width: '30px', height: '30px'}} />}

                >   <CustomLink to={'/estudante'}>
                    </CustomLink>
                </MobileBackButton>
            )}

            {!isMobile && (
                <BackButton
                    startIcon={<ArrowCircleLeftIcon />}

                >
                    <CustomLink to={'/estudante'}> Voltar
                    </CustomLink>
                </BackButton>

            )}

            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                marginTop={isMobile ? '12%' : '5%'}
                marginBottom={isMobile ? '12%' : '5%'}
                width={'100%'}>
                <PageTile variant="h4" gutterBottom
                    style={{ fontWeight: 'bold' }}
                    fontSize={isMobile ? '25px' : '30px'}
                    marginTop={isMobile ? '8%' : '0'}
                    marginBottom={isMobile ? '8%' : '0'}
                >
                    Resultado do Teste
                </PageTile>
                {/* Grid para o texto e a imagem */}
                <Grid container spacing={2} style={{ maxWidth: '80%', alignItems: 'center', marginBottom: '2%' }}>
                    <Grid item xs={12} md={9} style={{width: '100%'}}
                        maxWidth={isMobile ? '90%' : '75%'}
                    >
                        <Typography style={{ fontSize: '20px' }}
                            textAlign={isMobile ? 'justify' : 'left'}
                            marginBottom={isMobile ? '8%' : '0'}
                        >
                            {resultado.mensagem}
                        </Typography>
                    </Grid>
                    {!isMobile && (
                        <Grid item xs={12} md={3} >
                            <Box display="flex" justifyContent="center">
                                <img
                                    src="src/assets/img/polvo_voquinho.png"
                                    alt="Polvo Voquinho"
                                    style={{
                                        marginLeft: '70px',
                                        height: '380px',
                                    }}
                                />
                            </Box>
                        </Grid>
                    )}

                </Grid>

                {/* Cursos para o perfil primário */}
                <Box display="flex" justifyContent="flex-start" width="80%" marginBottom="2%">
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#0B2A40' }}
                        fontSize={isMobile ? '20px' : '25px'}
                        marginBottom={isMobile ? '5%' : '0'}
                    >
        Cursos recomendados para o perfil {resultado.perfis[0].descricao}
                    </Typography>
                </Box>

                <Grid container spacing={6}
                    style={{
                        maxWidth: '80%',
                        alignItems: 'center' }}
                    justifyContent="center">
                    {resultado.cursos.cursosPerfilPrimario.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard
                                style={{ display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between' }}>
                                <CardContent>
                                    <CourseTitle
                                        style={{
                                            fontSize: '23px',
                                            color: '#185D8E',
                                            fontWeight: 'bold',
                                            marginBottom: '25px'
                                        }}>
                                        {curso.descricao}
                                    </CourseTitle>
                                    <DetailsResult
                                        style={{
                                            fontSize: '18px',
                                            color: 'black',
                                            textAlign: 'left',
                                            marginBottom: '12px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginBottom: '17px'
                                            }}>

                                            <BookIcon style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                color: '#185D8E'
                                            }}></BookIcon>
                                            Área:
                                        </strong> {curso.area}
                                    </DetailsResult>
                                    <DetailsResult
                                        style={{
                                            fontSize: '18px',
                                            color: 'black',
                                            textAlign: 'left',
                                            marginBottom: '12px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>
                                            <PaidIcon style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                color: '#185D8E'
                                            }}></PaidIcon>

                                            Empregabilidade:
                                        </strong> {curso.empregabilidade}
                                    </DetailsResult>
                                    <DetailsResult
                                        style={{
                                            fontSize: '18px',
                                            color: 'black',
                                            textAlign: 'left',
                                            marginBottom: '10px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>
                                            <BusinessCenterIcon style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                color: '#185D8E'
                                            }}></BusinessCenterIcon>

                                            Possíveis Carreiras:
                                        </strong>
                                    </DetailsResult>

                                    <ScrollableList>
                                        <List>
                                            {curso.possiveisCarreiras.map((carreira, i) => (
                                                <CareerListItem style={{
                                                    fontSize: '18px',
                                                    color: 'black',
                                                    textAlign: 'left',
                                                }} key={i}>
                                                    <strong style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        color: 'black',

                                                    }}> •<strong style={{fontWeight: 'normal', textAlign: 'left'}} > { carreira }</strong></strong>
                                                </CareerListItem>
                                            ))}
                                        </List>
                                    </ScrollableList>
                                </CardContent>
                                <Box display="flex" justifyContent="center" marginTop="1rem">
                                    <Button onClick={() => handleOpenModal(curso.id, curso.descricao)}
                                        sx={{
                                            color: '#185D8E',
                                            border: 'solid',
                                            fontWeight: 'bold',
                                            backgroundColor: '#D9EEFF',
                                            padding: '0.7rem 1.05rem',
                                            borderRadius: '10px',
                                            boxShadow: '5px 5px 0px 1px #B9D4F8',
                                            width: '300px',
                                            transition: 'transform 0.8s ease',
                                            '&:hover': {
                                                backgroundColor: '#a7cae3',
                                                transform: 'scale(1.1)',
                                            } }}>
                                        Ver Instituições
                                    </Button>
                                </Box>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid>

                {/* Cursos recomendados para o perfil secundario */}
                <Box display="flex" justifyContent="flex-start" width="80%" marginBottom="2%" marginTop='6%'>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#0B2A40' }}
                        fontSize={isMobile ? '20px' : '25px'}
                        marginBottom={isMobile ? '5%' : '0'}
                        marginTop={isMobile ? '5%' : '0'}
                    >
        Cursos recomendados para o perfil {resultado.perfis[1].descricao}
                    </Typography>
                </Box>

                <Grid container spacing={6}
                    style={{
                        maxWidth: '80%',
                        alignItems: 'center' }}
                    justifyContent="center">
                    {resultado.cursos.cursosPerfilSecundario.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard
                                style={{ display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between' }}>
                                <CardContent>
                                    <CourseTitle
                                        style={{
                                            fontSize: '23px',
                                            color: '#185D8E',
                                            fontWeight: 'bold',
                                            marginBottom: '25px'
                                        }}>
                                        {curso.descricao}
                                    </CourseTitle>
                                    <DetailsResult
                                        style={{
                                            fontSize: '18px',
                                            color: 'black',
                                            textAlign: 'left',
                                            marginBottom: '12px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginBottom: '17px'
                                            }}>
                                            <BookIcon style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                color: '#185D8E'
                                            }}></BookIcon>
                                            Área:
                                        </strong> {curso.area}
                                    </DetailsResult>
                                    <DetailsResult
                                        style={{
                                            fontSize: '18px',
                                            color: 'black',
                                            textAlign: 'left',
                                            marginBottom: '12px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>
                                            <PaidIcon style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                color: '#185D8E'
                                            }}></PaidIcon>
                                            Empregabilidade:
                                        </strong> {curso.empregabilidade}
                                    </DetailsResult>
                                    <DetailsResult
                                        style={{
                                            fontSize: '18px',
                                            color: 'black',
                                            textAlign: 'left',
                                            marginBottom: '10px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>
                                            <BusinessCenterIcon style={{
                                                width: '20px',
                                                height: '20px',
                                                marginRight: '8px',
                                                color: '#185D8E'
                                            }}></BusinessCenterIcon>
                                            Possíveis Carreiras:
                                        </strong>
                                    </DetailsResult>

                                    <ScrollableList>
                                        <List>
                                            {curso.possiveisCarreiras.map((carreira, i) => (
                                                <CareerListItem style={{
                                                    fontSize: '18px',
                                                    color: 'black',
                                                    textAlign: 'left',
                                                }} key={i}>
                                                    <strong style={{
                                                        fontSize: '20px',
                                                        fontWeight: 'bold',
                                                        color: 'black',

                                                    }}> •<strong style={{fontWeight: 'normal', textAlign: 'left'}} > { carreira }</strong></strong>
                                                </CareerListItem>
                                            ))}
                                        </List>
                                    </ScrollableList>
                                </CardContent>
                                <Box display="flex" justifyContent="center" marginTop="1rem">
                                    <Button onClick={() => handleOpenModal(curso.id, curso.descricao)}
                                        sx={{
                                            color: '#185D8E',
                                            border: 'solid',
                                            fontWeight: 'bold',
                                            backgroundColor: '#D9EEFF',
                                            padding: '0.7rem 1.05rem',
                                            borderRadius: '10px',
                                            boxShadow: '5px 5px 0px 1px #B9D4F8',
                                            width: '300px',
                                            transition: 'transform 0.8s ease',
                                            '&:hover': {
                                                backgroundColor: '#a7cae3',
                                                transform: 'scale(1.1)',
                                            } }}>
                                        Ver Instituições
                                    </Button>
                                </Box>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/*Modal de instituições*/}
            <Modal open={openModal} onClose={handleCloseModal}>
                <ModalContent
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxWidth: '600px',
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: '20px',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 15,
                            right: 15,
                            color: '#185D8E',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" gutterBottom style={{textAlign: 'center', fontWeight: 'bold', color: '#0B2A40', marginTop: '15px', marginBottom: '15px'}}>
                            Instituições que oferecem o curso de {selectedCourse?.descricao}
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Pesquisar instituições..."
                        fullWidth
                        style={{ marginBottom: '15px' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    {institutions.length > 0 ? (
                        <List>
                            {filteredInstitutions.map((inst) => (
                                <ListItem key={inst.id}>
                                    <Typography variant="body1" style={{textAlign: 'justify', }}>
                                        <Typography style={{fontWeight: 'bold', color: '#185D8E'}}>
                                            {inst.nome} ({inst.sigla}):
                                        </Typography>
                                        <Typography style={{marginLeft: '8px'}}>
                                            <strong style={{fontWeight: 'bold'}}>Site:</strong>  {inst.site}
                                        </Typography>
                                        <Typography style={{marginLeft: '8px'}}>
                                            <strong style={{fontWeight: 'bold'}}>Nota MEC do Curso:</strong>  {inst.notaMec}
                                        </Typography>
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" style={{textAlign: 'justify'}}>Nenhuma instituição encontrada.</Typography>
                    )}
                </ModalContent>
            </Modal>
            <Footer/>
        </>
    );
};

export default ResultScreen;
