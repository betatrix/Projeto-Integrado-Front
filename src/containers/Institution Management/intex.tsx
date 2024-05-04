import React, { useState, useEffect } from "react";
import { Box, Checkbox, Typography, Table, TableHead, TableCell, TableBody, Button, Modal, IconButton, Grid, TableRow, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BackButton from "../../components/Back Page Button";

interface Institution {
    id: number;
    nome: string;
    ativo: boolean;
    sigla: string;
    notaMEC: number;
    site: string;
    logradouro: string;
    numero: number;
    cidade: string;
    estado: string;
    cep: string;
}

const InstitutionManagement: React.FC = () => {
    // to detail
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedDetailInstitution, setSelectedDetailInstitution] = useState<Institution | null>(null);

    const handleDetailModalOpen = (institution: Institution) => {
        setSelectedDetailInstitution(institution);
        setDetailModalOpen(true);
    };
    
    const handleDetailModalClose = () => {
        setDetailModalOpen(false);
        setSelectedDetailInstitution(null);
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

    const isDeleteButtonDisabled = selectedInstitutions.length <= 1

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

    useEffect(() => {
        const searchInstitution = async () => {
            const response = await fetch(`http://localhost:8080/instituicao?nome=${searchValue}`);
            const data = await response.json();
            setInstitutions(data);
        };
        searchInstitution();
    }, [searchValue]);
    

    return (
        <Box sx={{ marginTop: '20px'}}>

        <BackButton></BackButton> 

        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
            Gerenciamento de Instituições
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, paddingLeft:5, paddingRight:5 }}> 

        <TextField
            label="Pesquisar instituição"
            variant="outlined"
            sx={{width: "70%"}}
            onChange={(e) => setSearchValue(e.target.value)}
        />

            <Button variant="contained" color="primary">Cadastrar instituição</Button>

            <Button
                variant="contained"
                color="secondary"
                disabled={isDeleteButtonDisabled}
                onClick={handleDeleteMultipleModalOpen}
            >
                Excluir instituição
            </Button>

        </Box>

        <Box sx={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5}}>
            
        <Table>

            <TableHead>

                <TableRow>

                    <TableCell align="left"></TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Ativo</TableCell>
                    <TableCell align="right"></TableCell>

                </TableRow>                

            </TableHead>

            <TableBody>

            {institutions.map((institution) => (

                searchValue.trim() === '' || institution.nome.toLowerCase().includes(searchValue.toLowerCase()) ? (

                    <TableRow key={institution.id} onClick={() => handleDetailModalOpen(institution)}>

                        <TableCell align="left">
                            <Checkbox
                                onClick={(e) => e.stopPropagation()}
                                checked={selectedInstitutions.includes(institution.id)}
                                onChange={() => handleCheckboxChange(institution.id)}
                            />
                        </TableCell>

                        <TableCell>{institution.id}</TableCell>
                        <TableCell>{institution.nome}</TableCell>
                        <TableCell>{institution.ativo ? "Inativa" : "Ativa"}</TableCell>

                        <TableCell align="right">

                            <IconButton>
                                <EditIcon onClick={(e) => { e.stopPropagation(); }}/>
                            </IconButton>

                            <IconButton onClick={(e) => { e.stopPropagation(); handleDeleteModalOpen(institution); }}>
                                <DeleteIcon />
                            </IconButton>

                        </TableCell>

                    </TableRow>
                ) : null
            ))}

            </TableBody>

            </Table>

        </Box>
        

        {/*details modal*/}
        <Modal
            open={detailModalOpen}
            onClose={handleDetailModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 620 }}>
            {selectedDetailInstitution && (
                console.log(selectedDetailInstitution),

                <Grid container spacing={3}>

                    <Typography variant="h5" gutterBottom sx={{ marginTop: 2,  textAlign: "center" }}>
                        {selectedDetailInstitution.nome}
                    </Typography>

                    <Grid item xs={6}>

                        <Typography variant="h6" gutterBottom>
                            Dados Gerais
                        </Typography>

                        <Typography>ID: {selectedDetailInstitution.id}</Typography>
                        <Typography>Nome: {selectedDetailInstitution.nome}</Typography>
                        <Typography>Ativo: {selectedDetailInstitution.ativo ? "Não" : "Sim"}</Typography>
                        <Typography>Sigla: {selectedDetailInstitution.sigla}</Typography>
                        <Typography>Site: {selectedDetailInstitution.site || "Não disponível"}</Typography>
                        <Typography>Nota MEC: {selectedDetailInstitution.notaMEC || "Não disponível"}</Typography>

                    </Grid>

                    <Grid item xs={6}>

                        <Typography variant="h6" gutterBottom>
                            Endereço
                        </Typography>

                        <Typography>Rua: {selectedDetailInstitution.logradouro}</Typography>
                        <Typography>Número: {selectedDetailInstitution.numero}</Typography>
                        <Typography>Cidade: {selectedDetailInstitution.cidade}</Typography>
                        <Typography>Estado: {selectedDetailInstitution.estado}</Typography>
                        <Typography>CEP: {selectedDetailInstitution.cep}</Typography>

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
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%' }}>
               
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirmar exclusão
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tem certeza que deseja excluir a instituição {institutionToDelete?.nome}?
                </Typography>

                <Button onClick={async () => {

                if (institutionToDelete) {
                    try {
                        const response = await fetch(`http://localhost:8080/instituicao/${institutionToDelete.id}`, {
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
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 400, width: '90%' }}>
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
                            const response = await fetch(`http://localhost:8080/instituicao/${inst.id}`, {
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

        </Box>
    );
}

export default InstitutionManagement;
