import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    IconButton,
    Modal,
    Button,
    Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';
import {
    buscarCursos,
    editarCurso,
    excluirCurso,
} from '../../services/courseService';
import { CourseForm } from '../../types/courseTypes';
import BackButton from '../../components/Back Page Button';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseForm | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const fetchedCourses = await buscarCursos();
                setCourses(fetchedCourses);
                setFilteredCourses(fetchedCourses);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
            setLoading(false);
        };
        fetchCourses();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = courses.filter((course) =>
            course.descricao.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleEditModalOpen = (course: CourseForm) => {
        setSelectedCourse(course);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedCourse(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (course: CourseForm) => {
        setSelectedCourse(course);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedCourse(null);
        setDeleteModalOpen(false);
    };

    const handleUpdateCourse = async () => {
        if (selectedCourse) {
            try {
                await editarCurso(selectedCourse.id, selectedCourse);
                setCourses(
                    courses.map((course) =>
                        course.id === selectedCourse.id ? selectedCourse : course
                    )
                );
                setFilteredCourses(
                    courses.map((course) =>
                        course.id === selectedCourse.id ? selectedCourse : course
                    )
                );
                handleEditModalClose();
            } catch (error) {
                console.error('Erro ao atualizar curso:', error);
            }
        }
    };

    const handleDeleteCourse = async () => {
        if (selectedCourse) {
            try {
                await excluirCurso(selectedCourse.id);
                setCourses(courses.filter((course) => course.id !== selectedCourse.id));
                setFilteredCourses(
                    courses.filter((course) => course.id !== selectedCourse.id)
                );
                handleDeleteModalClose();
            } catch (error) {
                console.error('Erro ao excluir curso:', error);
            }
        }
    };

    return (
        <>
            <AdminHeader />
            <Box
                sx={{
                    marginTop: '20px',
                    marginBottom: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 600,
                    margin: 'auto',
                    mt: 4,
                }}
            >

                <Link to='/admin'>
                    <BackButton></BackButton>
                </Link>
                <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
                    Lista de Cursos
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <TextField
                        label="Pesquisar curso"
                        variant="outlined"
                        sx={{ width: '70%' }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Box>
                <Box sx={{ paddingTop: 10 }}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <List>
                            {filteredCourses.map((course) => (
                                <ListItem key={course.id} divider>
                                    <ListItemText primary={course.descricao} />
                                    <IconButton onClick={() => handleEditModalOpen(course)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteModalOpen(course)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>
            <Footer />

            {/* Edit Modal */}
            <Modal
                open={editModalOpen}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: '80%',
                        maxWidth: 620,
                    }}
                >
                    {selectedCourse && (
                        <Grid container spacing={3} direction="column" alignItems="center">
                            <Grid item>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ marginTop: 2, textAlign: 'center' }}
                                >
                                    Editar Curso
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Descrição"
                                    value={selectedCourse.descricao}
                                    onChange={(e) =>
                                        setSelectedCourse({
                                            ...selectedCourse,
                                            descricao: e.target.value,
                                        })
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Empregabilidade"
                                    value={selectedCourse.empregabilidade}
                                    onChange={(e) =>
                                        setSelectedCourse({
                                            ...selectedCourse,
                                            empregabilidade: e.target.value,
                                        })
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Possíveis Carreiras"
                                    value={
                                        selectedCourse.possiveisCarreiras
                                            ? selectedCourse.possiveisCarreiras.join(', ')
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setSelectedCourse({
                                            ...selectedCourse,
                                            possiveisCarreiras: e.target.value
                                                .split(',')
                                                .map((carreira) => carreira.trim()),
                                        })
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Área"
                                    value={selectedCourse.area?.descricao}
                                    onChange={(e) =>
                                        setSelectedCourse({
                                            ...selectedCourse,
                                            area: { descricao: e.target.value },
                                        })
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item container justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={handleEditModalClose}>
                                        Cancelar
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdateCourse}
                                    >
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 400,
                        width: '90%',
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmar exclusão
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tem certeza que deseja excluir o curso {selectedCourse?.descricao}?
                    </Typography>
                    <Button onClick={handleDeleteCourse}>Sim</Button>
                    <Button onClick={handleDeleteModalClose}>Não</Button>
                </Box>
            </Modal>
        </>
    );
};

export default CourseList;
