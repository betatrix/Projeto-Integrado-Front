import React from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { StudentRegisterForm } from '../../../types/studentTypes';
import { cadastroEstudante } from '../../../services/studentService';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Box, Button, Typography, Link } from '@mui/material';
import { ErrorMessage } from 'formik';
import vocacionalTestImg from '../../../assets/img/vocacionaTest.png';

const nivelEducacao = [
    { label: 'Ensino Fundamental', value: 'ENSINO_FUNDAMENTAL' },
    { label: 'Ensino Médio', value: 'ENSINO_MEDIO' },
    { label: 'Superior incompleto', value: 'ENSINO_SUPERIOR_INCOMPLETO' },
    { label: 'Superior completo', value: 'ENSINO_SUPERIOR_COMPLETO' },
];

const initialValues: StudentRegisterForm = {
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
    celular: '',
    nivelEscolar: '',
};

const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    senha: Yup.string().required('Senha é obrigatória')
        .min(5, 'A senha deve ter no mínimo 5 caracteres!'),
    confirmarSenha: Yup.string().required('Confirmação de senha é obrigatória')
        .oneOf([Yup.ref('senha'), ''], 'As senhas precisam ser iguais'),
    dataNascimento: Yup.date().required('Data de nascimento é obrigatória')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'Você deve ter pelo menos 14 anos.'),
    celular: Yup.string().required('Celular é obrigatório')
        .max(15, 'O celular deve ter no máximo 15 caracteres!'),
    nivelEscolar: Yup.string().required('Nível de escolaridade é obrigatório'),
});

const formatarCelular = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
};

export const StudentRegister = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const handleNavigateForward = () => navigate('/login');

    const handleSubmit = async (values: StudentRegisterForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await cadastroEstudante(values);
            handleNavigateForward();
        } catch (error) {
            console.error('Erro ao cadastrar estudante:', error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={{
                backgroundImage: `url(${vocacionalTestImg})`,
                minHeight: '90vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#caddff',
            }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    sx={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        color: '#3533cd',
                        '&:hover': {
                            backgroundColor: 'rgba(89,87,230,0.1) !important',
                        }
                    }}
                >
                    <Link href="/pagina-inicial" sx={{ textDecoration: 'none', color: 'inherit' }}>Página inicial</Link>
                </Button>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: '10px' }}>
                        É novo? Cadastre-se aqui.
                    </Typography>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting, setFieldValue, errors, touched }) => (
                            <Box
                                component={Form}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                    gap: '20px',
                                    width: '100%',
                                    maxWidth: '700px',
                                    background: 'white',
                                    padding: '30px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <FormControl variant="filled">
                                    <TextField
                                        label="Nome"
                                        name="nome"
                                        type="text"
                                        variant="filled"
                                        error={touched.nome && Boolean(errors.nome)}
                                    />
                                    <ErrorMessage name="nome" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <TextField
                                        label="E-mail"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                        error={touched.email && Boolean(errors.email)}
                                    />
                                    <ErrorMessage name="email" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <TextField
                                        label="Data de nascimento"
                                        name="dataNascimento"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        variant="filled"
                                        error={touched.dataNascimento && Boolean(errors.dataNascimento)}
                                    />
                                    <ErrorMessage name="dataNascimento" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <TextField
                                        label="Celular"
                                        name="celular"
                                        type="tel"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const formattedValue = formatarCelular(e.target.value);
                                            setFieldValue('celular', formattedValue);
                                        }}
                                        variant="filled"
                                        error={touched.celular && Boolean(errors.celular)}
                                    />
                                    <ErrorMessage name="celular" component="div" />
                                </FormControl>

                                <FormControl variant="filled" sx={{ gridColumn: 'span 2' }}>
                                    <Autocomplete
                                        disablePortal
                                        id="nivelEscolar"
                                        options={nivelEducacao}
                                        getOptionLabel={(option) => option.label}
                                        onChange={(_, value) => setFieldValue('nivelEscolar', value ? value.value : '')}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Nível de escolaridade" variant="filled" />
                                        )}
                                    />
                                    <ErrorMessage name="nivelEscolar" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <TextField
                                        label="Senha"
                                        name="senha"
                                        type="password"
                                        variant="filled"
                                        error={touched.senha && Boolean(errors.senha)}
                                    />
                                    <ErrorMessage name="senha" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <TextField
                                        label="Confirme sua senha"
                                        name="confirmarSenha"
                                        type="password"
                                        variant="filled"
                                    />
                                    <ErrorMessage name="confirmarSenha" component="div" />
                                </FormControl>

                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    disabled={isSubmitting}
                                    sx={{
                                        gridColumn: 'span 2',
                                        backgroundColor: '#3533cd',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#101840',
                                        },
                                        padding: '10px 0',
                                        borderRadius: '10px',
                                    }}
                                >
                                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                                </Button>

                                <Typography sx={{ gridColumn: 'span 2', textAlign: 'center', color: '#474d66' }}>
                                    Já possui uma conta? Faça o <Link href="/login">login!</Link>
                                </Typography>
                            </Box>
                        )}
                    </Formik>
                </Box>
            </Box>
        </>
    );
};

export default StudentRegister;
