import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    CircularProgress,
    IconButton,
    Modal,
    Button,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { buscarCursosListaCompleta, editarCurso, buscarAreas, excluirCurso } from '../../../services/courseService';
import { CourseForm, Area } from '../../../types/courseTypes';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseForm | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const fetchedCourses = await buscarCursosListaCompleta();
                setCourses(fetchedCourses);
                setFilteredCourses(fetchedCourses);
            } catch (error) {
                console.error('Erro ao buscar cursos:', error);
            }
            setLoading(false);
        };
        fetchCourses();

        const fetchAreas = async () => {
            try {
                const fetchedAreas = await buscarAreas();
                setAreas(fetchedAreas);
            } catch (error) {
                console.error('Erro ao buscar áreas:', error);
            }
        };
        fetchAreas();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = courses.filter((course) =>
            course?.descricao?.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleEditModalOpen = (course: CourseForm) => {
        setSelectedCourse({
            ...course,
            areaId: course.area ? course.area.id : 0,
        });
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedCourse(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (course: CourseForm) => {
        setSelectedCourse({
            ...course,
            areaId: course.area ? course.area.id : 0,
        });
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedCourse(null);
        setDeleteModalOpen(false);
    };

    const handleUpdateCourse = async () => {
        if (selectedCourse) {
            const updatedArea = areas.find(area => area.id === selectedCourse.areaId) || selectedCourse.area;

            const updatedCourse: CourseForm = {
                ...selectedCourse,
                area: updatedArea,
            };

            try {
                await editarCurso(updatedCourse);
                setCourses(courses.map((course) =>
                    course.id === updatedCourse.id ? updatedCourse : course
                ));
                setFilteredCourses(filteredCourses.map((course) =>
                    course.id === updatedCourse.id ? updatedCourse : course
                ));
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
                setCourses(courses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ativo: false } : c
                ));
                setFilteredCourses(courses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ativo: false } : c
                ));
                handleDeleteModalClose();
            } catch (error) {
                console.error('Erro ao excluir curso:', error);
            }
        }
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar cursos"
                        variant="outlined"
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace', }}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link to="/cadastro-curso">
                        <Button sx={{
                            height: '50px',
                            fontSize: '17px',
                            fontFamily: 'Roboto, monospace',
                            color: 'white',
                            backgroundColor: '#185D8E',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#104A6F',
                            },
                        }}>Cadastrar</Button>
                    </Link>
                </Box>
                <Box sx={{ paddingTop: 10, paddingLeft: 45, paddingRight: 45, marginBottom: 10 }}>
                    {loading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '60px'
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer >
                            <Table>
                                <TableRow>
                                    <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575' }}>AÇÕES</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>CURSOS</TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575' }}>STATUS</TableCell>
                                </TableRow>

                                <TableBody>
                                    {filteredCourses.map((course) => (
                                        <TableRow key={course.id}>

                                            <TableCell align="center" sx={{borderRight: '1px solid #ddd'}}>
                                                <IconButton onClick={() => handleEditModalOpen(course)}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(course)}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>

                                            <TableCell sx={{ borderRight: '1px solid #ddd' }}>{course.descricao}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{course.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                            <Grid item sx={{ width: '43%' }} alignItems="center">
                                <FormControl fullWidth>
                                    <InputLabel id="area-label">Área</InputLabel>
                                    <Select
                                        labelId="area-label"
                                        value={selectedCourse.areaId}
                                        label="Área"
                                        onChange={(e) =>
                                            setSelectedCourse({
                                                ...selectedCourse,
                                                areaId: e.target.value as number,
                                            })
                                        }
                                    >
                                        {areas.map((area) => (
                                            <MenuItem key={area.id} value={area.id}>
                                                {area.descricao}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                    <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <Button variant="outlined" onClick={handleDeleteModalClose}>
                                Não
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDeleteCourse}
                            >
                                Sim
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default CourseManagement;
