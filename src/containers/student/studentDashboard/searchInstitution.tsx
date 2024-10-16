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
    InputAdornment
} from '@mui/material';
import { FilterList } from '@mui/icons-material'; // Ícone de filtro
import Footer from '../../../components/homeFooter';
import { Endereco, TipoInstituicaoCurso } from '../../../types/institutionTypes';
import { buscarEntidades, buscarEntidadePorId, buscarCursosPorInstituicao } from '../../../services/apiService';
import { DetailTypography, GridContainer, ListBox, SearchBox, StyledBox, StyledModal } from './styles';
import { useTranslation } from 'react-i18next';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import StudentHeader from '../../../components/studentHeader';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

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

const InstitutionList: React.FC = () => {
    const { t } = useTranslation();
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [notaMecValue, setNotaMecValue] = useState<number | null>(null); // Filtro de nota MEC
    const [formaIngressoValue, setFormaIngressoValue] = useState<string>(''); // Filtro de forma de ingresso
    const [tipoInstituicaoValue, setTipoInstituicaoValue] = useState<TipoInstituicaoCurso | ''>(''); // Filtro de tipo
    const [estadoValue, setEstadoValue] = useState<string>(''); // Filtro de estado
    const [filterModalOpen, setFilterModalOpen] = useState(false); // Controla o modal de filtros
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
    const [open, setOpen] = React.useState(false);

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
            try {
                const institutionList = await buscarEntidades('instituicao');

                // Busca os detalhes de cada instituição usando buscarEntidadePorId
                const institutionsWithDetails = await Promise.all(
                    institutionList.map(async (institution: { id: number; }) => {
                        const institutionDetails = await fetchInstitutionDetails(institution.id);
                        return { ...institution, ...institutionDetails };
                    })
                );

                setInstitutions(institutionsWithDetails);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
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

        // Verifica se o estado existe antes de aplicar o filtro
        const matchesEstado = estadoValue === '' || (institution.endereco?.estado && institution.endereco.estado.toUpperCase() === estadoValue.toUpperCase());

        return matchesSearchValue && matchesNotaMec && matchesFormaIngresso && matchesTipo && matchesEstado;
    });

    // Funções para abrir/fechar o modal de filtros
    const handleFilterModalOpen = () => setFilterModalOpen(true);
    const handleFilterModalClose = () => setFilterModalOpen(false);

    // Função para limpar filtros
    const handleClearFilters = () => {
        setNotaMecValue(null);
        setFormaIngressoValue('');
        setTipoInstituicaoValue('');
        setEstadoValue('');
        setSearchValue('');
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

    const DrawerHeader = styled('div')(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: '5px',
    }));

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'white', minHeight: '100vh' }}>
                <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <StudentHeader />
                <DrawerHeader />
                <StyledBox>
                    {/* <StyledTypography>
                        <Typography variant="h6">
                            {t('listInstitutionTitle')}
                        </Typography>
                    </StyledTypography> */}
                    <SearchBox sx={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                        <TextField
                            label={t('listInstitutionSearch')}
                            variant='outlined'
                            sx={{ flexGrow: 1 }}
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
                        </IconButton>
                    </SearchBox>

                    {/* Modal de Filtros */}
                    <Modal
                        open={filterModalOpen}
                        onClose={handleFilterModalClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <StyledModal sx={{ width: 500, p: 4, margin: '100px auto', backgroundColor: 'white' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={t('Nota MEC')}
                                        type="number"
                                        fullWidth
                                        variant='standard'
                                        value={notaMecValue || ''}
                                        onChange={(e) => setNotaMecValue(e.target.value ? Math.min(Math.max(parseFloat(e.target.value), 1), 6) : null)}
                                        inputProps={{
                                            min: 1,
                                            max: 6,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={t('Forma de Ingresso')}
                                        fullWidth
                                        variant='standard'
                                        value={formaIngressoValue}
                                        onChange={(e) => setFormaIngressoValue(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl variant='standard' fullWidth>
                                        <InputLabel>{t('Tipo de Instituição')}</InputLabel>
                                        <Select
                                            value={tipoInstituicaoValue}
                                            onChange={(e) => setTipoInstituicaoValue(e.target.value as TipoInstituicaoCurso)}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.SUPERIOR}>Superior</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.TECNICO}>Técnico</MenuItem>
                                            <MenuItem value={TipoInstituicaoCurso.AMBOS}>Ambos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={t('Estado')}
                                        fullWidth
                                        variant='standard'
                                        value={estadoValue}
                                        onChange={(e) => setEstadoValue(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant="outlined" onClick={handleClearFilters}>Limpar Filtros</Button>
                                    <Button variant="contained" onClick={handleFilterModalClose}>Pesquisar</Button>
                                </Grid>
                            </Grid>
                        </StyledModal>
                    </Modal>

                    <ListBox>
                        <List>
                            {filteredInstitutions.map((institution) => (
                                <ListItem key={institution.id} button onClick={() => handleDetailModalOpen(institution)}>
                                    <ListItemText primary={institution.nome} />
                                </ListItem>
                            ))}
                        </List>
                    </ListBox>
                </StyledBox>
                {/* Details Modal */}
                <Modal
                    open={detailModalOpen}
                    onClose={handleDetailModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <StyledModal>
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
                    </StyledModal>
                </Modal>
            </Box>
            <Footer />
        </>
    );
};

export default InstitutionList;
