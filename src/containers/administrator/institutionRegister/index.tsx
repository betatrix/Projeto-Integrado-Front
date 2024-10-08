import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import { Button, Box, Typography, Grid, Paper, MenuItem, Stepper, StepLabel } from '@mui/material';
import Step from '@mui/material/Step';
import axios from 'axios';
import * as Yup from 'yup';
import { useInstitution } from '../../../context/institutionContext';
import { useNavigate } from 'react-router-dom';
import { cadastrarInstituicao } from '../../../services/institutionService';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';

interface FormValues {
    nome: string;
    site: string;
    formaIngresso: string;
    notaMec: number | null;
    sigla: string;
    tipo: string; // Adicionando o campo tipo
    endereco: {
        logradouro: string;
        numero: string;
        complemento: string;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
    };
}

export const CadastroInstituicao: React.FC = () => {
    const navigate = useNavigate();
    const { setInstitutionId } = useInstitution();
    const steps = [
        'Cadastrar Dados da Instituição',
        'Adicionar Cursos na Instituição',
        'Adicionar Políticas Afirmativas na Instituição',
    ];

    const initialValues: FormValues = {
        nome: '',
        site: '',
        formaIngresso: '',
        notaMec: null,
        sigla: '',
        tipo: '', // Campo adicionado
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: '',
        },
    };

    const validationSchema = Yup.object({
        nome: Yup.string().required('O nome da instituição é obrigatório'),
        site: Yup.string()
            .required('O site é obrigatório')
            .matches(/\./, 'O site deve conter pelo menos um ponto'),
        formaIngresso: Yup.string().required('Forma de Ingresso é obrigatória'),
        notaMec: Yup.number()
            .nullable()
            .typeError('A nota MEC deve ser um número')
            .min(1, 'A nota MEC deve ser no mínimo 1')
            .max(5, 'A nota MEC deve ser no máximo 5')
            .required('A nota MEC é obrigatória'),
        sigla: Yup.string()
            .matches(/^[A-Z]+$/, 'A sigla deve estar em letras maiúsculas')
            .required('A sigla é obrigatória'),
        tipo: Yup.string().required('O tipo de instituição é obrigatório'), // Validação do tipo
        endereco: Yup.object().shape({
            cep: Yup.string()
                .max(8, 'O CEP deve ter no máximo 8 caracteres')
                .required('O CEP é obrigatório'),
            logradouro: Yup.string().required('O logradouro é obrigatório'),
            numero: Yup.string().required('O número é obrigatório'),
            complemento: Yup.string(),
            bairro: Yup.string().required('O bairro é obrigatório'),
            cidade: Yup.string().required('A cidade é obrigatória'),
            estado: Yup.string().required('O estado é obrigatório'),
        }),
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
        const cep = event.target.value.replace(/\D/g, '');
        setFieldValue('endereco.cep', cep);
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const { logradouro, bairro, localidade, uf } = response.data;
                setFieldValue('endereco.logradouro', logradouro);
                setFieldValue('endereco.bairro', bairro);
                setFieldValue('endereco.cidade', localidade);
                setFieldValue('endereco.estado', uf);
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const response = await cadastrarInstituicao(values);
            console.log(values);
            console.log('Instituição cadastrada com sucesso:', response);
            setInstitutionId(response.id);
            navigate('/cursos', { state: { institutionId: response.id } });
        } catch (error) {
            console.log(values);
            console.error('Erro ao cadastrar instituição:', error);
        }
        setSubmitting(false);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 50 }}></Box>
                <Box sx={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Stepper activeStep={0} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ marginTop: 5 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, isSubmitting }) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        maxWidth: 600,
                                        margin: 'auto',
                                    }}
                                >
                                    <Form>
                                        <Box sx={{ '& .MuiTextField-root': { m: 1 } }}>
                                            <Paper sx={{ marginTop: '30px', marginBottom: '30px', backgroundColor: 'white', paddingBottom: 3 }}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    sx={{
                                                        maxWidth: 500,
                                                        paddingLeft: '60px',
                                                        paddingTop: '20px',
                                                        paddingBottom: '30px',
                                                    }}
                                                >
                                                    <Typography variant="h6" sx={{
                                                        fontSize: '25px', textAlign: 'left',
                                                        fontFamily: 'Roboto, monospace',
                                                        color: '#757575',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        Dados Gerais
                                                    </Typography>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="nome"
                                                            label="Nome da Instituição"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="site"
                                                            label="Site"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="formaIngresso"
                                                            label="Forma de Ingresso "
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                            sx={{ marginBottom: 80 }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="sigla"
                                                            label="Sigla"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="notaMec"
                                                            type="number"
                                                            label="Nota MEC"
                                                            variant="standard"
                                                            inputProps={{ min: 1, max: 5 }}
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    {/* Novo Campo - Tipo de Instituição */}
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={Select}
                                                            name="tipo"
                                                            fullWidth
                                                            variant="standard"
                                                            required
                                                            size="large"
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Tipo de Instituição' }}
                                                            sx={{ color: 'grey', marginLeft: '3px'}}
                                                        >
                                                            <MenuItem value="" disabled>
                                                                Selecione o Tipo de Instituição*
                                                            </MenuItem>
                                                            <MenuItem value="SUPERIOR"> Ensino Superior</MenuItem>
                                                            <MenuItem value="TECNICO"> Ensino Técnico </MenuItem>
                                                            <MenuItem value="AMBOS"> Ensino Técnico e Superior </MenuItem>
                                                        </Field>
                                                    </Grid>

                                                </Grid>
                                            </Paper>
                                        </Box>

                                        <Box sx={{ '& .MuiTextField-root': { m: 1 } }}>
                                            <Paper sx={{ marginTop: '20px', marginBottom: '20px', backgroundColor: 'white', paddingBottom: 3 }}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    sx={{
                                                        maxWidth: 500,
                                                        paddingLeft: '60px',
                                                        paddingTop: '20px',
                                                        paddingBottom: '30px',
                                                    }}
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontSize: '25px', textAlign: 'left',
                                                                fontFamily: 'Roboto, monospace',
                                                                color: '#757575',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            Endereço
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.cep"
                                                            label="CEP"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                            onChange={(
                                                                event: React.ChangeEvent<HTMLInputElement>
                                                            ) => handleCepChange(event, setFieldValue)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.numero"
                                                            label="Número"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.logradouro"
                                                            label="Logradouro"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.complemento"
                                                            label="Complemento"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.bairro"
                                                            label="Bairro"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.cidade"
                                                            label="Cidade"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="endereco.estado"
                                                            label="Estado"
                                                            variant="standard"
                                                            fullWidth
                                                            size="small"
                                                            required
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <Grid
                                                container
                                                spacing={2}
                                                justifyContent="space-between"
                                                sx={{ marginBottom: 10 }}
                                            >
                                                <Grid
                                                    item
                                                    xs={6}
                                                    display="flex"
                                                    justifyContent="flex-start"
                                                >
                                                    <Button
                                                        type="button"
                                                        variant="outlined"
                                                        onClick={() => navigate('/admin')}
                                                        sx={{
                                                            fontSize: '17px',
                                                            fontFamily: 'Roboto, monospace',
                                                            color: 'white',
                                                            backgroundColor: '#185D8E',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Voltar
                                                    </Button>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    display="flex"
                                                    justifyContent="flex-end"
                                                >
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        variant="contained"
                                                        sx={{
                                                            fontSize: '17px',
                                                            fontFamily: 'Roboto, monospace',
                                                            color: 'white',
                                                            backgroundColor: '#185D8E',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        Avançar
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Form>
                                </Box>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default CadastroInstituicao;
