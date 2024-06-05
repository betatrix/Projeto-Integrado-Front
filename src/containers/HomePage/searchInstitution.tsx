import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Modal,
    Grid,
} from '@mui/material';
import InitialPageHeader from '../../components/HomeHeader/';
import Footer from '../../components/AdminFooter';
import { Endereco } from '../../types/institutionTypes';
import { buscarEntidades, buscarEntidadePorId, buscarCursosPorInstituicao } from '../../services/apiService';

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
            <InitialPageHeader />
            <Box sx={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 700, margin: 'auto', mt: 4 }}>
                <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center' }}>
                    Lista de Instituições
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        label="Pesquisar Instituição"
                        variant='standard'
                        sx={{ width: '100%' }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Box>
                <Box sx={{ paddingTop: 1 }}>
                    <List>
                        {filteredInstitutions.map((institution) => (
                            <ListItem key={institution.id} button onClick={() => handleDetailModalOpen(institution)}>
                                <ListItemText primary={institution.nome} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            {/* Details Modal */}
            <Modal
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 600
                }}>
                    {selectedInstitution && (
                        <Grid container spacing={3}>
                            <Typography variant="h5" gutterBottom sx={{ marginTop: 2, textAlign: 'center', paddingLeft: 2 }}>
                                {selectedInstitution.nome}
                            </Typography>
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
                    )}
                </Box>
            </Modal>
            <Footer />
        </>
    );
};

export default InstitutionList;
