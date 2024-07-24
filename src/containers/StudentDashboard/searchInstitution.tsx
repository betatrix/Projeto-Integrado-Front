import React, { useState, useEffect } from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Modal,
    Grid,
} from '@mui/material';
import Footer from '../../components/AdminFooter';
import { Endereco } from '../../types/institutionTypes';
import { buscarEntidades, buscarEntidadePorId, buscarCursosPorInstituicao } from '../../services/apiService';
import { DetailTypography, GridContainer, ListBox, SearchBox, StyledBox, StyledModal, StyledTypography } from './styles';
import InstitutionSearchHeader from '../../components/InstitutionSearchHeader';

interface Curso {
    id: number;
    descricao: string;
}
interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    sigla: string;
    notaMec: number;
    site: string;
    endereco: Endereco;
    cursos: Curso[];
}

const InstitutionList: React.FC = () => {
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const data = await buscarEntidades('instituicao');
                setInstitutions(data);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
        };
        fetchInstitutions();
    }, []);

    const filteredInstitutions = institutions.filter(institution =>
        institution.nome.toLowerCase().includes(searchValue.toLowerCase())
    );

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

    return (
        <>
            <InstitutionSearchHeader />
            <StyledBox>
                <StyledTypography>
                    <Typography variant="h5">
                        Lista de Instituições
                    </Typography>
                </StyledTypography>
                <SearchBox>
                    <TextField
                        label="Pesquisar Instituição"
                        variant='standard'
                        sx={{ width: '100%' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </SearchBox>
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
                                    <Typography variant="h5" gutterBottom>
                                        {selectedInstitution.nome}
                                    </Typography>
                                </DetailTypography>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" gutterBottom>
                                            Dados Gerais
                                        </Typography>
                                        <Typography>Nome: {selectedInstitution.nome}</Typography>
                                        <Typography>Sigla: {selectedInstitution.sigla}</Typography>
                                        <Typography>Site: {selectedInstitution.site || 'Não disponível'}</Typography>
                                        <Typography>Nota MEC: {selectedInstitution.notaMec || 'Não disponível'}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" gutterBottom>
                                            Endereço
                                        </Typography>
                                        <Typography>Rua: {selectedInstitution.endereco.logradouro}</Typography>
                                        <Typography>Número: {selectedInstitution.endereco.numero}</Typography>
                                        <Typography>Cidade: {selectedInstitution.endereco.cidade}</Typography>
                                        <Typography>Estado: {selectedInstitution.endereco.estado}</Typography>
                                        <Typography>CEP: {selectedInstitution.endereco.cep}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" gutterBottom>
                                            Cursos
                                        </Typography>
                                        <List dense>
                                            {selectedInstitution.cursos?.length > 0 ? (
                                                selectedInstitution.cursos.map((curso) => (
                                                    <ListItem key={curso.id}>
                                                        <ListItemText primary={curso.descricao} />
                                                    </ListItem>
                                                ))
                                            ) : (
                                                <Typography variant="body1" color="textSecondary">
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
            <Footer />
        </>
    );
};

export default InstitutionList;
