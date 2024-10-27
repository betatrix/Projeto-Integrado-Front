/* eslint-disable max-len */
import React from 'react';
import { Grid, CardContent, List, Box, Button, Typography } from '@mui/material';
import Header from '../../../components/resultTestHeader';
import { DetailsResult, Global, CourseTitle, CareerListItem, PageTile, CourseCard } from './new-styles';
import { useLocation } from 'react-router-dom';
import Footer from '../../../components/homeFooter';

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

    // const perfilPrimarioDescricao = resultado.perfis[0]?.descricao || 'Perfil Primário';
    // const perfilSecundarioDescricao = resultado.perfis[1]?.descricao || 'Perfil Secundário';

    // const allCourses = [
    //     ...resultado.cursos.cursosPerfilPrimario.map(curso => ({ ...curso, perfil: perfilPrimarioDescricao })),
    //     ...resultado.cursos.cursosPerfilSecundario.map(curso => ({ ...curso, perfil: perfilSecundarioDescricao }))
    // ];

    return (
        <>
            <Global />
            <Header />
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                marginTop={'5%'}
                marginBottom={'5%'}
                width={'100%'}>
                <PageTile variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
                    Resultado do Teste
                </PageTile>
                {/* Grid para o texto e a imagem */}
                <Grid container spacing={2} style={{ maxWidth: '80%', alignItems: 'center', marginBottom: '2%' }}>
                    <Grid item xs={12} md={9} style={{maxWidth: '80%', width: '100%'}}>
                        <Typography style={{ fontSize: '22px', textAlign: 'left' }}>
                            {resultado.mensagem}

                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <Box display="flex" justifyContent="center">
                            <img
                                src="src/assets/img/polvo_voquinho.png"
                                alt="Polvo Voquinho"
                                style={{
                                    marginLeft: '12px',
                                    height: '380px',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Cursos para o perfil primário */}
                <Box display="flex" justifyContent="flex-start" width="80%" marginBottom="2%">
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#185D8E' }}>
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
                                            fontSize: '25px',
                                            color: '#185D8E',
                                            fontWeight: 'bold',
                                            marginBottom: '25px'
                                        }}>
                                        {curso.descricao}
                                    </CourseTitle>
                                    <DetailsResult
                                        style={{
                                            fontSize: '20px',
                                            color: 'black',
                                            textAlign: 'justify',
                                            marginBottom: '12px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                                color: 'black',
                                                marginBottom: '17px'
                                            }}>
                                            <img
                                                src="src/assets/livro.png"
                                                alt="Ícone de Livro"
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginRight: '8px'
                                                }} />
                                            Área:
                                        </strong> {curso.area}
                                    </DetailsResult>
                                    <DetailsResult
                                        style={{
                                            fontSize: '20px',
                                            color: 'black',
                                            textAlign: 'justify',
                                            marginBottom: '12px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>
                                            <img
                                                src="src/assets/bolsa-de-dinheiro.png"
                                                alt="Ícone de Empregabilidade"
                                                style={{ width: '24px',
                                                    height: '24px',
                                                    marginRight: '7px'
                                                }} />
                                            Empregabilidade:
                                        </strong> {curso.empregabilidade}
                                    </DetailsResult>
                                    <DetailsResult
                                        style={{
                                            fontSize: '20px',
                                            color: 'black',
                                            textAlign: 'justify',
                                            marginBottom: '10px'
                                        }}>
                                        <strong
                                            style={{
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>
                                            <img
                                                src="src/assets/mala.png"
                                                alt="Ícone de Carreira"
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    marginRight: '7px'
                                                }} />
                                            Possíveis Carreiras:
                                        </strong>
                                    </DetailsResult>
                                    <List>
                                        {curso.possiveisCarreiras.map((carreira, i) => (
                                            <CareerListItem key={i}
                                                style={{ fontSize: '20px',
                                                    color: 'black',
                                                    textAlign: 'left'
                                                }}>
                                                <strong
                                                    style={{
                                                        fontSize: '22px',
                                                        fontWeight: 'bold',
                                                        color: 'black'
                                                    }}>• </strong> <span style={{ fontWeight: 'normal' }}>{carreira}</span>
                                            </CareerListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <Box display="flex" justifyContent="center" marginTop="1rem">
                                    <Button
                                        sx={{
                                            color: '#185D8E',
                                            border: 'solid',
                                            fontWeight: 'bold',
                                            backgroundColor: '#D9EEFF',
                                            padding: '0.7rem 1.05rem',
                                            borderRadius: '10px',
                                            boxShadow: '5px 5px 0px 1px #B9D4F8',
                                            width: '300px',
                                            transition: 'transform 0.8s ease', // Adiciona a transição suave
                                            '&:hover': {
                                                backgroundColor: '#a7cae3',
                                                transform: 'scale(1.1)', // Aumenta o botão em 10%
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
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#185D8E' }}>
        Cursos recomendados para o perfil {resultado.perfis[1].descricao}
                    </Typography>
                </Box>
                <Grid container spacing={6} style={{ maxWidth: '80%', alignItems: 'center' }} justifyContent="center">
                    {resultado.cursos.cursosPerfilSecundario.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <CardContent>
                                    <CourseTitle style={{ fontSize: '25px', color: '#185D8E', fontWeight: 'bold', marginBottom: '25px' }}>
                                        {curso.descricao}
                                    </CourseTitle>
                                    <DetailsResult style={{ fontSize: '20px', color: 'black', textAlign: 'justify', marginBottom: '12px' }}>
                                        <strong style={{ fontSize: '22px', fontWeight: 'bold', color: 'black', marginBottom: '17px' }}>
                                            <img src="src/assets/livro.png" alt="Ícone de Livro" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                                            Área:
                                        </strong> {curso.area}
                                    </DetailsResult>
                                    <DetailsResult style={{ fontSize: '20px', color: 'black', textAlign: 'justify', marginBottom: '12px' }}>
                                        <strong style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>
                                            <img src="src/assets/bolsa-de-dinheiro.png" alt="Ícone de Empregabilidade" style={{ width: '24px', height: '24px', marginRight: '7px' }} />
                                            Empregabilidade:
                                        </strong> {curso.empregabilidade}
                                    </DetailsResult>
                                    <DetailsResult style={{ fontSize: '20px', color: 'black', textAlign: 'justify', marginBottom: '10px' }}>
                                        <strong style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>
                                            <img src="src/assets/mala.png" alt="Ícone de Carreira" style={{ width: '24px', height: '24px', marginRight: '7px' }} />
                                            Possíveis Carreiras:
                                        </strong>
                                    </DetailsResult>
                                    <List>
                                        {curso.possiveisCarreiras.map((carreira, i) => (
                                            <CareerListItem key={i} style={{ fontSize: '20px', color: 'black', textAlign: 'left' }}>
                                                <strong style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}> • </strong> <strong> </strong> <span style={{ fontWeight: 'normal' }}> {carreira}</span>
                                            </CareerListItem>
                                        ))}
                                    </List>
                                </CardContent>
                                <Box display="flex" justifyContent="center" marginTop="1rem">
                                    <Button sx={{ color: '#185D8E', border: 'solid', fontWeight: 'bold', backgroundColor: '#D9EEFF', padding: '0.7rem 1.05rem', borderRadius: '10px', boxShadow: '5px 5px 0px 1px #B9D4F8', width: '300px', '&:hover': { backgroundColor: '#a7cae3' } }}>
                                        Ver Instituições
                                    </Button>
                                </Box>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid>

                {/* <Grid container spacing={6} style={{ maxWidth: '80%', alignItems: 'center' }} justifyContent="center">
                    {allCourses.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative', // Adiciona posição relativa ao card
                            }}>
                                <CardContent>

                                    <CourseTitle style={{
                                        fontSize: '25px',
                                        color:  '#185D8E',
                                        fontWeight: 'bold',
                                        marginBottom: '25px',
                                    }}>
                                        {curso.descricao}
                                    </CourseTitle>
                                    <DetailsResult style={{
                                        fontSize: '20px',
                                        color: 'black',
                                        textAlign: 'justify',
                                        marginBottom: '12px',
                                    }}>
                                        <strong style={{
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                            color: 'black',
                                            marginBottom: '17px',
                                        }}

                                        >
                                            <img
                                                src="src\assets\livro.png" // Altere para o caminho correto da imagem
                                                alt="Ícone de Livro"
                                                style={{
                                                    width: '20px', // Ajuste o tamanho conforme necessário
                                                    height: '20px',
                                                    marginRight: '8px',
                                                }}
                                            />

                                            Área:</strong> {curso.area}
                                    </DetailsResult>
                                    <DetailsResult style={{
                                        fontSize: '20px',
                                        color: 'black',
                                        textAlign: 'justify',
                                        marginBottom: '12px',
                                    }}>
                                        <strong style={{
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                            color: 'black',

                                        }}>
                                            <img
                                                src="src\assets\bolsa-de-dinheiro.png" // Altere para o caminho correto da imagem
                                                alt="Ícone de Livro"
                                                style={{
                                                    width: '24px', // Ajuste o tamanho conforme necessário
                                                    height: '24px',
                                                    marginRight: '7px',
                                                }}
                                            />

                                            Empregabilidade:</strong> {curso.empregabilidade}
                                    </DetailsResult>
                                    <DetailsResult style={{
                                        fontSize: '20px',
                                        color: 'black',
                                        textAlign: 'justify',
                                        marginBottom: '10px',
                                    }}>
                                        <strong style={{
                                            fontSize: '22px',
                                            fontWeight: 'bold',
                                            color: 'black',

                                        }}>
                                            <img
                                                src="src\assets\mala.png" // Altere para o caminho correto da imagem
                                                alt="Ícone de Livro"
                                                style={{
                                                    width: '24px', // Ajuste o tamanho conforme necessário
                                                    height: '24px',
                                                    marginRight: '7px',
                                                }}
                                            />
                                            Possíveis Carreiras:</strong>
                                    </DetailsResult>
                                    <List>
                                        {curso.possiveisCarreiras.map((carreira, i) => (
                                            <CareerListItem style={{
                                                fontSize: '20px',
                                                color: 'black',
                                                textAlign: 'left',
                                            }} key={i}>
                                                <strong style={{
                                                    fontSize: '22px',
                                                    fontWeight: 'bold',
                                                    color: 'black',

                                                }}> •<strong style={{fontWeight: 'normal', textAlign: 'left'}} > { carreira }</strong></strong>
                                            </CareerListItem>
                                        ))}
                                    </List>

                                </CardContent>
                                <Box display="flex"
                                    justifyContent="center"
                                    position="absolute" // Posiciona o box de forma absoluta
                                    bottom="20px" // Fixa o box no final do card
                                    left="50%"
                                    sx={{
                                        transform: 'translateX(-50%)', // Centraliza horizontalmente o botão
                                        padding: '20px',
                                    }}>
                                    <Button sx={{
                                        bottom: '20px',
                                        top: '0px',
                                        color: '#185D8E',
                                        border: 'solid',
                                        fontWeight: 'bold',
                                        backgroundColor: '#D9EEFF',
                                        marginTop: '1rem',
                                        padding: '0.7rem 1.05rem',
                                        borderRadius: '10px',
                                        boxShadow: '5px 5px 0px 1px #B9D4F8',
                                        textAlign: 'center',
                                        width: '300px',
                                        zIndex: 1,
                                        transition: 'transform 0.8s ease', // Adiciona a transição suave
                                        '&:hover': {
                                            backgroundColor: '#a7cae3',
                                            transform: 'scale(1.1)', // Aumenta o botão em 10%
                                        },
                                    }}>
                                        Ver Instituições
                                    </Button>
                                </Box>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid> */}
            </Box>
            <Footer/>
        </>
    );
};

export default ResultScreen;
