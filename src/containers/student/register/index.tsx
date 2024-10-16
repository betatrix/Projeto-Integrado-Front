import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { StudentRegisterForm } from '../../../types/studentTypes';
import { cadastroEstudante } from '../../../services/studentService';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import 'yup-phone-lite';
import { Formik, Form } from 'formik';
import { Alert, Box, Button, FilledInput, IconButton, InputAdornment, InputLabel, Snackbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import {
    backButton,
    container,
    customAutocomplete,
    customField,
    customInputLabel,
    customLink,
    formContainer,
    globalStyle,
    header,
    headerRegister,
    paragraph,
    registerButton,
    registerContainer,
    sidePanel,
    subText
} from './styles';
import { useTranslation } from 'react-i18next';
import LanguageMenu from '../../../components/translationButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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

const validationSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    senha: yup.string().required('Senha é obrigatória')
        .min(5, 'A senha deve ter no mínimo 5 caracteres!'),
    confirmarSenha: yup.string().required('Confirmação de senha é obrigatória')
        .oneOf([yup.ref('senha'), ''], 'As senhas precisam ser iguais'),
    dataNascimento: yup.date().required('Data de nascimento é obrigatória')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'Você deve ter pelo menos 14 anos.'),
    celular: yup.string().phone('BR', 'Insira um número de celular válido').required('Celular é obrigatório')
        .min(15, 'Insira um número de celular válido'),
    nivelEscolar: yup.string().required('Nível de escolaridade é obrigatório'),
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
    const { t } = useTranslation();

    const [showErrorMessageMail, setShowErrorMessageMail] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleCloseErrorMessageMail = () => {
        setShowErrorMessageMail(false);
    };

    const handleCloseSuccess = () => {
        setShowSuccessMessage(false);
    };

    const handleNavigateForward = () => navigate('/login');

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (values: StudentRegisterForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const response = await cadastroEstudante(values);

            if (response.status === 200) {
                setShowSuccessMessage(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                handleNavigateForward();
            } else if (response.data === 'Já existe uma conta cadastrada com esse email!') {
                setShowErrorMessageMail(true);
            }
        } catch (error) {
            setShowErrorMessageMail(true);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={globalStyle} />
            <Box sx={container}>
                <Box sx={sidePanel}>
                    {/* <img src="" alt="Imagem ilustrativa" style={{ width: '100%' }} /> */}
                </Box>
                <Box sx={headerRegister}>
                    <Button sx={backButton} startIcon={<ArrowBackIcon />}>
                        <Typography component="a" href="/login" sx={customLink}>
                            {t('backButton')}
                        </Typography>
                    </Button>
                    <LanguageMenu />
                </Box>
                <Box sx={registerContainer}>
                    <Typography variant="h4" sx={header}>
                        {t('studentRegisterTitle')}
                    </Typography>
                    <Typography sx={paragraph}>
                        {t('studentRegisterText1')}
                    </Typography>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, errors, touched, values }) => (
                            <Box component={Form} sx={formContainer} onSubmit={handleSubmit}>
                                <FormControl variant="filled">
                                    <InputLabel htmlFor="nome" sx={customInputLabel}>
                                        {t('studentRegisterField1')}
                                    </InputLabel>
                                    <FilledInput
                                        id="nome"
                                        type="text"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        sx={customField}
                                        error={touched.nome && Boolean(errors.nome)}
                                    />
                                    <ErrorMessage name="nome" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="email" sx={customInputLabel}>
                                        {t('studentRegisterField2')}
                                    </InputLabel>
                                    <FilledInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        sx={customField}
                                        error={touched.email && Boolean(errors.email)}
                                    />
                                    <ErrorMessage name="email" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel shrink sx={customInputLabel}>
                                        {t('studentRegisterField3')}
                                    </InputLabel>
                                    <FilledInput
                                        id="dataNascimento"
                                        type="date"
                                        name="dataNascimento"
                                        value={values.dataNascimento}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        sx={customField}
                                        error={touched.dataNascimento && Boolean(errors.dataNascimento)}
                                    />
                                    <ErrorMessage name="dataNascimento" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="celular" sx={customInputLabel}>
                                        {t('studentRegisterField4')}
                                    </InputLabel>
                                    <FilledInput
                                        id="celular"
                                        type="tel"
                                        name="celular"
                                        value={values.celular}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const formattedValue = formatarCelular(e.target.value);
                                            setFieldValue('celular', formattedValue);
                                        }}
                                        onBlur={handleBlur}
                                        required
                                        sx={customField}
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
                                            <TextField {...params} label={t('studentRegisterField5')} sx={customAutocomplete} />
                                        )}
                                        sx={customField}
                                    />
                                    <ErrorMessage name="nivelEscolar" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="senha" sx={customInputLabel}>
                                        {t('studentRegisterField6')}
                                    </InputLabel>
                                    <FilledInput
                                        id="senha"
                                        type={showPassword ? 'text' : 'password'}
                                        name="senha"
                                        value={values.senha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.senha && Boolean(errors.senha)}
                                        required
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    sx={{color: '#185D8E'}}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        sx={customField}
                                    />
                                    <ErrorMessage name="senha" component="div" />
                                </FormControl>

                                <FormControl variant="filled">
                                    <InputLabel htmlFor="confirmarSenha" sx={customInputLabel}>
                                        {t('studentRegisterField7')}
                                    </InputLabel>
                                    <FilledInput
                                        id="confirmarSenha"
                                        type="password"
                                        name="confirmarSenha"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        sx={customField}
                                    />
                                    <ErrorMessage name="confirmarSenha" component="div" />
                                </FormControl>

                                <FormControl sx={{ gridColumn: 'span 2' }}>
                                    <Box component="button" sx={registerButton} type="submit" disabled={isSubmitting}>
                                        {loading ? <CircularProgress size={24} color="inherit" /> : t('studentRegisterButton')}
                                    </Box>
                                </FormControl>
                            </Box>
                        )}
                    </Formik>
                    <Typography variant="body1" sx={subText}>
                        {t('studentRegisterLogin1')}<Typography sx={customLink} component={RouterLink} to="/login"> {t('studentRegisterLogin2')}</Typography>
                    </Typography>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showSuccessMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccess}
                    >
                        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
                            Conta criada com sucesso!
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={showErrorMessageMail}
                        autoHideDuration={6000}
                        onClose={handleCloseErrorMessageMail}
                    >
                        <Alert onClose={handleCloseErrorMessageMail} severity="error" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }}>
                            Já existe uma conta cadastrada com esse email!
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </>
    );
};

export default StudentRegister;
