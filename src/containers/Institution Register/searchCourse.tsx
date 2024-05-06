import React, { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Checkbox, Button, Typography, CircularProgress, Input } from '@mui/material';
import { buscarCursos } from '../../services/courseService';
import { CourseForm } from '../../types/courseTypes';
import { useNavigate, useLocation } from 'react-router-dom';
import { cadastrarCursoInstituicao } from '../../services/courseInstitutionService';


export const BuscaCurso = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<number | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<{ [key: number]: { notaMec: number, isSelected: boolean } }>({});
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const institutionId = location.state?.institutionId;
        if (institutionId) {
            setSelectedInstitutionId(institutionId);
        } else {
            navigate('/cadastro');
        }

        const fetchCourses = async () => {
            setLoading(true);
            try {
                const fetchedCourses = await buscarCursos();
                setCourses(fetchedCourses);
                setFilteredCourses(fetchedCourses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
            setLoading(false);
        };
        fetchCourses();
    }, [location.state, navigate]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = courses.filter(course => course.descricao.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredCourses(filtered);
    };

    const handleCourseSelection = (courseId: number, notaMec: number, isSelected: boolean) => {

        setSelectedCourses(prev => ({
            ...prev,
            [courseId]: { notaMec, isSelected }
        }));
        console.log(selectedCourses);
    };


    const handleNotaMecChange = (courseId: number, notaMec: number) => {

        setSelectedCourses(prev => ({
            ...prev,
            [courseId]: { ...prev[courseId], notaMec }
        }));
    };


    const handleSubmitCourses = async () => {
        if (!selectedInstitutionId) {
            alert('Instituição não identificada.');
            return;
        }
        try {

            const selectedEntries = Object.entries(selectedCourses)
                .filter(([cursoId, c]) => c.isSelected);


            const requests = selectedEntries.map(([cursoId, { notaMec }]) =>
                cadastrarCursoInstituicao(selectedInstitutionId, notaMec, Number(cursoId))
            );


            const responses = await Promise.all(requests);
            console.log(responses);
            // alert('Cursos cadastrados com sucesso na Instituição!');
            console.log(navigate);
            navigate('/politicas');
            console.log(navigate('/politicas'));
        } catch (error) {
            console.error('Erro ao cadastrar cursos na instituição:', error);
        }
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Pesquisar Cursos</Typography>

            <TextField
                label="Pesquisar Curso"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
            />
            {loading ? <CircularProgress /> : (
                <List>
                    {filteredCourses.map((course) => (
                        <ListItem key={course.id} divider>
                            <Checkbox
                                // checked={!!selectedCourses[course.id]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCourseSelection(
                                    course.id, selectedCourses[course.id]?.notaMec || 0, e.target.checked)
                                }


                            />
                            <ListItemText
                                primary={course.descricao}
                            //   secondary={`ID: ${course.id} - Ativo: ${course.ativo ? 'Sim' : 'Não'}`}
                            />
                            {selectedCourses[course.id]?.isSelected && (

                                <Input
                                    value={selectedCourses[course.id]?.notaMec || ''}
                                    onChange={(e) => handleNotaMecChange(course.id, Number(e.target.value))}
                                    type="number"
                                    inputProps={{ min: 0, max: 5 }}
                                    style={{ width: '50px', marginLeft: '10px' }}
                                />
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
            <Button variant="outlined" onClick={() => navigate('/cadastro')} sx={{ mt: 2, mr: 1 }}>Voltar</Button>
            <Button variant="contained" onClick={handleSubmitCourses} sx={{ mt: 2 }}>Avançar</Button>
        </Box>
    );


};





