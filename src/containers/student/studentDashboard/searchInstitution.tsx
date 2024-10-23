import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Modal,
    Grid,
    Box,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    IconButton,
    InputAdornment,
    Card,
    CardContent,
    CardActions,
    Pagination,
    CircularProgress
} from '@mui/material';
import { Add, Close, FilterList } from '@mui/icons-material';
import Footer from '../../../components/homeFooter';
import { Endereco, TipoInstituicaoCurso } from '../../../types/institutionTypes';
import {
    buscarEntidades,
    buscarEntidadePorId,
    buscarCursosPorInstituicao
} from '../../../services/apiService';
import {
    clearFilterButton,
    DetailTypography,
    GridContainer,
    SearchBox,
    searchButton,
    StyledBox,
    styledModal,
    styledInput,
    styledSelect,
    gridContainer,
    cardContent,
    cardTitle,
    cardText,
    searchBox,
} from './styles';
import { useTranslation } from 'react-i18next';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import StudentHeader from '../../../components/studentHeader';
import SearchIcon from '@mui/icons-material/Search';

interface Curso {
    id: number;
    descricao: string;
}
interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    formaIngresso: string;
    tipo: TipoInstituicaoCurso;
    sigla: string;
    notaMec: number;
    site: string;
    endereco: Endereco;
    cursos: Curso[];
}

const brasilStates = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' },
];

const entryMethods = [
    { description: 'SISU' },
    { description: 'SISU e ENEM' },
    { description: 'SISU e ENEM + Vestibular próprio' },
    { description: 'SISU e PAS' },
    { description: 'SISU e PAVE' },
    { description: 'SISU e Pism' },
    { description: 'SISU e Prosel' },
    { description: 'SISU e PSC' },
    { description: 'SISU E PSVO' },
    { description: 'SISU e Vagas Olímpicas' },
    { description: 'SISU e Vestibular próprio' },
    { description: 'SISU, ENEM e Vestibular próprio' },
    { description: 'SISU, PAS e Vestibular próprio' },
    { description: 'SISU, Vestibular próprio' },
    { description: 'SISU, Vestibular próprio e PSS' },
    { description: 'SISU, Vestibular próprio e PASSE' },
    { description: 'SISU, Vestibular próprio, PSEnem e PSAC' },
    { description: 'Vestibular próprio' },
    { description: 'Vestibular próprio e PSS' },
    { description: 'Vestibulinho' },
];

const InstitutionList: React.FC = () => {
    const { t } = useTranslation();
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [notaMecValue, setNotaMecValue] = useState<number | null>(null); // Filtro de nota MEC
    const [formaIngressoValue, setFormaIngressoValue] = useState<string>(''); // Filtro de forma de ingresso
    const [tipoInstituicaoValue, setTipoInstituicaoValue] = useState<TipoInstituicaoCurso | ''>(''); // Filtro de tipo
    const [estadoValue, setEstadoValue] = useState<string>(''); // Filtro de estado
    const [cursoValue, setCursoValue] = useState<string>(''); // Filtro de curso
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // Função para buscar todos os detalhes de uma instituição
    const fetchInstitutionDetails = async (institutionId: number) => {
        try {
            const institutionDetails = await buscarEntidadePorId('instituicao', institutionId);
            return institutionDetails;
        } catch (error) {
            console.error('Erro ao buscar detalhes da instituição:', error);
            return null;
        }
    };

    // Ao carregar a página, busca as instituições e seus detalhes
    useEffect(() => {
        const fetchInstitutions = async () => {
            setLoading(true);
            try {
                const institutionList = await buscarEntidades('instituicao');

                const institutionsWithDetails = await Promise.all(
                    institutionList.map(async (institution: { id: number; }) => {
                        const institutionDetails = await fetchInstitutionDetails(institution.id);
                        const institutionCourses = await buscarCursosPorInstituicao(institution.id);
                        return { ...institutionDetails, cursos: institutionCourses };
                    })
                );

                setInstitutions(institutionsWithDetails);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchInstitutions();
    }, []);

    // Função de filtro
    const filteredInstitutions = institutions.filter(institution => {
        const matchesSearchValue = institution.nome?.toLowerCase().includes(searchValue.toLowerCase());
        const matchesNotaMec = notaMecValue === null || institution.notaMec === notaMecValue;
        const matchesFormaIngresso = formaIngressoValue === '' || institution.formaIngresso?.toLowerCase().includes(formaIngressoValue.toLowerCase());
        const matchesTipo = tipoInstituicaoValue === '' || institution.tipo === tipoInstituicaoValue;
        const matchesEstado = estadoValue === '' || (institution.endereco?.estado && institution.endereco.estado.toUpperCase() === estadoValue.toUpperCase());
        const matchesCurso = cursoValue === '' || Array.isArray(institution.cursos) && institution.cursos.some(curso =>
            curso.descricao.toLowerCase().includes(cursoValue.toLowerCase())
        );

        return matchesSearchValue && matchesNotaMec && matchesFormaIngresso && matchesTipo && matchesEstado && matchesCurso;
    });

    // Funções para abrir/fechar o modal de filtros
    const handleFilterModalOpen = () => setFilterModalOpen(true);
    const handleFilterModalClose = () => setFilterModalOpen(false);

    // Estados temporários para os filtros no modal
    const [tempNotaMecValue, setTempNotaMecValue] = useState<number | null>(null);
    const [tempFormaIngressoValue, setTempFormaIngressoValue] = useState<string>('');
    const [tempTipoInstituicaoValue, setTempTipoInstituicaoValue] = useState<TipoInstituicaoCurso | ''>('');
    const [tempEstadoValue, setTempEstadoValue] = useState<string>('');
    const [tempCursoValue, setTempCursoValue] = useState<string>('');

    const handleApplyFilters = () => {
        setNotaMecValue(tempNotaMecValue);
        setFormaIngressoValue(tempFormaIngressoValue);
        setTipoInstituicaoValue(tempTipoInstituicaoValue);
        setEstadoValue(tempEstadoValue);
        setCursoValue(tempCursoValue);
        setCurrentPage(1);
        handleFilterModalClose();
    };

    // --------------------- Função para limpar os filtros ----------------------------
    const handleClearFilters = () => {
        setNotaMecValue(null);
        setFormaIngressoValue('');
        setTipoInstituicaoValue('');
        setEstadoValue('');
        setCursoValue('');

        setTempNotaMecValue(null);
        setTempFormaIngressoValue('');
        setTempTipoInstituicaoValue('');
        setTempEstadoValue('');
        setTempCursoValue('');
        handleFilterModalClose();
    };

    const handleDetailModalOpen = async (institution: Institution) => {
        try {
            const institutionDetails = await buscarEntidadePorId('instituicao', institution.id);
            const institutionCourses = await buscarCursosPorInstituicao(institution.id);
            setSelectedInstitution({ ...institutionDetails, cursos: institutionCourses });
            setDetailModalOpen(true);
        } catch (error) {
            console.error('Erro ao obter detalhes da instituição:', error);
        }
    };

    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedInstitution(null);
    };

    // ---------------------------- Paginação dos cards ----------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const institutionsPerPage = 6;

    // Calcular índices de paginação
    const indexOfLastInstitution = currentPage * institutionsPerPage;
    const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
    const currentInstitutions = filteredInstitutions.slice(indexOfFirstInstitution, indexOfLastInstitution);
    const totalPages = Math.ceil(filteredInstitutions.length / institutionsPerPage);

    // Funções de navegação
    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'white', minHeight: '100vh' }}>
                <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <StudentHeader />
                <StyledBox>
                    <SearchBox sx={searchBox}>
                        <TextField
                            label={t('listInstitutionSearch')}
                            variant='outlined'
                            onChange={(e) => setSearchValue(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <IconButton onClick={handleFilterModalOpen} sx={{ ml: 2 }}>
                            <FilterList />
                            Filtro
                        </IconButton>
                    </SearchBox>

                    {/* Modal de Filtros */}
                    <Modal
                        open={filterModalOpen}
                        onClose={handleFilterModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styledModal}>
                            <IconButton
                                aria-label="close"
                                onClick={handleFilterModalClose}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    color: '#0B2A40',
                                }}
                            >
                                <Close />
                            </IconButton>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sx={{marginTop: 4}}>
                                    <TextField
                                        label={t('Nota MEC')}
                                        type="number"
                                        fullWidth
                                        variant='outlined'
                                        sx={styledInput}
                                        value={tempNotaMecValue || ''}
                                        onChange={(e) => setTempNotaMecValue(e.target.value ? Math.min(Math.max(parseFloat(e.target.value), 1), 6) : null)}
                                        inputProps={{
                                            min: 1,
                                            max: 6,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={t('Curso')}
                                        fullWidth
                                        variant='outlined'
                                        sx={styledInput}
                                        value={tempCursoValue || ''}
                                        onChange={(e) => setTempCursoValue(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel sx={{color: '#185D8E', fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>{t('Forma de Ingresso')}</InputLabel>
                                        <Select
                                            value={tempFormaIngressoValue}
                                            onChange={(e) => setTempFormaIngressoValue(e.target.value)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            {entryMethods.map(i => (
                                                <MenuItem key={i.description} value={i.description}>{i.description}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel sx={{color: '#185D8E', fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>{t('Tipo de Instituição')}</InputLabel>
                                        <Select
                                            value={tempTipoInstituicaoValue}
                                            onChange={(e) => setTempTipoInstituicaoValue(e.target.value as TipoInstituicaoCurso)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.SUPERIOR}>Superior</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.TECNICO}>Técnico</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.AMBOS}>Ambos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='outlined' sx={styledSelect} fullWidth>
                                        <InputLabel sx={{color: '#185D8E', fontWeight: '600', fontFamily: 'Poppins, sans-serif'}}>{t('Estado')}</InputLabel>
                                        <Select
                                            value={tempEstadoValue}
                                            onChange={(e) => setTempEstadoValue(e.target.value)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            {brasilStates.map(estado => (
                                                <MenuItem key={estado.sigla} value={estado.sigla}>{estado.nome}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button sx={clearFilterButton} onClick={handleClearFilters}>Limpar Filtros</Button>
                                    <Button sx={searchButton} onClick={handleApplyFilters}>Pesquisar</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Modal>
                </StyledBox>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box sx={gridContainer}>
                        <Grid container spacing={4}>
                            {currentInstitutions.map((institution) => (
                                <Grid item xs={12} sm={6} md={6} key={institution.id}>
                                    <Card sx={cardContent}>
                                        <CardContent onClick={() => handleDetailModalOpen(institution)}>
                                            <Typography variant="h5" sx={cardTitle}>{institution.nome}</Typography>
                                            <Typography variant="body2" sx={cardText}><b>Sigla:</b> {institution.sigla}</Typography>
                                            <Typography variant="body2" sx={cardText}><b>Site:</b> {institution.site || 'Não disponível'}</Typography>
                                            <Typography variant="body2" sx={cardText}><b>Nota MEC | INDEB:</b> {institution.notaMec || 'Não disponível'}</Typography>
                                            <Typography variant="body2" sx={cardText}><b>Tipo:</b> {institution.tipo || 'Não disponível'}</Typography>
                                            <Typography variant="body2" sx={cardText}><b>Forma de Ingresso:</b> {institution.formaIngresso || 'Não disponível'}</Typography>
                                        </CardContent>
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <IconButton
                                                aria-label="Add"
                                                onClick={() => handleDetailModalOpen(institution)}
                                                sx={{ color: '#185D8E' }}
                                            >
                                                <Add />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 7 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Box>
                    </Box>
                )}

                {/* Details Modal */}
                <Modal
                    open={detailModalOpen}
                    onClose={handleDetailModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styledModal}>
                        <GridContainer>
                            {selectedInstitution && (
                                <>
                                    <DetailTypography>
                                        <Typography variant="h6" gutterBottom>
                                            {selectedInstitution.nome}
                                        </Typography>
                                    </DetailTypography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Dados Gerais
                                            </Typography>
                                            <Typography variant="body2">Nome: {selectedInstitution.nome}</Typography>
                                            <Typography variant="body2">Sigla: {selectedInstitution.sigla}</Typography>
                                            <Typography variant="body2">Site: {selectedInstitution.site || 'Não disponível'}</Typography>
                                            <Typography variant="body2">Nota MEC: {selectedInstitution.notaMec || 'Não disponível'}</Typography>
                                            <Typography variant="body2">Tipo: {selectedInstitution.tipo || 'Não disponível'}</Typography>
                                            <Typography variant="body2">Forma de Ingresso: {selectedInstitution.formaIngresso || 'Não disponível'}</Typography>
                                        </Grid>

                                        {/* Endereço */}
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Endereço
                                            </Typography>
                                            <Typography variant="body2">Rua: {selectedInstitution.endereco?.logradouro || 'Não disponível'}</Typography>
                                            <Typography variant="body2">Número: {selectedInstitution.endereco?.numero || 'Não disponível'}</Typography>
                                            <Typography variant="body2">Cidade: {selectedInstitution.endereco?.cidade || 'Não disponível'}</Typography>
                                            <Typography variant="body2">Estado: {selectedInstitution.endereco?.estado || 'Não disponível'}</Typography>
                                            <Typography variant="body2">CEP: {selectedInstitution.endereco?.cep || 'Não disponível'}</Typography>
                                        </Grid>

                                        {/* Cursos */}
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Cursos
                                            </Typography>
                                            <List dense style={{ maxHeight: 200, overflow: 'auto' }}>
                                                {selectedInstitution.cursos?.length > 0 ? (
                                                    selectedInstitution.cursos.map((curso) => (
                                                        <ListItem key={curso.id}>
                                                            <ListItemText primary={curso.descricao} />
                                                        </ListItem>
                                                    ))
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary">
                                                        Não há cursos na instituição.
                                                    </Typography>
                                                )}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </GridContainer>
                    </Box>
                </Modal>
            </Box>
            <Footer />
        </>
    );
};

export default InstitutionList;
