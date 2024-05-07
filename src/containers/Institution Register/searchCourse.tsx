import React, { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Checkbox, Button, Typography, CircularProgress, Input, InputLabel, FormControl, FormHelperText, Stepper, StepLabel } from '@mui/material';
import { useInstitution } from '../../context/institutionContext';
import { buscarCursos } from '../../services/courseService';
import { cadastrarCursoInstituicao } from '../../services/courseInstitutionService';
import Step from '@mui/material/Step';
import { CourseForm } from '../../types/courseTypes';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';

export const BuscaCurso: React.FC = () => {
    const { institutionId } = useInstitution(); 
    const navigate = useNavigate();
    const steps = [
        'Cadastrar Dados da Instituição',
        'Adicionar Cursos na Instituição',
        'Adicionar Políticas Afirmativas na Instituição',
      ];


    const [selectedCourses, setSelectedCourses] = useState<{ [key: number]: { notaMec: number, isSelected: boolean } }>({});
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!institutionId) {
            navigate('/cadastro'); 
        } else {
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
        }
    }, [institutionId, navigate]);

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
    };

    const handleNotaMecChange = (courseId: number, notaMec: number) => {
        setSelectedCourses(prev => ({
            ...prev,
            [courseId]: { ...prev[courseId], notaMec }
        }));
    };


    const handleSubmitCourses = async () => {
        if (!institutionId) {
            alert('Instituição não identificada.');
            return;
        }
        try {
            const selectedEntries = Object.entries(selectedCourses)
                .filter(([_, c]) => c.isSelected)
                .map(([id, { notaMec }]) => ({
                    courseId: Number(id),
                    notaMec
                }));
             
            const responses = await Promise.all(selectedEntries.map(({ notaMec, courseId }) =>
                cadastrarCursoInstituicao(institutionId, notaMec, courseId)
            
           
            ));
            console.log('Cursos cadastrados com sucesso:', responses);
            alert('Cursos cadastrados com sucesso na Instituição');
            navigate('/politicas', { state: { institutionId } });
        } catch (error) {
            console.error('Erro ao cadastrar cursos na instituição:', error);
        }
    };

    return (
        <>
        <AdminHeader/>
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, margin: 'auto', mt: 4, marginBottom: '40px' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Cursos da Instituição</Typography>
            <TextField
                label='Pesquisar Curso'
                variant='standard'
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
            />
            {loading ? <CircularProgress /> : (
                <List>
                    {filteredCourses.map((course) => (
                        <ListItem key={course.id} divider>
                            <Checkbox
                                checked={selectedCourses[course.id]?.isSelected || false}
                                onChange={(e) => handleCourseSelection(
                                    course.id, selectedCourses[course.id]?.notaMec || 0, e.target.checked)
                                }
                            />
                            <ListItemText
                                primary={course.descricao}
                            />
                            {selectedCourses[course.id]?.isSelected && (
                                <FormControl style={{ marginLeft: '10px', minWidth: '120px' }}>
                                <InputLabel htmlFor={`notaMec-${course.id}`}>Nota MEC</InputLabel>
                                <Input
                                  id={`notaMec-${course.id}`}
                                  value={selectedCourses[course.id]?.notaMec || ''}
                                  onChange={(e) => handleNotaMecChange(course.id, Number(e.target.value))}
                                  type='number'
                                  inputProps={{ min: 1, max: 5 }}
                                />
                                <FormHelperText>Nota de 1 a 5</FormHelperText>
                              </FormControl>
                                
                            )}
                        </ListItem>
                    ))}
                </List>
            )}
           
            <Box  sx={{ display: 'flex',  mt: 2, justifyContent: 'left', width: '50%' }}>
            <Button variant='outlined' onClick={() => navigate('/cadastro')} sx={{ mr: 1, display: 'flex', justifyContent:'flex-start'}} >Voltar</Button>
            
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2, width: '50%'  }}>
            <Button variant='contained' onClick={handleSubmitCourses} sx={{  mr: 1, display: 'flex', justifyContent:'flex-end' }} >Avançar</Button>
            </Box>
            
        </Box>
        <Footer/>
        </>
    );
};

export default BuscaCurso;





