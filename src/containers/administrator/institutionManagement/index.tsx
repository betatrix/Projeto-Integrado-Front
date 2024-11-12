import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Checkbox,
    Typography,
    Table,
    TableHead,
    TableCell,
    TableBody,
    Button,
    Modal,
    IconButton,
    Grid,
    TableRow,
    InputAdornment,
    TextField,
    CircularProgress,
    Paper,
    Snackbar,
    Alert,
    FormControl,
    Autocomplete,
    List,
    ListItem,
    ListItemText,
    InputLabel,
    Input,
    FormHelperText,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../../../components/homeFooter';
import { Link } from 'react-router-dom';
import AdminHeader from '../../../components/adminHeader';
import { Endereco } from '../../../types/institutionTypes';
import SearchIcon from '@mui/icons-material/Search';
import {
    buscarInstituicaoPorId,
    buscarInstituicoesPorNome,
    editarInstituicao,
    excluirInstituicao,
    excluirInstituicoesEmMassa
} from '../../../services/institutionService';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { CourseForm } from '../../../types/courseTypes';
import { PolicesInstitutionForm } from '../../../types/policiesTypes';
import { buscarCursos } from '../../../services/courseService';
import { buscarPoliticas } from '../../../services/policiesService';
import { cadastrarCursoInstituicao } from '../../../services/courseInstitutionService';
import { cadastrarPoliticasInstituicao } from '../../../services/policiesInstitutionService';

import { buscarCursosPorInstituicao, buscarPoliticasPorInstituicao } from '../../../services/apiService';
import { excluirCursoInstituicao } from '../../../services/courseInstitutionService';
import { excluirPoliticasInstituicao } from '../../../services/policiesInstitutionService';
import Pagination from '@mui/material/Pagination';

const notaMecSchema = yup
    .number()
    .nullable()
    .typeError('A nota deve ser um número')
    .min(1, 'Nota mínima 1')
    .max(10, 'Nota máxima 10')
    .required('A nota é obrigatória');

interface FormValues {
    id: number;
    nome: string;
    ativo: boolean;
    formaIngresso: string;
    tipo: string;
    sigla: string;
    notaMec: number | null;
    site: string;
    endereco: Endereco;
}

export interface InstitutionCourseForm {
    id: number;
    notaMec: number;
    curso: {
        id: number;
        descricao: string;
        ativo: boolean;
        area: string;
        empregabilidade: string;
        possiveisCarreiras: string[];
        perfil: {
            id: number;
            descricao: string;
            imagem: string;
        };
    };
    instituicao: {
        id: number;
        nome: string;
        sigla: string;
        formaIngresso: string;
        tipo: string;
        site: string;
        ativo: boolean;
        notaMec: number | null;
        endereco: Endereco;
    };
}

export interface InstitutionPolicyForm {
    id: number;
    instituicao: {
        id: number;
        nome: string;
        sigla: string;
        site: string;
        ativo: boolean;
        notaMec: number | null;
    };
    politica: {
        id: number;
        tipo: 'POLITICA_ENTRADA' | string;
        descricao: string;
        ativo: boolean;
    };
}
const tiposInstituicao = [
    { label: 'Superior', value: 'SUPERIOR' },
    { label: 'Técnico', value: 'TECNICO' },
    { label: 'Ambos', value: 'AMBOS' },
];

const institutionValidationSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    sigla: yup.string().required('Sigla é obrigatória'),
    site: yup.string()
        .required('O site é obrigatório')
        .matches(/\./, 'O site deve conter pelo menos um ponto'),
    notaMec: yup.number().min(0).max(10).nullable(),
    formaIngresso: yup.string().required('Forma de Ingresso é obrigatória'),
    tipo: yup
        .string()
        .oneOf(['SUPERIOR', 'TECNICO', 'AMBOS'])
        .required('Tipo de Instituição é obrigatório'),
    endereco: yup.object().shape({
        logradouro: yup.string().required('Rua é obrigatória'),
        numero: yup.string().required('Número é obrigatório'),
        cep: yup.string().required('CEP é obrigatório'),
        cidade: yup.string().required('Cidade é obrigatória'),
        estado: yup.string().required('Estado é obrigatório'),
    }),
    ativo: yup.boolean().required('Status é obrigatório'),
});

// let loadedInstitutions: FormValues[] = [];
// async function loadInstitutions() {
//     loadedInstitutions = await buscarInstituicoesPorNome('');
// }
// loadInstitutions();

const InstitutionManagement: React.FC = () => {
    // Estados principais
    const [institutions, setInstitutions] = useState<FormValues[]>([]);
    const [loadedInstitutions, setLoadedInstitutions] = useState<FormValues[]>([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDetailInstitutionWithAddress, setSelectedDetailInstitutionWithAddress] = useState<FormValues | null>(null);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEditInstitution, setSelectedEditInstitution] = useState<FormValues | null>(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [institutionToDelete, setInstitutionToDelete] = useState<FormValues | null>(null);

    const [selectedInstitutions, setSelectedInstitutions] = useState<number[]>([]);
    const [deleteMultipleModalOpen, setDeleteMultipleModalOpen] = useState(false);
    const [institutionsToDeleteMultiple, setInstitutionsToDeleteMultiple] = useState<FormValues[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Você pode ajustar este valor conforme necessário

    // const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [policyCourseModalOpen, setPolicyCourseModalOpen] = useState(false);
    // Estados para o modal de políticas e cursos
    const [courses, setCourses] = useState<CourseForm[]>([]);
    const [policies, setPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<{ [key: number]: { notaMec: number | null } }>({});
    const [selectedPolicies, setSelectedPolicies] = useState<number[]>([]);
    const [validationErrors, setValidationErrors] = useState<{ [key: number]: string }>({});

    // Estados para o modal de exclusão de cursos e políticas
    const [deletePolicyCourseModalOpen, setDeletePolicyCourseModalOpen] = useState(false);
    const [institutionCourses, setInstitutionCourses] = useState<InstitutionCourseForm[]>([]);
    const [institutionPolicies, setInstitutionPolicies] = useState<InstitutionPolicyForm[]>([]);
    const [selectedCoursesToDelete, setSelectedCoursesToDelete] = useState<number[]>([]);
    const [selectedPoliciesToDelete, setSelectedPoliciesToDelete] = useState<number[]>([]);
    const [loadingDeleteData, setLoadingDeleteData] = useState(false);

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(false);
    };

    // Funções de manipulação de modais e ações
    const handleDetailModalOpen = async (institution: FormValues) => {
        try {
            const data = await buscarInstituicaoPorId(institution.id);
            setSelectedDetailInstitutionWithAddress(data);
            setDetailModalOpen(true);
        } catch (error) {
            console.error('Erro ao obter detalhes da instituição:', error);
        }
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedDetailInstitutionWithAddress(null);
    };

    const handleEditModalOpen = async (institution: FormValues) => {
        try {
            // Buscar dados da instituição pelo ID
            const data = await buscarInstituicaoPorId(institution.id);
            setSelectedEditInstitution(data); // Definir os dados carregados
            setEditModalOpen(true); // Abrir o modal de edição
        } catch (error) {
            console.error('Erro ao carregar dados da instituição:', error);
        }
    };

    // Função para fechar o modal de edição
    const handleEditModalClose = () => {
        setSelectedEditInstitution(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (institution: FormValues) => {
        setInstitutionToDelete(institution);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setInstitutionToDelete(null);
        setDeleteModalOpen(false);
    };

    const handleCheckboxChange = (id: number) => {
        if (selectedInstitutions.includes(id)) {
            setSelectedInstitutions(selectedInstitutions.filter(instId => instId !== id));
        } else {
            setSelectedInstitutions([...selectedInstitutions, id]);
        }
    };

    const isDeleteButtonDisabled = selectedInstitutions.length <= 1;

    const handleDeleteMultipleModalOpen = () => {
        const selectedInstitutionsToDelete = institutions.filter(inst => selectedInstitutions.includes(inst.id));
        setInstitutionsToDeleteMultiple(selectedInstitutionsToDelete);
        setDeleteMultipleModalOpen(true);
    };

    const handleDeleteMultipleModalClose = () => {
        setInstitutionsToDeleteMultiple([]);
        setDeleteMultipleModalOpen(false);
    };

    // Funções para abrir e fechar o modal de políticas e cursos
    const handlePolicyCourseModalOpen = () => {
        setPolicyCourseModalOpen(true);
    };

    const handlePolicyCourseModalClose = () => {
        setPolicyCourseModalOpen(false);
        setSelectedCourses({});
        setSelectedPolicies([]);
        setValidationErrors({});
    };

    const searchInstitution = useCallback((searchText: string) => {
        try {
            const filteredInstitutions = loadedInstitutions.filter((i) =>
                i.nome.toLowerCase().includes(searchText.toLowerCase())
            );
            setInstitutions(filteredInstitutions);
            setCurrentPage(1); // Reinicia para a primeira página após a busca
        } catch (error) {
            console.error('Erro ao buscar instituições:', error);
        }
    }, [loadedInstitutions]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInstitutions = institutions.slice(indexOfFirstItem, indexOfLastItem);

    // Busca de instituições
    useEffect(() => {
        searchInstitution('');
    }, [searchInstitution]);

    // Busca de cursos e políticas quando o modal é aberto
    useEffect(() => {
        if (policyCourseModalOpen && selectedEditInstitution) {
            const fetchData = async () => {
                try {
                    // Buscar todos os cursos e políticas
                    const fetchedCourses = await buscarCursos();
                    const fetchedPolicies = await buscarPoliticas();

                    // Buscar cursos e políticas já associados à instituição
                    const institutionCourses = await buscarCursosPorInstituicao(selectedEditInstitution.id);
                    const institutionPolicies = await buscarPoliticasPorInstituicao(selectedEditInstitution.id);

                    // Filtrar cursos e políticas que ainda não estão associados à instituição
                    const availableCourses = fetchedCourses.filter(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (course: { id: any; }) => !institutionCourses.some((instCourse: { curso: { id: any; }; }) => instCourse.curso.id === course.id)
                    );

                    const availablePolicies = fetchedPolicies.filter(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (policy: { id: any; }) => !institutionPolicies.some((instPolicy: { politica: { id: any; }; }) => instPolicy.politica.id === policy.id)
                    );

                    // Atualizar os estados com os cursos e políticas disponíveis
                    setCourses(availableCourses);
                    setPolicies(availablePolicies);
                } catch (error) {
                    console.error('Erro ao buscar cursos e políticas:', error);
                }
            };
            fetchData();
        }
    }, [policyCourseModalOpen, selectedEditInstitution]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        async function fetchInstitutions() {
            setLoading(true);
            try {
                const data = await buscarInstituicoesPorNome('');
                setLoadedInstitutions(data);
                setInstitutions(data);
                setCurrentPage(1); // Reinicia para a primeira página
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchInstitutions();
    }, []);

    // Funções de seleção de cursos e políticas
    const handleCourseSelection = (courseId: number) => {
        setSelectedCourses((prevSelectedCourses) => {
            if (prevSelectedCourses[courseId]) {
                const updatedCourses = { ...prevSelectedCourses };
                delete updatedCourses[courseId];
                return updatedCourses;
            } else {
                return { ...prevSelectedCourses, [courseId]: { notaMec: null } };
            }
        });
    };

    const handleNotaMecChange = async (courseId: number, notaMec: number) => {
        try {
            await notaMecSchema.validate(notaMec);
            setValidationErrors((prev) => ({ ...prev, [courseId]: '' }));
            setSelectedCourses((prev) => ({
                ...prev,
                [courseId]: { notaMec },
            }));
        } catch (error) {
            if (error instanceof Error) {
                setValidationErrors((prev) => ({ ...prev, [courseId]: error.message }));
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handlePolicySelection = (policyId: number) => {
        setSelectedPolicies((prevSelectedPolicies) => {
            if (prevSelectedPolicies.includes(policyId)) {
                return prevSelectedPolicies.filter((id) => id !== policyId);
            } else {
                return [...prevSelectedPolicies, policyId];
            }
        });
    };

    // Função para adicionar cursos e políticas à instituição
    const handleAddCoursesAndPolicies = async () => {
        if (!selectedEditInstitution) {
            alert('Instituição não identificada.');
            return;
        }
        try {
            const institutionId = selectedEditInstitution.id;

            // Preparar cursos para adicionar
            const coursesToAdd = Object.entries(selectedCourses).map(([courseId, data]) => ({
                courseId: Number(courseId),
                notaMec: data.notaMec,
            }));

            // Validar notaMec para cada curso
            for (const { notaMec } of coursesToAdd) {
                await notaMecSchema.validate(notaMec);
            }

            // Adicionar cursos à instituição
            await Promise.all(
                coursesToAdd.map(({ courseId, notaMec }) =>
                    cadastrarCursoInstituicao(institutionId, notaMec, courseId)
                )
            );

            // Adicionar políticas à instituição
            await Promise.all(
                selectedPolicies.map((policyId) =>
                    cadastrarPoliticasInstituicao(institutionId, policyId)
                )
            );

            // Fechar modal
            handlePolicyCourseModalClose();

        } catch (error) {
            console.error('Erro ao adicionar cursos e políticas à instituição:', error);
            alert('Erro ao adicionar cursos e políticas.');
        }
    };

    // Função para abrir o modal de exclusão de cursos e políticas
    const handleDeletePolicyCourseModalOpen = async () => {
        if (selectedEditInstitution) {
            setLoadingDeleteData(true);
            try {
                const courses = await buscarCursosPorInstituicao(selectedEditInstitution.id);
                const policies = await buscarPoliticasPorInstituicao(selectedEditInstitution.id);
                setInstitutionCourses(courses);
                setInstitutionPolicies(policies);
            } catch (error) {
                console.error('Erro ao buscar cursos ou políticas:', error);
            }
            setLoadingDeleteData(false);
            setDeletePolicyCourseModalOpen(true);
        }
    };

    // Função para fechar o modal de exclusão de cursos e políticas
    const handleDeletePolicyCourseModalClose = () => {
        setDeletePolicyCourseModalOpen(false);
        setSelectedCoursesToDelete([]);
        setSelectedPoliciesToDelete([]);
    };

    // Função para seleção de cursos a serem excluídos
    const handleCourseSelectionToDelete = (courseId: number) => {
        setSelectedCoursesToDelete((prevSelected) => {
            if (prevSelected.includes(courseId)) {
                return prevSelected.filter((id) => id !== courseId);
            } else {
                return [...prevSelected, courseId];
            }
        });
    };

    // Função para seleção de políticas a serem excluídas
    const handlePolicySelectionToDelete = (policyId: number) => {
        setSelectedPoliciesToDelete((prevSelected) => {
            if (prevSelected.includes(policyId)) {
                return prevSelected.filter((id) => id !== policyId);
            } else {
                return [...prevSelected, policyId];
            }
        });
    };

    // Função para excluir cursos e políticas selecionados
    const handleDeleteSelectedCoursesAndPolicies = async () => {
        if (!selectedEditInstitution) return;

        try {

            // Excluir cursos selecionados
            await Promise.all(
                selectedCoursesToDelete.map(async (cursoInstituicaoId) => {
                    try {
                        await excluirCursoInstituicao(cursoInstituicaoId);
                    } catch (error) {
                        console.error(`Erro ao excluir curso ID ${cursoInstituicaoId}:`, error);
                        throw error; // Repassa o erro para tratamento
                    }
                })
            );

            // Excluir políticas selecionadas
            await Promise.all(
                selectedPoliciesToDelete.map(async (politicaInstituicaoId) => {
                    try {
                        await excluirPoliticasInstituicao(politicaInstituicaoId);
                    } catch (error) {
                        console.error(`Erro ao excluir política ID ${politicaInstituicaoId}:`, error);
                        throw error; // Repassa o erro para tratamento
                    }
                })
            );

            handleDeletePolicyCourseModalClose();
        } catch (error) {
            console.error('Erro ao excluir cursos e políticas:', error);
            alert('Erro ao excluir cursos e políticas.');
        }
    };

    return (
        <>
            <AdminHeader />

            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar Instituição"
                        variant="outlined"
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace', }}
                        onChange={(e) => searchInstitution(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link to="/cadastro">
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

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#185D8E',
                                                fontWeight: 'bold',
                                                fontFamily: 'Roboto, monospace',
                                            }}
                                            disabled={isDeleteButtonDisabled}
                                            onClick={handleDeleteMultipleModalOpen}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center', fontWeight: 'bold', color: '#757575' }}>ID</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>NOME</TableCell>
                                    <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575' }}>STATUS</TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {currentInstitutions.map((institution) => (

                                    <TableRow key={institution.id}>

                                        <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                            <Checkbox
                                                onClick={(e) => e.stopPropagation()}
                                                checked={selectedInstitutions.includes(institution.id)}
                                                onChange={() => handleCheckboxChange(institution.id)}
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                            />
                                            <IconButton>
                                                <EditIcon onClick={(e) => { e.stopPropagation(); handleEditModalOpen(institution); }} sx={{ fontSize: 18 }} />
                                            </IconButton>

                                            <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteModalOpen(institution); }} >
                                                <DeleteIcon sx={{ fontSize: 18 }} />
                                            </IconButton>

                                        </TableCell>

                                        <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{institution.id}</TableCell>
                                        <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography sx={{
                                                    fontSize: '15px', color: '#757575',
                                                }}>{institution.nome}</Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => { e.stopPropagation(); handleDetailModalOpen(institution); }}
                                                    sx={{
                                                        color: '#185D8E',
                                                    }}
                                                >
                                                    <VisibilityOutlinedIcon sx={{
                                                        fontSize: '18px'
                                                    }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{institution.ativo ? 'Ativo' : 'Inativo'}</TableCell>

                                    </TableRow>
                                ))}

                            </TableBody>

                        </Table>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={Math.ceil(institutions.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>

                </Box>

            </Box>
            <Footer />

            {/* Modal de detalhes */}
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
                    {selectedDetailInstitutionWithAddress && (

                        <Grid container spacing={3}>
                            <Grid item xs={12}>

                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        color: '#185D8E',
                                        fontFamily: 'Roboto, monospace',
                                        marginTop: 2,
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    {selectedDetailInstitutionWithAddress.nome}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ padding: '20px', height: '320px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Dados Gerais
                                    </Typography>

                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>ID: {selectedDetailInstitutionWithAddress.id}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        Ativo: {selectedDetailInstitutionWithAddress.ativo ? 'Sim' : 'Não'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Sigla: {selectedDetailInstitutionWithAddress.sigla}</Typography>
                                    <Typography sx={{
                                        fontFamily: 'Poppins, sans-serif',
                                        wordBreak: 'break-all', // quebra longas palavras automaticamente
                                        overflow: 'hidden', // esconde o texto que ultrapassar a largura do container
                                        textOverflow: 'ellipsis', // adiciona reticências ao final do texto
                                    }}>Site: {selectedDetailInstitutionWithAddress.site || 'Não disponível'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        Nota MEC|IDEB: {selectedDetailInstitutionWithAddress.notaMec || 'Não disponível'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        Forma de Ingresso: {selectedDetailInstitutionWithAddress.formaIngresso || 'Não disponível'}
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>
                                        Tipo de Ensino: {selectedDetailInstitutionWithAddress.tipo || 'Não disponível'}
                                    </Typography>

                                </Paper>

                            </Grid>

                            <Grid item xs={6}>
                                <Paper sx={{ padding: '20px', height: '320px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Endereço
                                    </Typography>

                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Rua: {selectedDetailInstitutionWithAddress.endereco.logradouro}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Número: {selectedDetailInstitutionWithAddress.endereco.numero}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Cidade: {selectedDetailInstitutionWithAddress.endereco.cidade}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Estado: {selectedDetailInstitutionWithAddress.endereco.estado}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>CEP: {selectedDetailInstitutionWithAddress.endereco.cep}</Typography>
                                </Paper>

                            </Grid>
                        </Grid>
                    )}

                </Box>

            </Modal>

            {/* Modal de edição */}
            <Modal
                open={editModalOpen}
                onClose={handleEditModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
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
                }}>
                    {selectedEditInstitution && (
                        <Formik
                            initialValues={{
                                ...selectedEditInstitution,
                                ativo: selectedEditInstitution.ativo ? 1 : 0,
                            }}
                            enableReinitialize
                            validationSchema={institutionValidationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await editarInstituicao(values);
                                    console.log(`Instituição ${values.nome} atualizada com sucesso!`);
                                    setShowSuccessMessage(true);
                                    // Converta 'ativo' para boolean antes de atualizar o estado
                                    const updatedInstitution = { ...values, ativo: values.ativo === 1 };

                                    setInstitutions(prevInstitutions =>
                                        prevInstitutions.map(inst => (inst.id === values.id ? updatedInstitution : inst))
                                    );
                                    setLoadedInstitutions(prevLoadedInstitutions =>
                                        prevLoadedInstitutions.map(inst => (inst.id === values.id ? updatedInstitution : inst))
                                    );
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar instituição:', error);
                                    setShowErrorMessage(true);
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, setFieldValue, values, errors, touched }) => {
                                return (
                                    <Form>

                                        <Grid container spacing={2} sx={{ marginBottom: '10px' }}>

                                        </Grid>
                                        <Grid item xs={12} sx={{ textAlign: 'justify' }}>
                                            <Typography variant="h5" gutterBottom sx={{
                                                fontSize: '20px',
                                                marginBottom: '10px', marginTop: '20px', color: '#185D8E',
                                                fontFamily: 'Roboto, monospace', fontWeight: 'bold', textAlign: 'justify'
                                            }}>
                                                Edite os campos  da Instituição selecionada:
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom sx={{
                                                marginBottom: '5px', fontSize: '18px',
                                                fontWeight: 'bold', fontFamily: 'Roboto, monospace',
                                            }}>
                                                Políticas e Cursos
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: 1,
                                                    marginBottom: 1,
                                                }}
                                            >
                                                {/* Link para adicionar políticas e cursos */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <IconButton
                                                        onClick={handlePolicyCourseModalOpen}
                                                    >
                                                        <AddCircleOutlineIcon />
                                                    </IconButton>
                                                    <Typography
                                                        onClick={handlePolicyCourseModalOpen}
                                                        sx={{
                                                            // color: '#185D8E',
                                                            fontSize: '17px',
                                                            fontWeight: 'bold',
                                                            color: '#757575',
                                                            cursor: 'pointer', // Define o cursor como ponteiro para indicar que é clicável
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                color: '#104A6F',
                                                            },
                                                        }}
                                                    >
                                                        Adicionar Políticas e Cursos
                                                    </Typography>
                                                </Box>

                                                {/* Link para excluir políticas e cursos */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <IconButton
                                                        onClick={handleDeletePolicyCourseModalOpen}
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                    <Typography
                                                        onClick={handleDeletePolicyCourseModalOpen}
                                                        sx={{
                                                            // color: '#185D8E',
                                                            fontSize: '17px',
                                                            color: '#757575',
                                                            fontWeight: 'bold',
                                                            // fontFamily: 'Roboto, monospace',
                                                            cursor: 'pointer', // Define o cursor como ponteiro para indicar que é clicável
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                color: '#104A6F',
                                                            },
                                                        }}
                                                    >
                                                        Excluir Políticas e Cursos
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom sx={{
                                                marginBottom: '15px', fontSize: '18px',
                                                fontWeight: 'bold', fontFamily: 'Roboto, monospace',
                                            }}>
                                                Dados Gerais
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="nome"
                                                    label="Nome"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="sigla"
                                                    label="Sigla"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="site"
                                                    label="Site"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="notaMec"
                                                    label="Nota MEC|IDEB"
                                                    type="number"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            {/* <Grid item xs={6}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        name="ativo"
                                                        value={values.ativo}
                                                        onChange={(e) => setFieldValue('ativo', Number(e.target.value))}
                                                        label="Status"
                                                    >
                                                        <MenuItem value={1}>Ativo</MenuItem>
                                                        <MenuItem value={0}>Inativo</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid> */}

                                            <Grid item xs={6}>
                                                <FormControl fullWidth variant="filled">
                                                    <Autocomplete
                                                        options={[
                                                            { label: 'Ativo', value: 1 },
                                                            { label: 'Inativo', value: 0 },
                                                        ]}
                                                        getOptionLabel={(option) => option.label}
                                                        value={
                                                            values.ativo !== undefined
                                                                ? { label: values.ativo === 1 ? 'Ativo' : 'Inativo', value: values.ativo }
                                                                : null
                                                        }
                                                        onChange={(_event, newValue) => setFieldValue('ativo', newValue ? newValue.value : '')}
                                                        renderInput={(params) => <TextField {...params} label="Status" fullWidth variant="filled" />}
                                                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <FormControl variant="filled" fullWidth>
                                                    <Autocomplete
                                                        disablePortal
                                                        options={tiposInstituicao}
                                                        getOptionLabel={(option) => option.label}
                                                        value={tiposInstituicao.find((option) => option.value === values.tipo) || null}
                                                        onChange={(_, value) => setFieldValue('tipo', value ? value.value : '')}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Tipo de Instituição"
                                                                variant="filled"
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Field
                                                    as={TextField}
                                                    name="formaIngresso"
                                                    label="Forma de Ingresso"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            {/* Campos de endereço */}
                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="endereco.logradouro"
                                                    label="Rua"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={2}>
                                                <Field
                                                    as={TextField}
                                                    name="endereco.numero"
                                                    label="Número"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={4}>
                                                <Field
                                                    as={TextField}
                                                    name="endereco.cep"
                                                    label="CEP"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="endereco.cidade"
                                                    label="Cidade"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Field
                                                    as={TextField}
                                                    name="endereco.estado"
                                                    label="Estado"
                                                    fullWidth
                                                    error={touched.nome && Boolean(errors.nome)}
                                                    helperText={touched.nome && errors.nome}
                                                    InputProps={{
                                                        sx: {
                                                            fontFamily: 'Poppins, sans-serif', // Altere para a fonte que desejar
                                                            fontSize: '16px',
                                                        },
                                                    }}
                                                />
                                            </Grid>

                                            {/* Botões de ação */}
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                                                    <Button
                                                        type="button"
                                                        variant="outlined"
                                                        color="primary"
                                                        onClick={handleEditModalClose}
                                                        sx={{
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
                                                        }}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        sx={{
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
                                                        }}
                                                    >
                                                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Salvar'}
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                );
                            }}
                        </Formik>
                    )}

                    {/* Mensagens de feedback */}
                    <Snackbar
                        open={showSuccessMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccessMessage}
                    >
                        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
                            Instituição atualizada com sucesso!
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        open={showErrorMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseErrorMessage}
                    >
                        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
                            Erro ao atualizar a instituição.
                        </Alert>
                    </Snackbar>
                </Box>
            </Modal>

            {/* Modal de Políticas e Cursos */}
            <Modal
                open={policyCourseModalOpen}
                onClose={handlePolicyCourseModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 800, borderRadius: '5px', maxHeight: '80vh', overflowY: 'auto'
                }}>
                    <Typography variant="h6" gutterBottom sx={{
                        marginBottom: '30px', marginTop: '10px', color: '#185D8E',
                        fontFamily: 'Roboto, monospace', fontWeight: 'bold',
                    }}>
                        Selecione cursos e políticas para adicionar na Instiutição:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {/* Seção de Cursos */}
                        <Box>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                Cursos
                            </Typography>
                            {courses.length === 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 150, // Altura para centralizar
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (

                                <List
                                    sx={{
                                        maxHeight: 200,
                                        overflowY: 'auto',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        padding: 1,
                                    }}
                                >
                                    {courses.map((course) => (
                                        <ListItem key={course.id} divider>
                                            <Checkbox
                                                checked={!!selectedCourses[course.id]}
                                                onChange={() => handleCourseSelection(course.id)}
                                            />
                                            <ListItemText primary={course.descricao} />
                                            {selectedCourses[course.id] && (
                                                <FormControl
                                                    style={{ marginLeft: '10px', minWidth: '120px' }}
                                                    error={!!validationErrors[course.id]}
                                                >
                                                    <InputLabel htmlFor={`notaMec-${course.id}`}>
                                                        Nota MEC|IDEB
                                                    </InputLabel>
                                                    <Input
                                                        id={`notaMec-${course.id}`}
                                                        value={selectedCourses[course.id]?.notaMec || ''}
                                                        onChange={(e) =>
                                                            handleNotaMecChange(
                                                                course.id,
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        type="number"
                                                        inputProps={{ min: 1, max: 10 }}
                                                    />
                                                    <FormHelperText>
                                                        {validationErrors[course.id] || 'Nota de 1 a 10'}
                                                    </FormHelperText>
                                                </FormControl>
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>

                        {/* Seção de Políticas */}
                        <Box>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                Políticas
                            </Typography>
                            {policies.length === 0 ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 150, // Altura para centralizar
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <List
                                    sx={{
                                        maxHeight: 200,
                                        overflowY: 'auto',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        padding: 1,
                                    }}
                                >
                                    {policies.map((policy) => (
                                        <ListItem key={policy.id} divider>
                                            <Checkbox
                                                checked={selectedPolicies.includes(policy.id)}
                                                onChange={() => handlePolicySelection(policy.id)}
                                            />
                                            <ListItemText primary={policy.descricao} />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5, gap: 5 }}>
                        <Button
                            variant="outlined"
                            onClick={handlePolicyCourseModalClose}
                            sx={{
                                height: '50px',
                                width: '110px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                fontWeight: 'bold',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleAddCoursesAndPolicies}
                            sx={{
                                height: '50px',
                                width: '110px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                },
                            }}
                        >
                            Adicionar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Modal de exclusão de cursos e políticas */}
            <Modal
                open={deletePolicyCourseModalOpen}
                onClose={handleDeletePolicyCourseModalClose}
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
                        maxWidth: 800,
                        borderRadius: '5px',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{
                        marginBottom: '30px', marginTop: '10px', color: '#185D8E',
                        fontFamily: 'Roboto, monospace', fontWeight: 'bold',
                    }}>
                        Selecione cursos e políticas da Instituição que deseja excluir:
                    </Typography>

                    {loadingDeleteData ? (
                        <CircularProgress />
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {/* Seção de Cursos */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Cursos da Instituição
                                </Typography>
                                {institutionCourses.length === 0 ? (
                                    <Typography variant="body2" color="textSecondary">
                                        Não há cursos disponíveis nessa instituição.
                                    </Typography>
                                ) : (
                                    <List
                                        sx={{
                                            maxHeight: 200,
                                            overflowY: 'auto',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            padding: 1,
                                        }}
                                    >
                                        {institutionCourses.map((course) => (
                                            <ListItem key={course.id} divider>
                                                <Checkbox
                                                    checked={selectedCoursesToDelete.includes(course.id)}
                                                    onChange={() => handleCourseSelectionToDelete(course.id)}
                                                />
                                                <ListItemText primary={course.curso.descricao} />
                                            </ListItem>
                                        ))}

                                    </List>
                                )}
                            </Box>

                            {/* Seção de Políticas */}
                            <Box>
                                <Typography variant="subtitle1" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                    Políticas da Instituição
                                </Typography>
                                {institutionPolicies.length === 0 ? (
                                    <Typography variant="body2" color="textSecondary">
                                        Não há políticas disponíveis nessa instituição.
                                    </Typography>
                                ) : (
                                    <List
                                        sx={{
                                            maxHeight: 200,
                                            overflowY: 'auto',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            padding: 1,
                                        }}
                                    >
                                        {institutionPolicies.map((policy) => (
                                            <ListItem key={policy.id} divider>
                                                <Checkbox
                                                    checked={selectedPoliciesToDelete.includes(policy.id)}
                                                    onChange={() => handlePolicySelectionToDelete(policy.id)}
                                                />
                                                <ListItemText primary={policy.politica.descricao} />
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5, gap: 5 }}>
                        <Button
                            variant="outlined"
                            onClick={handleDeletePolicyCourseModalClose}
                            sx={{
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
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleDeleteSelectedCoursesAndPolicies}
                            sx={{
                                height: '50px',
                                width: '100px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                },
                            }}
                        >
                            Excluir
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Modal de exclusão */}
            <Modal
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%', borderRadius: '5px'
                }}>

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
                        Confirmar Exclusão
                    </Typography>

                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }}>
                        Você está prestes a excluir a instituição {institutionToDelete?.nome}. Deseja continuar?
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} sx={{ mt: '10px' }}>
                        <Grid item display="flex" justifyContent="center">
                            <Button onClick={async () => {
                                if (institutionToDelete) {
                                    try {
                                        await excluirInstituicao(institutionToDelete.id);
                                        console.log(`Instituição ${institutionToDelete.nome} excluída com sucesso`);
                                        setInstitutions(institutions.filter(institution => institution.id !== institutionToDelete.id));
                                    } catch (error) {
                                        console.error('Erro ao excluir instituição:', error);
                                    } finally {
                                        handleDeleteModalClose();
                                    }
                                }
                            }} sx={{
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
                            }}>Sim</Button>
                        </Grid>
                        <Grid item display="flex" justifyContent="center">

                            <Button onClick={handleDeleteModalClose} sx={{
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
                            }}>Não</Button>
                        </Grid>
                    </Grid>

                </Box>

            </Modal>

            {/* Modal de exclusão múltipla */}
            <Modal
                open={deleteMultipleModalOpen}
                onClose={handleDeleteMultipleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%', borderRadius: '5px'
                }}>
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
                        Confirmar Exclusão
                    </Typography>

                    <Typography id="modal-modal-description" sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }} >
                        Você está prestes a excluir as seguintes instituições selecionadas. Deseja continuar?
                    </Typography>
                    <Box sx={{ ml: '5px', backgroundColor: '#ddd', padding: '20px', borderRadius: '5px' }}>

                        {institutionsToDeleteMultiple.map(inst => (
                            <ul key={inst.id}>
                                <li><Typography sx={{
                                    fontFamily: 'Roboto, monospace', fontWeight: 'bold', textAlign: 'justify',
                                    justifyContent: 'center', fontSize: '4x'
                                }}>
                                    {inst.nome}</Typography></li>
                            </ul>

                        ))}
                    </Box>

                    <Grid item container justifyContent="center" spacing={2} sx={{ mt: '10px' }}>
                        <Grid item display="flex" justifyContent="center">

                            <Button onClick={async () => {
                                try {
                                    await excluirInstituicoesEmMassa(selectedInstitutions);
                                    setInstitutions(institutions.filter(inst => !selectedInstitutions.includes(inst.id)));
                                } catch (error) {
                                    console.error('Erro ao excluir instituições:', error);
                                } finally {
                                    handleDeleteMultipleModalClose();
                                }
                            }} sx={{
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
                            }}>Sim</Button>
                        </Grid>

                        <Grid item display="flex" justifyContent="center" >

                            <Button onClick={handleDeleteMultipleModalClose} sx={{
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
                            }}>Não</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            {/* Mensagens de feedback */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={handleCloseSuccessMessage}
            >
                <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
                    Instituição atualizada com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={handleCloseErrorMessage}
            >
                <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
                    Erro ao atualizar a instituição.
                </Alert>
            </Snackbar>
        </>

    );
};

export default InstitutionManagement;
