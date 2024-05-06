import React, { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemText, Checkbox, Button, Typography, CircularProgress } from '@mui/material';

import { buscarPoliticas } from '../../services/policiesService';
import { PolicesInstitutionForm } from '../../types/policiesTypes';
import { useNavigate, useLocation } from 'react-router-dom';
import { cadastrarPoliticasInstituicao } from '../../services/policiesInstitutionService';

export const BuscaPoliticas = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<number | null>(null);
    const [selectedPolicies, setSelectedPolicies] = useState<{ [key: number]: boolean }>({});
    const [policies, setPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [filteredPolicies, setFilteredPolicies] = useState<PolicesInstitutionForm[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        const institutionId = location.state?.institutionId;

        if (institutionId) {
            console.log("Institution ID found:", institutionId);
            setSelectedInstitutionId(institutionId);
        } else {
            console.log(institutionId)
            console.log('No institution ID, navigating to /cadastro');
            //navigate('/cadastro');
        }

        const fetchPolicies = async () => {
            setLoading(true);
            try {
                console.log("Fetching policies");
                const fetchedPolicies = await buscarPoliticas();
                setPolicies(fetchedPolicies);
                setFilteredPolicies(fetchedPolicies);
                console.log("Policies fetched");
            } catch (error) {
                console.error('Failed to fetch policies:', error);
            }
            setLoading(false);
        };
        fetchPolicies();
    }, [location.state, navigate]);





    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = policies.filter(policy => policy.descricao.toLowerCase().includes(event.target.value.toLowerCase()));
        setFilteredPolicies(filtered);
    };

    const handlePolicySelection = (policyId: number) => {
        setSelectedPolicies(prev => ({
            ...prev,
            [policyId]: !prev[policyId]
        }));
    };

    // const handleSubmitPolicies = async () => {
    //     if (!selectedInstitutionId) {
    //         alert('Instituição não identificada.');
    //         return;
    //     }
    //     try {
    //         const selectedPolicyIds = Object.keys(selectedPolicies).filter(politicaId => selectedPolicies [politicaId]);
    //         const requests = selectedPolicyIds.map(politicaId =>
    //             cadastrarPoliticasInstituicao(selectedInstitutionId, Number(politicaId))
    //         );
    //         const responses = await Promise.all(requests);
    //         console.log(responses);
    //         alert('Políticas cadastradas com sucesso na Instituição!');
    //         navigate('/politicas'); // Tela de Sucesso
    //     } catch (error) {
    //         console.error('Erro ao cadastrar políticas na instituição:', error);
    //     }
    // };

    const handleSubmitPolicies = async () => {
        if (!selectedInstitutionId) {
            alert('Instituição não identificada.');
            return;
        }
        try {
            //const selectedPolicyIds = Object.keys(selectedPolicies).filter(policyId => selectedPolicies[policyId]);
            const requests = Object.entries(selectedPolicies).map(([politicaId]) =>
                cadastrarPoliticasInstituicao(selectedInstitutionId, Number(politicaId))
            );
            const responses = await Promise.all(requests);
            console.log(responses);
            alert('Políticas cadastradas com sucesso na Instituição!');
            navigate('/politicas'); // Tela de Sucesso
        } catch (error) {
            console.error('Erro ao cadastrar políticas na instituição:', error);
        }
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Typography variant='h4' sx={{ mb: 2 }}>Pesquisar Políticas</Typography>

            <TextField
                label='Pesquisar Política'
                variant='outlined'
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
            />
            {loading ? <CircularProgress /> : (
                <List>
                    {filteredPolicies.map((policy) => (
                        <ListItem key={policy.id} divider>
                            <Checkbox
                                checked={!!selectedPolicies[policy.id]}
                                onChange={() => handlePolicySelection(policy.id)}
                            />
                            <ListItemText
                                primary={policy.descricao}
                                // secondary={`ID: ${policy.id}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
            <Button variant='outlined' onClick={() => navigate('/cadastro')} sx={{ mt: 2, mr: 1 }}>Voltar</Button>
            <Button variant='contained' onClick={handleSubmitPolicies} sx={{ mt: 2 }}>Avançar</Button>
        </Box>
    );
};
