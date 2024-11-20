/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Button,
    Typography,
    CircularProgress,
    Stepper,
    StepLabel,
    Grid,
    Modal,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useInstitution } from '../../../context/institutionContext';
import { buscarPoliticas } from '../../../services/policiesService';
import { PolicesInstitutionForm } from '../../../types/policiesTypes';
import { useNavigate } from 'react-router-dom';
import { cadastrarPoliticasInstituicao } from '../../../services/policiesInstitutionService';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';
import Step from '@mui/material/Step';

export const BuscaPoliticas: React.FC = () => {
    const { institutionId } = useInstitution();
    const navigate = useNavigate();
    const steps = [
        'Cadastrar Dados da Instituição',
        'Adicionar Cursos na Instituição',
        'Adicionar Políticas Afirmativas na Instituição',
    ];

    const [selectedPolicies, setSelectedPolicies] = useState<{ [key: number]: boolean }>({});
    const [policies, setPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [filteredPolicies, setFilteredPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [finalModalOpen, setFinalModalOpen] = useState(false);

    // useEffect(() => {
    //     const fetchPolicies = async () => {
    //         setLoading(true); // Ativa o estado de carregamento
    //         try {
    //             const fetchedPolicies = await buscarPoliticas(); // Busca as políticas da API
    //             const sortedPolicies = fetchedPolicies.sort((a: { descricao: string; }, b: { descricao: string; }) =>
    //                 a.descricao.localeCompare(b.descricao)
    //             ); // Ordena as políticas em ordem alfabética
    //             setPolicies(sortedPolicies); // Armazena as políticas ordenadas
    //             setFilteredPolicies(sortedPolicies); // Armazena as políticas ordenadas no filtro também
    //         } catch (error) {
    //             console.error('Failed to fetch policies:', error);
    //         }
    //         setLoading(false); // Desativa o estado de carregamento
    //     };
    //     fetchPolicies(); // Chama a função diretamente
    // }, []); // O useEffect será executado uma vez quando o componente for montado// O useEffect será executado uma vez quando o componente for montado
    useEffect(() => {
        if (!institutionId) {
            console.log('No institution ID, navigating to /cadastro-instituicao');
            // navigate('/cadastro');
        } else {
            const fetchPolicies = async () => {
                setLoading(true);
                try {
                    const fetchedPolicies = await buscarPoliticas(); // Pode precisar adicionar institutionId como parâmetro dependendo da API
                    setPolicies(fetchedPolicies);
                    setFilteredPolicies(fetchedPolicies);
                } catch (error) {
                    console.error('Failed to fetch policies:', error);
                }
                setLoading(false);
            };
            fetchPolicies();
        }
    }, [institutionId, navigate]);

    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchTerm(event.target.value);
    //     const filtered = policies.filter(policy => policy.descricao.toLowerCase().includes(event.target.value.toLowerCase()));
    //     .filter(policy => policy.descricao.toLowerCase().includes(event.target.value.toLowerCase()))
    //         .sort((a, b) => a.descricao.localeCompare(b.descricao)); // Ord
    //     setFilteredPolicies(filtered);
    // };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = policies
            .filter(policy => policy.descricao.toLowerCase().includes(event.target.value.toLowerCase()))
            .sort((a, b) => a.descricao.localeCompare(b.descricao)); // Ordena as políticas filtradas
        setFilteredPolicies(filtered);
    };

    const handlePolicySelection = (policyId: number) => {
        setSelectedPolicies(prev => ({
            ...prev,
            [policyId]: !prev[policyId]
        }));
    };

    const handleOpenConfirmModal = () => {
        const hasSelectedPolicy = Object.values(selectedPolicies).some(isSelected => isSelected);
        if (hasSelectedPolicy) {
            setConfirmModalOpen(true);
        } else {
            alert('Selecione uma política para continuar!');
        }
    };

    const handleCloseConfirmModal = () => {
        setConfirmModalOpen(false);
    };

    const handleConfirmPolicies = async () => {
        if (!institutionId) {
            alert('Instituição não identificada.');
            return;
        }
        try {
            const selectedPolicyIds = Object.entries(selectedPolicies)
                .filter(([_, isSelected]) => isSelected)
                .map(([id, _]) => id);
            const responses = await Promise.all(selectedPolicyIds.map(policyId =>
                cadastrarPoliticasInstituicao(institutionId, Number(policyId))));
            console.log('Respostas:', responses);

            if (responses?.length > 0) {
                // alert('Políticas cadastradas com sucesso na Instituição');
                setFinalModalOpen(true); // Exibe o modal final
                // navigate('/gerenciamento-instituicao');
            } else {
                alert('Erro ao cadastrar políticas!');
            }

        } catch (error) {
            console.error('Erro ao cadastrar políticas na instituição:', error);
        }
        setConfirmModalOpen(false);
    };

    const handleCloseFinalModal = () => {
        setFinalModalOpen(false);
        navigate('/gerenciamento-instituicao');
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 90 }}></Box>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={2} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box >
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        maxWidth: 600,
                        margin: 'auto',
                        mt: 4,
                        marginBottom: '40px',
                    }}>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, gap: 2, marginBottom: '30px' }}>
                            <TextField
                                label="Pesquisar Política"
                                variant="outlined"
                                sx={{ width: '100%', fontFamily: 'Roboto, monospace', }}

                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                            <Button variant="contained" sx={{
                                height: '50px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                },
                            }} onClick={handleOpenConfirmModal}>
                                Adicionar
                            </Button>
                        </Box>

                        {loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '80vh', // Altura de toda a tela
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <List>
                                {filteredPolicies.map((policy) => (
                                    <ListItem key={policy.id} divider>
                                        <Checkbox
                                            checked={!!selectedPolicies[policy.id]}
                                            onChange={() => handlePolicySelection(policy.id)}
                                        />
                                        <ListItemText
                                            primary={policy.descricao}
                                            sx={{ textAlign: 'justify' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Confirm Modal */}
            <Modal
                open={confirmModalOpen}
                onClose={handleCloseConfirmModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: 400, borderRadius: '5px'
                }}>
                    <Typography variant="h6" gutterBottom component="h2" sx={{
                        color: '#185D8E',
                        fontFamily: 'Roboto, monospace',
                        marginTop: 1,
                        fontWeight: 'bold',
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'justify',
                        mb: '5px'
                    }}>
                        Confirmação
                    </Typography>
                    <Typography gutterBottom sx={{
                        mt: 2,
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'justify',
                        mb: '10px'
                    }}>
                        Você está prestes a adicionar as políticas selecionadas à instituição. Deseja continuar?
                    </Typography>
                    <Grid container
                        spacing={2}
                        justifyContent="center"
                        sx={{ mt: 2 }}>
                        <Grid item>
                            <Button variant='contained' onClick={handleConfirmPolicies} sx={{
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
                        <Grid item>
                            <Button variant='contained' onClick={handleCloseConfirmModal} sx={{
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

            {/* Modal de Confirmação de Cadstro Completo */}
            <Dialog
                open={finalModalOpen}
                onClose={handleCloseFinalModal}
                aria-labelledby="final-modal-title"
                aria-describedby="final-modal-description"
            >
                <DialogTitle id="final-modal-title" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Confirmação
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="final-modal-description" variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Roboto, monospace' }}>
                        Instituição cadastrada!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={handleCloseFinalModal}
                            sx={{
                                textAlign: 'center',
                                height: '35px',
                                fontSize: '17px',
                                fontFamily: 'Roboto, monospace',
                                color: 'white',
                                backgroundColor: '#185D8E',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                '&:hover': {
                                    backgroundColor: '#104A6F',
                                    color: 'white',
                                },
                            }}
                        >
                            OK
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
};

export default BuscaPoliticas;
