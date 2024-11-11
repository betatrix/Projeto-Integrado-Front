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
    Grid,
    Typography,
    InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { buscarUsuarios, editarUsuario, excluirUsuario } from '../../../services/userService';
import { UserForm } from '../../../types/userTypes';
import { Formik, Form } from 'formik';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<UserForm[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserForm | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await buscarUsuarios();
                console.log('Usuários carregados:', fetchedUsers);
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = users.filter((user) =>
            user?.nome?.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleEditModalOpen = (user: UserForm) => {
        setSelectedUser(user);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedUser(null);
        setEditModalOpen(false);
    };

    const handleDeleteModalOpen = (user: UserForm) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setSelectedUser(null);
        setDeleteModalOpen(false);
    };

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                await excluirUsuario(selectedUser.id);
                setUsers(users.filter((u) => u.id !== selectedUser.id));
                setFilteredUsers(filteredUsers.filter((u) => u.id !== selectedUser.id));
                handleDeleteModalClose();
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
            }
        }
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20, gap: 2, paddingLeft: 65 }}>
                    <TextField
                        label="Pesquisar usuários"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{ width: '55%', fontFamily: 'Roboto, monospace', }}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link to="/gerenciamento-administrador">
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
                        }}>Gerenciamento de Administrador</Button>
                    </Link>
                </Box>
                <Box sx={{ paddingTop: 10, paddingLeft: 45, paddingRight: 45, marginBottom: 10 }}>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableRow>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>

                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <IconButton onClick={() => handleEditModalOpen(user)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteModalOpen(user)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.nome}</TableCell>
                                            <TableCell>{user.ativo ? 'Ativo' : 'Inativo'}</TableCell>
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
                        maxWidth: 500,
                        width: '90%',
                        borderRadius: '5px'
                    }}
                >
                    {selectedUser && (
                        <Formik
                            initialValues={selectedUser}
                            enableReinitialize
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    await editarUsuario(values);
                                    setUsers(users.map((user) =>
                                        user.id === values.id ? { ...user, ...values } : user
                                    ));
                                    setFilteredUsers(filteredUsers.map((user) =>
                                        user.id === values.id ? { ...user, ...values } : user
                                    ));
                                    handleEditModalClose();
                                } catch (error) {
                                    console.error('Erro ao atualizar usuário:', error);
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Editar Usuário</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Celular"
                                                name="celular"
                                                fullWidth
                                                value={values.celular}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
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
                                        </Grid> */}
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
                        Tem certeza de que deseja excluir o usuário {selectedUser?.nome}?
                    </Typography>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleDeleteUser}
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

export default UserManagement;
