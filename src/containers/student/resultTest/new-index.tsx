import React from 'react';
import { Grid, CardContent, List, Box } from '@mui/material';
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

    const perfilPrimarioDescricao = resultado.perfis[0]?.descricao || 'Perfil Primário';
    const perfilSecundarioDescricao = resultado.perfis[1]?.descricao || 'Perfil Secundário';

    const allCourses = [
        ...resultado.cursos.cursosPerfilPrimario.map(curso => ({ ...curso, perfil: perfilPrimarioDescricao })),
        ...resultado.cursos.cursosPerfilSecundario.map(curso => ({ ...curso, perfil: perfilSecundarioDescricao }))
    ];

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
                <Grid container spacing={6} style={{ maxWidth: '80%', alignItems: 'center' }} justifyContent="center">
                    {allCourses.map((curso, index) => (
                        <Grid item lg={4} key={index}>
                            <CourseCard>
                                <CardContent>

                                    <CourseTitle>
                                        {curso.descricao}
                                    </CourseTitle>
                                    <DetailsResult>
                        Área: {curso.area}
                                    </DetailsResult>
                                    <DetailsResult>
                        Empregabilidade: {curso.empregabilidade}
                                    </DetailsResult>
                                    <DetailsResult>
                        Possíveis Carreiras:
                                    </DetailsResult>
                                    <List>
                                        {curso.possiveisCarreiras.map((carreira, i) => (
                                            <CareerListItem key={i}>
                                - {carreira}
                                            </CareerListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </CourseCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Footer/>
        </>
    );
};

export default ResultScreen;
