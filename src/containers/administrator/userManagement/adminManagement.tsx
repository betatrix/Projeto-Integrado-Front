
import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    CircularProgress,
    IconButton,
    Modal,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    Typography,
    Grid,
    InputAdornment,
    Checkbox,
    Paper,
    TablePagination,
    Snackbar,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { buscarAdministrador, buscarAdministradorPorId, editarAdministrador, excluirAdministrador } from '../../../services/userService';
import { AdmForm } from '../../../types/userTypes';
import { Formik, Form } from 'formik';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const AdminManagement: React.FC = () => {
    const [admins, setAdmins] = useState<AdmForm[]>([]);
    const [filteredAdmins, setFilteredAdmins] = useState<AdmForm[]>([]);
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<AdmForm | null>(null);
    const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [deleteMultipleModalOpen, setDeleteMultipleModalOpen] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showSuccessDeleteMessage, setShowSuccessDeleteMessage] = useState(false);
    const [showErrorDeleteMessage, setShowErrorDeleteMessage] = useState(false);
    const [showSuccessMassDeleteMessage, setShowSuccessMassDeleteMessage] = useState(false);
    const [showErrorMassDeleteMessage, setShowErrorMassDeleteMessage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedAdmins = await buscarAdministrador();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const sortedAdmins = fetchedAdmins.sort((a: { nome: string; }, b: { nome: any; }) => a.nome.localeCompare(b.nome)); // Ordena pelo nome
                setAdmins(sortedAdmins);
                setFilteredAdmins(sortedAdmins);
            } catch (error) {
                console.error('Erro ao buscar administradores:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        if (!isNaN(Number(searchTerm))) {
            // Pesquisa por ID
            const filtered = admins.filter((admin) =>
                admin.id.toString().includes(searchTerm)
            );
            setFilteredAdmins(filtered);
        } else {
            // Pesquisa por nome
            const filtered = admins.filter((admin) =>
                admin.nome.toLowerCase().includes(searchTerm)
            );
            setFilteredAdmins(filtered);
        }
        setPage(0); // Resetar para a primeira página após a pesquisa
    };

    const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedAdmins = filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleDetailModalOpen = async (admin: AdmForm) => {
        try {
            const adminData = await buscarAdministradorPorId(admin.id);
            setSelectedAdmin(adminData);
            setDetailModalOpen(true);
        } catch (error) {
            console.error('Erro ao buscar dados do administrador:', error);
        }
    };

    const handleDetailModalClose = () => {
        setSelectedAdmin(null);
        setDetailModalOpen(false);
    };

    const handleEditModalOpen = async (admin: AdmForm) => {
        try {
            const adminData = await buscarAdministradorPorId(admin.id);
            setSelectedAdmin(adminData);
            setEditModalOpen(true);
        } catch (error) {
            console.error('Erro ao buscar dados completos do administrador:', error);
        }
    };

    const handleEditModalClose = () => {
        setSelectedAdmin(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (admin: AdmForm) => {
        setSelectedAdmin(admin);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedAdmin(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteAdmin = async () => {
        if (selectedAdmin) {
            try {
                await excluirAdministrador(selectedAdmin.id);
                setAdmins(admins.filter((a) => a.id !== selectedAdmin.id));
                setFilteredAdmins(filteredAdmins.filter((a) => a.id !== selectedAdmin.id));
                setShowSuccessDeleteMessage(true); // Mostra mensagem de sucesso na exclusão
            } catch (error) {
                console.error('Erro ao excluir administrador:', error);
                setShowErrorDeleteMessage(true); // Mostra mensagem de erro na exclusão
            } finally {
                handleDeleteModalClose();
            }
        }
    };

    const handleDeleteSelectedAdmins = async () => {
        try {
            for (const adminId of selectedAdmins) {
                await excluirAdministrador(adminId);
            }
            setAdmins(admins.filter((admin) => !selectedAdmins.includes(admin.id)));
            setFilteredAdmins(filteredAdmins.filter((admin) => !selectedAdmins.includes(admin.id)));
            setSelectedAdmins([]);
            setShowSuccessMassDeleteMessage(true); // Mostra mensagem de sucesso na exclusão múltipla
        } catch (error) {
            console.error('Erro ao excluir administradores selecionados:', error);
            setShowErrorMassDeleteMessage(true); // Mostra mensagem de erro na exclusão múltipla
        }
    };

    const toggleSelectAdmin = (adminId: number) => {
        setSelectedAdmins((prevSelected) =>
            prevSelected.includes(adminId)
                ? prevSelected.filter((id) => id !== adminId)
                : [...prevSelected, adminId]
        );
    };

    const handleDeleteMultipleModalOpen = () => {
        setDeleteMultipleModalOpen(true);
    };

    const handleDeleteMultipleModalClose = () => {
        setDeleteMultipleModalOpen(false);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar Administradores"
                        variant="outlined"
                        onChange={handleSearchChange}
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link to="/cadastro-administrador">
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
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '60px'
                        }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ borderRight: '1px solid #ddd', width: '10rem' }}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={handleDeleteMultipleModalOpen}
                                                disabled={selectedAdmins.length === 0}
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
                                        <TableCell sx={{ borderRight: '1px solid #ddd', fontWeight: 'bold', color: '#757575' }}>NOME</TableCell>
                                        <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', color: '#757575', width: '5rem' }}>STATUS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedAdmins.map((admin) => (
                                        <TableRow key={admin.id}>
                                            <TableCell align="center" sx={{ borderRight: '1px solid #ddd' }}>
                                                <Checkbox
                                                    checked={selectedAdmins.includes(admin.id)}
                                                    onChange={() => toggleSelectAdmin(admin.id)}
                                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                                />
                                                <IconButton onClick={() => handleEditModalOpen(admin)}>
                                                    <EditIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(admin)}>
                                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd', textAlign: 'center' }}>{admin.id}</TableCell>
                                            <TableCell sx={{ borderRight: '1px solid #ddd' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography sx={{
                                                        fontSize: '15px', color: '#757575',
                                                    }}>{admin.nome}</Typography>
                                                    <IconButton size="small" onClick={() => handleDetailModalOpen(admin)} sx={{
                                                        color: '#185D8E',
                                                    }}>
                                                        <VisibilityOutlinedIcon sx={{
                                                            fontSize: '18px'
                                                        }} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{admin.ativo ? 'Ativo' : 'Inativo'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 7, marginBottom: 7 }}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredAdmins.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Box>
            <Footer />

            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={handleEditModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        maxWidth: 600,
                        width: '90%',
                        borderRadius: '5px'
                    }}
                >
                    {selectedAdmin && (
                        <Formik
                            initialValues={selectedAdmin}
                            enableReinitialize
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await editarAdministrador(values);

                                    // Atualiza a lista de administradores
                                    const updatedAdmins = admins.map((admin) =>
                                        admin.id === values.id ? { ...admin, ...values } : admin
                                    );
                                    setAdmins(updatedAdmins);
                                    setFilteredAdmins(updatedAdmins);

                                    // Fecha o modal com sucesso
                                    setShowSuccessMessage(true);
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar administrador:', error);
                                    setShowErrorMessage(true);
                                } finally {
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
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
                                            marginBottom: '15px', fontSize: '18px',
                                            fontWeight: 'bold', fontFamily: 'Roboto, monospace',
                                        }}>
                                            Dados Gerais
                                        </Typography>
                                    </Grid>
                                    <Grid container spacing={2} sx={{ marginBottom: '10px' }}>

                                        <Grid item xs={12}>
                                            <TextField label="Nome" name="nome" fullWidth value={values.nome} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="CPF" name="cpf" fullWidth value={values.cpf} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Email" name="email" fullWidth value={values.email} onChange={handleChange} disabled={!values.ativo} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Cargo" name="cargo" fullWidth value={values.cargo} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Celular" name="celular" fullWidth value={values.celular} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" gutterBottom sx={{
                                                marginBottom: '5px', fontSize: '18px',
                                                fontWeight: 'bold', fontFamily: 'Roboto, monospace',
                                            }}>
                                                Endereço
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Logradouro" name="endereco.logradouro" fullWidth value={values.endereco.logradouro} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField label="Número" name="endereco.numero" fullWidth value={values.endereco.numero} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="CEP" name="endereco.cep" fullWidth value={values.endereco.cep} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Estado" name="endereco.estado" fullWidth value={values.endereco.estado} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Cidade" name="endereco.cidade" fullWidth value={values.endereco.cidade} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Complemento" name="endereco.complemento" fullWidth value={values.endereco.complemento} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField label="Bairro" name="endereco.bairro" fullWidth value={values.endereco.bairro} onChange={handleChange} />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>
                                                <Button
                                                    onClick={handleEditModalClose}
                                                    variant="outlined"
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
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    )}
                </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal open={deleteModalOpen} onClose={handleDeleteModalClose}>
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
                        borderRadius: '5px',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{
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
                        Você está prestes a excluir o administrador {selectedAdmin?.nome}. Deseja Continuar?
                    </Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: '10px' }}>
                        <Grid item display="flex" justifyContent="center">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDeleteAdmin}
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
                                }}>
                                Sim
                            </Button>
                        </Grid>
                        <Grid item display="flex" justifyContent="center">
                            <Button
                                variant="outlined"
                                onClick={handleDeleteModalClose}
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
                                Não
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {/* Modal de detalhes */}
            <Modal
                open={detailModalOpen}
                onClose={handleDetailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 700, borderRadius: '5px'
                }}>
                    {selectedAdmin && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        color: '#185D8E',
                                        fontFamily: 'Roboto, monospace',
                                        // marginTop: 2,
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    {selectedAdmin.nome}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ padding: '20px', height: '320px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Dados Gerais
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>ID: {selectedAdmin.id}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Ativo: {selectedAdmin.ativo ? 'Sim' : 'Não'}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Nome: {selectedAdmin.nome}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>CPF: {selectedAdmin.cpf}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Cargo: {selectedAdmin.cargo}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Email: {selectedAdmin.email}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Celular: {selectedAdmin.celular}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper sx={{ padding: '20px', height: '320px', border: '3px solid #185D8E', boxShadow: 'none' }}>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace', color: '#757575' }}>
                                        Endereço
                                    </Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Logradouro: {selectedAdmin.endereco?.logradouro}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Número: {selectedAdmin.endereco?.numero}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Cidade: {selectedAdmin.endereco?.cidade}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>Estado: {selectedAdmin.endereco?.estado}</Typography>
                                    <Typography sx={{ fontFamily: 'Poppins, sans-serif', }}>CEP: {selectedAdmin.endereco?.cep}</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Modal>
            <Modal
                open={deleteMultipleModalOpen}
                onClose={handleDeleteMultipleModalClose}
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
                        maxWidth: 400,
                        width: '90%',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            color: '#185D8E',
                            fontFamily: 'Roboto, monospace',
                            marginTop: 1,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            mb: '5px',
                        }}
                    >
                        Confirmar Exclusão
                    </Typography>
                    <Typography
                        id="modal-modal-description"
                        sx={{
                            mt: 2,
                            fontFamily: 'Poppins, sans-serif',
                            textAlign: 'justify',
                            mb: '10px',
                        }}
                    >
                        Você está prestes a excluir os administradores selecionados. Deseja continuar?
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                    await handleDeleteSelectedAdmins();
                                    handleDeleteMultipleModalClose();
                                }}
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
                                    },
                                }}
                            >
                                Sim
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleDeleteMultipleModalClose}
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
                                    },
                                }}
                            >
                                Não
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            {/* Mensagem de sucesso na atualização */}
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMessage(false)}
            >
                <Alert onClose={() => setShowSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Administrador atualizado com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na atualização */}
            <Snackbar
                open={showErrorMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMessage(false)}
            >
                <Alert onClose={() => setShowErrorMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao atualizar administrador.
                </Alert>
            </Snackbar>

            {/* Mensagem de sucesso na exclusão */}
            <Snackbar
                open={showSuccessDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessDeleteMessage(false)}
            >
                <Alert onClose={() => setShowSuccessDeleteMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Administrador excluído com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na exclusão */}
            <Snackbar
                open={showErrorDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorDeleteMessage(false)}
            >
                <Alert onClose={() => setShowErrorDeleteMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao excluir administrador.
                </Alert>
            </Snackbar>

            {/* Mensagem de sucesso na exclusão múltipla */}
            <Snackbar
                open={showSuccessMassDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowSuccessMassDeleteMessage(false)}
            >
                <Alert onClose={() => setShowSuccessMassDeleteMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Administradores excluídos com sucesso!
                </Alert>
            </Snackbar>

            {/* Mensagem de erro na exclusão múltipla */}
            <Snackbar
                open={showErrorMassDeleteMessage}
                autoHideDuration={6000}
                onClose={() => setShowErrorMassDeleteMessage(false)}
            >
                <Alert onClose={() => setShowErrorMassDeleteMessage(false)} severity="error" sx={{ width: '100%' }}>
                    Erro ao excluir administradores.
                </Alert>
            </Snackbar>

        </>
    );
};

export default AdminManagement;
