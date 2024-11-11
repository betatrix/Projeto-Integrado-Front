import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    CircularProgress,
    // IconButton,
    Modal,
    Button,
    Grid,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { buscarAdministrador, editarAdministrador, excluirAdministrador } from '../../../services/userService';
import { AdmForm } from '../../../types/userTypes';
import { Formik, Form } from 'formik';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import PersonIcon from '@mui/icons-material/Person';

const AdminManagement: React.FC = () => {
    const [admins, setAdmins] = useState<AdmForm[]>([]);
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<AdmForm | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedAdmins = await buscarAdministrador();
                setAdmins(fetchedAdmins);
            } catch (error) {
                console.error('Erro ao buscar administradores:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleEditModalOpen = (admin: AdmForm) => {
        // Inicializa 'endereco' se estiver faltando para evitar erros
        setSelectedAdmin({
            ...admin,
            endereco: admin.endereco || {
                cep: '',
                logradouro: '',
                estado: '',
                cidade: '',
                numero: '',
                complemento: '',
                bairro: '',
            },
        });
        setEditModalOpen(true);
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
                handleDeleteModalClose();
            } catch (error) {
                console.error('Erro ao excluir administrador:', error);
            }
        }
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 100 }}></Box>
                {loading ? (
                    <CircularProgress />
                ) : (
                    admins.map((admin) => (
                        <Box
                            key={admin.id}
                            sx={{
                                width: '100%',
                                height: '100%',
                                maxWidth: '800px',
                                maxHeight: '900px',
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: 3,
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{admin.nome}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                                <PersonIcon sx={{ borderRadius: '50%', width: '100px', height: '100px' }} />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Typography variant="body1"><strong>Email:</strong> {admin.email}</Typography>
                                <Typography variant="body1"><strong>CPF:</strong> {admin.cpf}</Typography>
                                <Typography variant="body1"><strong>Cargo:</strong> {admin.cargo}</Typography>
                                <Typography variant="body1"><strong>Celular:</strong> {admin.celular}</Typography>
                                <Typography variant="body1"><strong>Status:</strong> {admin.ativo ? 'Ativo' : 'Inativo'}</Typography>
                                {/* <Typography variant="body1"><strong>Endereço:</strong> {`${admin.endereco.logradouro}, ${admin.endereco.numero},
                                ${admin.endereco.bairro}, ${admin.endereco.cidade}, ${admin.endereco.estado}, ${admin.endereco.cep}`}</Typography> */}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleEditModalOpen(admin)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteModalOpen(admin)}
                                >
                                    Excluir
                                </Button>
                            </Box>
                        </Box>
                    ))
                )}
            </Box>
            <Footer />

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
                            initialValues={{
                                ...selectedAdmin,
                                cpf: selectedAdmin?.cpf || '',
                                endereco: selectedAdmin?.endereco || {
                                    cep: '',
                                    logradouro: '',
                                    estado: '',
                                    cidade: '',
                                    numero: '',
                                    complemento: '',
                                    bairro: '',
                                },
                            }}
                            enableReinitialize
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await editarAdministrador(values);
                                    setAdmins(admins.map((admin) =>
                                        admin.id === values.id ? { ...admin, ...values } : admin
                                    ));
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar administrador:', error);
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Nome"
                                                name="nome"
                                                fullWidth
                                                value={values.nome}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="CPF"
                                                name="cpf"
                                                fullWidth
                                                value={values.cpf}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Cargo"
                                                name="cargo"
                                                fullWidth
                                                value={values.cargo}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Celular"
                                                name="celular"
                                                fullWidth
                                                value={values.celular}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Status"
                                                name="ativo"
                                                select
                                                fullWidth
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                value={values.ativo ? 'Ativo' : 'Inativo'}
                                                onChange={handleChange}
                                            >
                                                <option value="Ativo">Ativo</option>
                                                <option value="Inativo">Inativo</option>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1">Endereço</Typography>
                                        </Grid>
                                        {['cep', 'logradouro', 'estado', 'cidade', 'numero', 'complemento', 'bairro'].map((field) => (
                                            <Grid item xs={6} key={field}>
                                                <TextField
                                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                    name={`endereco.${field}`}
                                                    fullWidth
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                    value={(values.endereco as any)[field]}
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        ))}
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                                Salvar
                                            </Button>
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
                    <Typography variant="h6" gutterBottom>
                        Confirmar Exclusão
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                        Tem certeza de que deseja excluir o administrador {selectedAdmin?.nome}?
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDeleteAdmin}
                            >
                                Confirmar
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                onClick={handleDeleteModalClose}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default AdminManagement;
