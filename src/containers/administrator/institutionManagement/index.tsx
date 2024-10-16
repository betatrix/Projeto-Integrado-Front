import React, { useState, useEffect } from 'react';
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
    CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Footer from '../../../components/homeFooter';
import { Link } from 'react-router-dom';
import AdminHeader from '../../../components/adminHeader';
import { Endereco } from '../../../types/institutionTypes';
import SearchIcon from '@mui/icons-material/Search';
interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    sigla: string;
    notaMec: number;
    site: string;
    endereco: Endereco;
}

//environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const InstitutionManagement: React.FC = () => {
    // to detail
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDetailInstitutionWithAddress, setSelectedDetailInstitutionWithAddress] = useState<Institution | null>(null);

    const handleDetailModalOpen = async (institution: Institution) => {
        try {
            const response = await fetch(`${apiUrl}/instituicao/${institution.id}`);
            const data = await response.json();
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

    // to update
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEditInstitution, setSelectedEditInstitution] = useState<Institution | null>(null);

    const handleEditModalOpen = (institution: Institution) => {
        setSelectedEditInstitution(institution);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedEditInstitution(null);
        setEditModalOpen(false);
    };

    // to delete
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [institutionToDelete, setInstitutionToDelete] = useState<Institution | null>(null);

    const handleDeleteModalOpen = (institution: Institution) => {
        setInstitutionToDelete(institution);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setInstitutionToDelete(null);
        setDeleteModalOpen(false);
    };

    // to delete multiple institutions
    const [selectedInstitutions, setSelectedInstitutions] = useState<number[]>([]);
    const [deleteMultipleModalOpen, setDeleteMultipleModalOpen] = useState(false);
    const [institutionsToDeleteMultiple, setInstitutionsToDeleteMultiple] = useState<Institution[]>([]);

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

    // search API datas
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const searchInstitution = async () => {
            setLoading(true); // Ativa o estado de carregamento
            try {
                const response = await fetch(`${apiUrl}/instituicao?nome=${searchValue}`);
                const data = await response.json();
                setInstitutions(data);
            } catch (error) {
                console.error('Erro ao buscar instituições:', error);
            }
            setLoading(false); // Desativa o estado de carregamento
        };
        searchInstitution();
    }, [searchValue]);

    return (
        <>
            <AdminHeader />

            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar Instituição"
                        variant="outlined"
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace', }}
                        onChange={(e) => setSearchValue(e.target.value)}
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

                                {institutions.map((institution) => (

                                    searchValue.trim() === '' || institution.nome.toLowerCase().includes(searchValue.toLowerCase()) ? (
                                        console.log('Valor de ativo:', institution.ativo),

                                        <TableRow key={institution.id} onClick={() => handleDetailModalOpen(institution)}>

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
                                                    <Button
                                                        variant="text"
                                                        size="small"
                                                        onClick={(e) => { e.stopPropagation(); handleDetailModalOpen(institution); }}
                                                        sx={{
                                                            fontSize: '20px', color: '#185D8E',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        +
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{institution.ativo ? 'Ativo' : 'Inativo'}</TableCell>

                                        </TableRow>
                                    ) : null
                                ))}

                            </TableBody>

                        </Table>
                    )}

                </Box>

            </Box>
            <Footer />

            {/*details modal*/}
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
                    {selectedDetailInstitutionWithAddress && (

                        <Grid container spacing={3}>

                            <Typography variant="h5" gutterBottom sx={{ marginTop: 2, textAlign: 'center', paddingLeft: 2 }}>
                                {selectedDetailInstitutionWithAddress.nome}
                            </Typography>

                            <Grid item xs={6}>

                                <Typography variant="h6" gutterBottom>
                                    Dados Gerais
                                </Typography>

                                <Typography>ID: {selectedDetailInstitutionWithAddress.id}</Typography>
                                <Typography>Nome: {selectedDetailInstitutionWithAddress.nome}</Typography>
                                <Typography>Ativo: {selectedDetailInstitutionWithAddress.ativo ? 'Sim' : 'Não'}</Typography>
                                <Typography>Sigla: {selectedDetailInstitutionWithAddress.sigla}</Typography>
                                <Typography>Site: {selectedDetailInstitutionWithAddress.site || 'Não disponível'}</Typography>
                                <Typography>Nota MEC: {selectedDetailInstitutionWithAddress.notaMec || 'Não disponível'}</Typography>

                            </Grid>

                            <Grid item xs={6}>

                                <Typography variant="h6" gutterBottom>
                                    Endereço
                                </Typography>

                                <Typography>Rua: {selectedDetailInstitutionWithAddress.endereco.logradouro}</Typography>
                                <Typography>Número: {selectedDetailInstitutionWithAddress.endereco.numero}</Typography>
                                <Typography>Cidade: {selectedDetailInstitutionWithAddress.endereco.cidade}</Typography>
                                <Typography>Estado: {selectedDetailInstitutionWithAddress.endereco.estado}</Typography>
                                <Typography>CEP: {selectedDetailInstitutionWithAddress.endereco.cep}</Typography>

                            </Grid>
                        </Grid>
                    )}

                </Box>

            </Modal>

            {/* Edit modal */}
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
                    maxWidth: 620
                }}>
                    {selectedEditInstitution && (
                        <Grid container spacing={3} direction="column" alignItems="center">
                            <Grid item>
                                <Typography variant="h5" gutterBottom sx={{ marginTop: 2, textAlign: 'center' }}>
                                    Editar Instituição
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Nome"
                                    value={selectedEditInstitution.nome}
                                    onChange={(e) => setSelectedEditInstitution({ ...selectedEditInstitution, nome: e.target.value })}
                                    sx={{ marginRight: '10px' }}
                                />

                                <TextField
                                    label="Sigla"
                                    value={selectedEditInstitution.sigla}
                                    onChange={(e) => setSelectedEditInstitution({ ...selectedEditInstitution, sigla: e.target.value })}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Site"
                                    value={selectedEditInstitution.site}
                                    onChange={(e) => setSelectedEditInstitution({ ...selectedEditInstitution, site: e.target.value })}
                                    sx={{ marginRight: '10px' }}
                                />
                                <TextField
                                    label="Nota do MEC"
                                    type="number"
                                    value={selectedEditInstitution.notaMec || ''}
                                    onChange={(e) => {
                                        const parsedValue = parseInt(e.target.value, 10);
                                        if (!isNaN(parsedValue) && parsedValue <= 5) {
                                            setSelectedEditInstitution({ ...selectedEditInstitution, notaMec: parsedValue });
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item container justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={handleEditModalClose}>Cancelar</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={async () => {
                                        if (selectedEditInstitution) {
                                            try {
                                                const response = await fetch(
                                                    'https://projeto-integrado-back-production-86da.up.railway.app/instituicao', {
                                                        method: 'PUT',
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body: JSON.stringify(selectedEditInstitution)
                                                    });

                                                if (response.ok) {
                                                    console.log(`Instituição ${selectedEditInstitution.nome} atualizada com sucesso`);
                                                    try {
                                                        const updatedInstitutions = institutions.map(inst => {
                                                            if (inst.id === selectedEditInstitution.id) {
                                                                return selectedEditInstitution;
                                                            }
                                                            return inst;
                                                        });

                                                        setInstitutions(updatedInstitutions);
                                                    } catch (error) {
                                                        console.error('Erro ao atualizar lista de instituições após atualização:', error);
                                                    }
                                                } else {
                                                    console.error('Falha ao atualizar instituição');
                                                }

                                            } catch (error) {
                                                console.error('Erro ao atualizar instituição:', error);
                                            } finally {
                                                handleEditModalClose();
                                            }
                                        }
                                    }}>Salvar</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>

            {/* delete modal */}
            <Modal
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%'
                }}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmar exclusão
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tem certeza que deseja excluir a instituição {institutionToDelete?.nome}?
                    </Typography>

                    <Button onClick={async () => {
                        if (institutionToDelete) {
                            try {
                                const response = await fetch(`${apiUrl}/instituicao/${institutionToDelete.id}`, {
                                    method: 'DELETE',
                                });

                                if (response.ok) {
                                    console.log(`Instituição ${institutionToDelete.nome} excluída com sucesso`);
                                    setInstitutions(institutions.filter(institution => institution.id !== institutionToDelete.id));
                                } else {
                                    console.error('Falha ao excluir instituição');
                                }
                            } catch (error) {
                                console.error('Erro ao excluir instituição:', error);
                            } finally {
                                handleDeleteModalClose();
                            }
                        }
                    }}>Sim</Button>

                    <Button onClick={handleDeleteModalClose}>Não</Button>

                </Box>

            </Modal>

            {/* delete modal for multiples institutions */}
            <Modal
                open={deleteMultipleModalOpen}
                onClose={handleDeleteMultipleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%'
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmar exclusão de múltiplas instituições
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tem certeza que deseja excluir as seguintes instituições?
                    </Typography>

                    {institutionsToDeleteMultiple.map(inst => (
                        <Typography key={inst.id}>{inst.nome}</Typography>
                    ))}

                    <Button onClick={async () => {
                        try {
                            await Promise.all(institutionsToDeleteMultiple.map(async (inst) => {
                                const response = await fetch(`${apiUrl}/instituicao/${inst.id}`, {
                                    method: 'DELETE',
                                });

                                if (response.ok) {
                                    console.log(`Instituição ${inst.nome} excluída com sucesso`);
                                } else {
                                    console.error(`Falha ao excluir instituição ${inst.nome}`);
                                }
                            }));

                            setInstitutions(institutions.filter(inst => !selectedInstitutions.includes(inst.id)));
                        } catch (error) {
                            console.error('Erro ao excluir instituições:', error);
                        } finally {
                            handleDeleteMultipleModalClose();
                        }
                    }}>Sim</Button>

                    <Button onClick={handleDeleteMultipleModalClose}>Não</Button>
                </Box>
            </Modal>
        </>

    );
};

export default InstitutionManagement;
