import React from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { StudentRegisterForm } from '../../types/studentTypes';
import { cadastroEstudante } from '../../services/studentService';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
    Global,
    LoginContainer,
    FormContainer,
    CustomField,
    CustomButton,
    CustomInputLabel,
    Header,
    SubText,
    CustomLink,
    BackButton
} from './styles';

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
    senha: Yup.string().required('Senha é obrigatória'),
    dataNascimento: Yup.string().required('Data de nascimento é obrigatória'),
    celular: Yup.string().required('Celular é obrigatório'),
    nivelEscolar: Yup.string().required('Nível de escolaridade é obrigatório'),
});
  
export const Login = () => {
    const navigate = useNavigate();
    
    const [loading, setLoading] = React.useState(false);
    const handleNavigateForward = () => navigate('/login');
  
    const handleSubmit = async (values: StudentRegisterForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {  
        try {
            setLoading(true);
            const response = await cadastroEstudante(values);
            console.log('Estudante cadastrado com sucesso:', response);
            handleNavigateForward();
        } catch (error) {
            setLoading(false);
            console.error('Erro ao cadastrar estudante:', error);
        }
        setSubmitting(false);
    };
  

    return (
        <>
            <Global />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
            </style>
            <BackButton startIcon={<ArrowBackIcon />}>Voltar</BackButton>
            <LoginContainer>
                <Header variant="h4">É novo? Cadastre-se aqui.</Header>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting, setFieldValue }) => (
                        <FormContainer as={Form}>
                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="nome">Nome</CustomInputLabel>
                                <Field as={CustomField} id="nome" name="nome" type="text" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="email">E-mail</CustomInputLabel>
                                <Field as={CustomField} id="email" name="email" type="email" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="dataNascimento" shrink>Data de nascimento</CustomInputLabel>
                                <Field as={CustomField} id="dataNascimento" name="dataNascimento" type="date" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="celular">Celular</CustomInputLabel>
                                <Field as={CustomField} id="celular" name="celular" type="tel" />
                            </FormControl>

                            <FormControl variant="filled" style={{ gridColumn: 'span 2' }}>
                                <Autocomplete
                                    disablePortal
                                    id="nivelEscolar"
                                    options={nivelEducacao}
                                    getOptionLabel={(option) => option.label}
                                    onChange={(event, value) => setFieldValue('nivelEscolar', value ? value.value : '')}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Nível de escolaridade" variant="filled" />
                                    )}
                                />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="senha">Senha</CustomInputLabel>
                                <Field as={CustomField} id="senha" name="senha" type="password" />
                            </FormControl>

                            <FormControl variant="filled">
                                <CustomInputLabel htmlFor="confirmarSenha">Confirme sua senha</CustomInputLabel>
                                <Field as={CustomField} id="confirmarSenha" name="confirmarSenha" type="password" />
                            </FormControl>

                            <CustomButton variant="contained" size="large" type="submit" disabled={isSubmitting} style={{ gridColumn: 'span 2' }}>
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar'}
                            </CustomButton>

                            <SubText variant="body1" style={{ gridColumn: 'span 2' }}>
                        Já possuí uma conta? Faça o<CustomLink to={'/login'}> login!</CustomLink>
                            </SubText>
                        </FormContainer>
                    )}
                </Formik>
            </LoginContainer>
        </>
    );
};

export default Login;
