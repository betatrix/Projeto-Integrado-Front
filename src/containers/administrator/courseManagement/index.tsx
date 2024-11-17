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
    FormControl,
    InputAdornment,
    Autocomplete,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Paper,
    TableHead,
    Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { buscarCursosListaCompleta, editarCurso, buscarAreas, excluirCurso } from '../../../services/courseService';
import { CourseForm, Area, TipoInstituicaoCurso, NivelEmpregabilidade } from '../../../types/courseTypes';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import * as yup from 'yup';

const niveisEmpregabilidade = [
    { label: 'Alta', value: 'ALTA' },
    { label: 'Média', value: 'MEDIA' },
    { label: 'Baixa', value: 'BAIXA' },
    { label: 'Em Queda', value: 'EM_QUEDA' },
];

const tiposInstituicao = [
    { label: 'Superior', value: 'SUPERIOR' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Ambos', value: 'AMBOS' },
];

// const courseValidationSchema = yup.object().shape({
//     descricao: yup.string().required('Descrição é obrigatória'),
//     empregabilidade: yup
//         .mixed<NivelEmpregabilidade>()
//         .oneOf(Object.values(NivelEmpregabilidade))
//         .required('Nível de Empregabilidade é obrigatório'),
//     possiveisCarreiras: yup.array().of(yup.string()).nullable(),
//     areaId: yup.number().required('Área é obrigatória'),
//     perfil: yup.string().required('Perfil é obrigatório'),
//     tipoInstituicaoCurso: yup
//         .mixed<TipoInstituicaoCurso>()
//         .oneOf(Object.values(TipoInstituicaoCurso))
//         .required('Tipo de Instituição é obrigatório'),
// });

const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<CourseForm[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseForm | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedAreas = await buscarAreas();
                setAreas(fetchedAreas);

                const fetchedCourses = await buscarCursosListaCompleta();

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const mappedCourses = fetchedCourses.map((course: { area: any; }) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const areaObject = fetchedAreas.find((area: { descricao: any; }) => area.descricao === course.area);
                    return {
                        ...course,
                        area: areaObject || null
                    };
                });

                setCourses(mappedCourses);
                setFilteredCourses(mappedCourses);
            } catch (error) {
                console.error('Erro ao buscar cursos ou áreas:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = courses.filter((course) =>
            course?.descricao?.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredCourses(filtered);
        setPage(0); // Resetar para a primeira página após a pesquisa
    };

    const handleEditModalOpen = (course: CourseForm) => {
        console.log('Curso selecionado para edição:', course);
        setSelectedCourse({
            ...course,
            ativo: course.ativo ? 'Ativo' : 'Inativo'
        }); // Usa o curso completo com `area` como um objeto completo
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedCourse(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (course: CourseForm) => {
        setSelectedCourse(course); // Apenas define o curso selecionado diretamente
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedCourse(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteCourse = async () => {
        if (selectedCourse) {
            try {
                await excluirCurso(selectedCourse.id);
                setCourses(courses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ativo: false } : c
                ));
                setFilteredCourses(filteredCourses.map((c) =>
                    c.id === selectedCourse.id ? { ...c, ativo: false } : c
                ));
                handleDeleteModalClose();
            } catch (error) {
                console.error('Erro ao excluir curso:', error);
            }
        }
    };

    const handleDetailModalOpen = (course: CourseForm) => {
        setSelectedCourse(course);
        setDetailModalOpen(true);
    };

    const handleDetailModalClose = () => {
        setSelectedCourse(null);
        setDetailModalOpen(false);
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedCourses = filteredCourses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDeleteSelectedCourses = async () => {
        try {
            for (const courseId of selectedCourses) {
                await excluirCurso(courseId);
            }
            setCourses(courses.filter((course) => !selectedCourses.includes(course.id)));
            setFilteredCourses(filteredCourses.filter((course) => !selectedCourses.includes(course.id)));
            setSelectedCourses([]);
        } catch (error) {
            console.error('Erro ao excluir cursos selecionados:', error);
        }
    };

    const toggleSelectCourse = (courseId: number) => {
        setSelectedCourses((prevSelected) =>
            prevSelected.includes(courseId)
                ? prevSelected.filter((id) => id !== courseId)
                : [...prevSelected, courseId]
        );
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
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '10rem' }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDeleteSelectedCourses}
                                                disabled={selectedCourses.length === 0}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: '#185D8E',
                                                    fontWeight: 'bold',
                                                    fontFamily: 'Roboto, monospace',
                                                }}
                                            >
                                                Excluir
                                            </Button>
                                        </TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>ID</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>CURSOS</TableCell>
                                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>STATUS</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginatedCourses.map((course) => (
                                        <TableRow key={course.id}>

                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                                <Checkbox
                                                    checked={selectedCourses.includes(course.id)}
                                                    onChange={() => toggleSelectCourse(course.id)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                />
                                                <IconButton onClick={() => handleEditModalOpen(course)}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(course)}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{course.id}</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography sx={{
                                                        fontSize: '15px', color: '#757575',
                                                    }}>{course.descricao}</Typography>
                                                    <IconButton size="small" onClick={() => handleDetailModalOpen(course)} sx={{
                                                        color: '#185D8E',
                                                    }}>
                                                        <VisibilityOutlinedIcon sx={{
                                                            fontSize: '18px'
                                                        }} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{course.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 7 }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredCourses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
                        borderRadius: '5px'
                    }}
                >
                    {selectedCourse && (
                        <Formik
                            // initialValues={selectedCourse}
                            // enableReinitialize
                            initialValues={{
                                ...selectedCourse,
                                ativo: selectedCourse?.ativo as string
                            }}
                            enableReinitialize
                            // validationSchema={courseValidationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const finalValues = {
                                        ...values,
                                        ativo: values.ativo === 'Ativo', // Converte para booleano
                                        areaId: values.area?.id
                                    };
                                    await editarCurso(finalValues);
                                    setCourses(courses.map((course) =>
                                        course.id === values.id ? { ...course, ...finalValues } : course
                                    ));
                                    setFilteredCourses(filteredCourses.map((course) =>
                                        course.id === values.id ? { ...course, ativo: finalValues.ativo } : course
                                    ));
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar curso:', error);
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ values, setFieldValue, errors, touched }) => (
                                <Form>
                                    <Grid container spacing={2} direction="column" alignItems="center"></Grid>
                                    <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                                        <Typography
                                            variant="h5" gutterBottom sx={{
                                                fontSize: '20px',
                                                marginBottom: '25px', marginTop: '10px', color: '#185D8E',
                                                fontFamily: 'Roboto, monospace', fontWeight: 'bold', textAlign: 'justify'
                                            }}
                                        >
                                            Edite os campos  do Curso selecionado:
                                        </Typography>
                                    </Grid>

                                    <Grid container spacing={2} direction="column" alignItems="center">
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <Field
                                                as={TextField}
                                                name="descricao"
                                                label="Nome"
                                                fullWidth
                                                error={touched.descricao && Boolean(errors.descricao)}
                                                helperText={touched.descricao && errors.descricao}
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={niveisEmpregabilidade}
                                                    getOptionLabel={(option) => option.label}
                                                    value={niveisEmpregabilidade.find((option) => option.value === values.empregabilidade) || null}
                                                    onChange={(_, value) =>
                                                        setFieldValue('empregabilidade', value ? value.value : NivelEmpregabilidade.INDEFINIDO)
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Empregabilidade"
                                                            variant="filled"
                                                            error={touched.empregabilidade && Boolean(errors.empregabilidade)}
                                                            helperText={touched.empregabilidade && errors.empregabilidade}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={areas}
                                                    getOptionLabel={(option) => option.descricao}
                                                    value={values.area || null}
                                                    onChange={(_, value) => setFieldValue('area', value || null)}
                                                    isOptionEqualToValue={(option, value) => option.id === value?.id} // Compara pelo `id`
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Área"
                                                            variant="filled"
                                                            error={touched.area && Boolean(errors.area)}
                                                            helperText={touched.area && errors.area}
                                                        />
                                                    )}
                                                />
                                            </FormControl>

                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={tiposInstituicao}
                                                    getOptionLabel={(option) => option.label}
                                                    value={tiposInstituicao.find((option) => option.value === values.tipo) || null}
                                                    onChange={(_, value) =>
                                                        setFieldValue('tipo', value ? value.value : TipoInstituicaoCurso.INDEFINIDO)
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Tipo de Instituição"
                                                            variant="filled"
                                                            error={touched.tipo && Boolean(errors.tipo)}
                                                            helperText={touched.tipo && errors.tipo}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <Field
                                                as={TextField}
                                                name="possiveisCarreiras"
                                                label="Possíveis Carreiras"
                                                fullWidth
                                                value={values.possiveisCarreiras ? values.possiveisCarreiras.join(', ') : ''}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    setFieldValue(
                                                        'possiveisCarreiras',
                                                        e.target.value.split(',').map((carreira) => carreira.trim())
                                                    )
                                                }
                                                error={touched.possiveisCarreiras && Boolean(errors.possiveisCarreiras)}
                                                helperText={touched.possiveisCarreiras && errors.possiveisCarreiras}
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: '60%' }} alignItems="center">
                                            <FormControl fullWidth variant="filled">
                                                <Autocomplete
                                                    disablePortal
                                                    options={['Ativo', 'Inativo']}
                                                    value={values.ativo || 'Inativo'} // Define o valor como string
                                                    onChange={(_, value) => setFieldValue('ativo', value)}
                                                    isOptionEqualToValue={(option, value) => option === value} // Customiza a igualdade
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Status do Curso"
                                                            variant="filled"
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                                            <Button variant="contained" onClick={handleEditModalClose} sx={{
                                                height: '50px',
                                                width: '100px',
                                                fontSize: '17px',
                                                fontFamily: 'Roboto, monospace',
                                                fontWeight: 'bold',
                                                color: 'white',
                                                backgroundColor: '#185D8E',
                                                '&:hover': {
                                                    backgroundColor: '#104A6F',
                                                },
                                            }}>
                                                Cancelar
                                            </Button>

                                            <Button type="submit" variant="contained" color="primary" sx={{
                                                height: '50px',
                                                width: '100px',
                                                fontSize: '17px',
                                                fontFamily: 'Roboto, monospace',
                                                fontWeight: 'bold',
                                                color: 'white',
                                                backgroundColor: '#185D8E',
                                                '&:hover': {
                                                    backgroundColor: '#104A6F',
                                                },
                                            }}>
                                                Salvar
                                            </Button>

                                        </Box>
                                    </Grid>
                                    {/* </Grid> */}
                                </Form>
                            )}
                        </Formik>
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
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%', borderRadius: '5px'
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                        color: '#185D8E',
                        fontFamily: 'Roboto, monospace',
                        marginTop: 1,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'justify',
                        mb: '5px'
                    }}>
                        Confirmar exclusão
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }}>
                        Você está prestes a excluir o curso {selectedCourse?.descricao}. Deseja continuar?
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        sx={{ mt: 2 }}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDeleteCourse}
                                sx={{
                                    height: '35px',
                                    fontSize: '17px',
                                    fontFamily: 'Roboto, monospace',
                                    color: 'white',
                                    backgroundColor: '#185D8E',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#104A6F',
                                        color: 'white',
                                    }
                                }}
                            >
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={handleDeleteModalClose} sx={{
                                height: '35px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                    color: 'white',
                                }
                            }}>
                                Não
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {/* Detail Modal */}
            <Modal
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600, borderRadius: '5px'
                }}>
                    {selectedCourse && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        color: '#185D8E',
                                        fontFamily: 'Roboto, monospace',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    {selectedCourse.descricao}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper sx={{ padding: '20px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Dados do Curso
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>ID: {selectedCourse.id}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Status: {selectedCourse.ativo ? 'Ativo' : 'Inativo'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Nome: {selectedCourse.descricao}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Empregabilidade: {selectedCourse.empregabilidade}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Área: {selectedCourse.area?.descricao || 'Não especificada'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Tipo: {selectedCourse.tipo}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default CourseManagement;
