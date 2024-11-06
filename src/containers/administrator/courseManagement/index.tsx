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
    };

    const handleEditModalOpen = (course: CourseForm) => {
        setSelectedCourse(course); // Usa o curso completo com `area` como um objeto completo
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

                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
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
                        borderRadius: '5px'
                    }}
                >
                    {selectedCourse && (
                        <Formik
                            initialValues={selectedCourse}
                            enableReinitialize
                            // validationSchema={courseValidationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const finalValues = {
                                        ...values,
                                        areaId: values.area?.id
                                    };
                                    await editarCurso(finalValues);
                                    setCourses(courses.map((course) =>
                                        course.id === values.id ? values : course
                                    ));
                                    setFilteredCourses(filteredCourses.map((course) =>
                                        course.id === values.id ? values : course
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
                                    <Grid container spacing={2} direction="column" alignItems="center">

                                    </Grid>
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
