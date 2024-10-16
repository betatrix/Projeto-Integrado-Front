import { Alert, Autocomplete,
    Box,
    Button,
    CircularProgress,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Snackbar,
    styled, TextField,
    Typography
} from '@mui/material';
import Footer from '../../../components/homeFooter';
import StudentHeader from '../../../components/studentHeader';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
// import { useTranslation } from 'react-i18next';
import React, { useContext, useRef, useState } from 'react';
import { atualizaEstudante, fotoEstudante } from '../../../services/studentService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import AvatarUserStudent from '../../../components/avatarUser/indexStudent';
import { CameraAltOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { ErrorMessage, Form, Formik } from 'formik';
import { container, customAutocomplete, customField, customInputLabel, formContainer, header, passwordContainer, registerButton, registerContainer } from './styles';
import { StudentUpdateForm } from '../../../types/studentTypes';
import * as yup from 'yup';
import 'yup-phone-lite';

const nivelEducacao = [
    { label: 'Ensino Fundamental', value: 'ENSINO_FUNDAMENTAL' },
    { label: 'Ensino Médio', value: 'ENSINO_MEDIO' },
    { label: 'Superior incompleto', value: 'ENSINO_SUPERIOR_INCOMPLETO' },
    { label: 'Superior completo', value: 'ENSINO_SUPERIOR_COMPLETO' },
];

const validationSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    dataNascimento: yup.date().required('Data de nascimento é obrigatória')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'Você deve ter pelo menos 14 anos.'),
    celular: yup.string().phone('BR', 'Insira um número de celular válido').required('Celular é obrigatório')
        .min(15, 'Insira um número de celular válido'),
    nivelEscolar: yup.string().required('Nível de escolaridade é obrigatório'),
    senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmarSenha: yup.string().when('senha', {
        is: (senha: string | undefined) => Boolean(senha),
        then: (schema) => schema.required('Confirmação de senha é obrigatória').oneOf([yup.ref('senha')], 'As senhas não coincidem'),
        otherwise: (schema) => schema.notRequired()
    }),
});

const formatarCelular = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return value;
};

const PerfilStudent: React.FC = () => {
    // const { t } = useTranslation();

    const authContext = useContext(AuthContext);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => setShowPassword(prev => !prev);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    const handleCloseErrorMessage = () => {
        setShowErrorMessage(false);
    };

    const DrawerHeader = styled('div')(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: '2rem',
    }));

    if (!authContext) {
        return null;
    }

    const studentData = authContext.student ? decryptData(authContext.student) : null;
    const student = studentData ? JSON.parse(studentData) : null;

    const userData = authContext.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    const initialValues: StudentUpdateForm = {
        id: student.id,
        nome: student.nome,
        email: student.email,
        dataNascimento: student.dataNascimento,
        celular: student.celular,
        nivelEscolar: student.nivelEscolar,
        senha: ''
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {return;}

        try {
            const formData = new FormData();
            formData.append('arquivo', selectedFile);

            const response = await fotoEstudante(user.id, formData);

            if (response.status === 200) {
                const newPhotoUrl = response.data.fotoPerfil;
                authContext.updateUserPhoto(newPhotoUrl);
            }
        } catch (error) {
            setShowErrorMessage(true);
        }
    };

    const handleSubmit = async (values: StudentUpdateForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            const updatedValues = {
                ...values,
                senha: values.senha ? values.senha : student.senha,
            };
            const response = await atualizaEstudante(updatedValues);
            authContext.updateStudentInfo(values);
            handleUpload();

            if (response.status === 200) {
                setShowSuccessMessage(true);
            } else {
                setShowErrorMessage(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Box sx={container}>
                <DrawerHeader />
                <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <StudentHeader />
                <Box sx={registerContainer}>
                    <Box>
                        <Box>
                            <AvatarUserStudent
                                sx={{
                                    width: '200px',
                                    height: '200px',
                                    borderRadius: { lg: '10%', md: '10%', sm: '100%'},
                                    overflow: 'hidden',
                                    border: '6px solid #0B2A40',
                                    boxShadow: '3px 3px 0px 1px #6B9ABC',
                                    objectFit: 'cover'
                                }}
                                selectedImage={selectedImage}
                            />
                        </Box>
                        <Button
                            onClick={() => fileInputRef.current?.click()}
                            sx={{
                                color: 'white',
                                backgroundColor: '#185D8E',
                                marginTop: '1rem',
                                padding: '0.7rem 1.05rem',
                                borderRadius: '10px',
                                boxShadow: '3px 3px 0px 1px #6B9ABC',
                                textAlign: 'center',
                                zIndex: 1,
                                '&:hover': {
                                    backgroundColor: '#277FBD',
                                },
                            }}
                        >
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <CameraAltOutlined sx={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                            <Typography sx={{ fontFamily: 'Poppins, monospace', fontSize: '15px'}}>
                                Selecionar foto
                            </Typography>
                        </Button>
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={header}>Edite o seu perfil</Typography>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue, errors, touched, values }) => (
                                <Box component={Form} sx={formContainer} onSubmit={handleSubmit}>
                                    <FormControl variant="filled" >
                                        <InputLabel htmlFor="nome" sx={customInputLabel}>Nome</InputLabel>
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
                                        <InputLabel htmlFor="email" sx={customInputLabel}>E-mail</InputLabel>
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
                                        <InputLabel shrink sx={customInputLabel}>Data de Nascimento</InputLabel>
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
                                        <InputLabel htmlFor="celular" sx={customInputLabel}>Celular</InputLabel>
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

                                    <FormControl variant="filled">
                                        <Autocomplete
                                            disablePortal
                                            id="nivelEscolar"
                                            options={nivelEducacao}
                                            getOptionLabel={(option) => option.label}
                                            value={nivelEducacao.find((option) => option.value === values.nivelEscolar) || null}
                                            onChange={(_, value) => setFieldValue('nivelEscolar', value ? value.value : '')}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Nível de escolaridade" sx={customAutocomplete} />
                                            )}
                                            sx={customField}
                                        />
                                        <ErrorMessage name="nivelEscolar" component="div" />
                                    </FormControl>

                                    <Box sx={passwordContainer}>
                                        <FormControl variant="filled" sx={{ flex: 1 }}>
                                            <InputLabel htmlFor="senha" sx={customInputLabel}>Nova senha</InputLabel>
                                            <FilledInput
                                                id="senha"
                                                type={showPassword ? 'text' : 'password'}
                                                name="senha"
                                                value={values.senha}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.senha && Boolean(errors.senha)}
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
                                        <FormControl variant="filled" sx={{ flex: 1 }}>
                                            <InputLabel htmlFor="confirmarSenha" sx={customInputLabel}>Confirme sua nova senha</InputLabel>
                                            <FilledInput
                                                id="confirmarSenha"
                                                type="password"
                                                name="confirmarSenha"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                sx={customField}
                                            />
                                            <ErrorMessage name="confirmarSenha" component="div" />
                                        </FormControl>
                                    </Box>
                                    <Box
                                        component="div"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                        }}
                                    >
                                        <Button sx={registerButton} type="submit" disabled={isSubmitting}>
                                            {loading ? <CircularProgress size={24} color="inherit" /> : 'SALVAR'}
                                        </Button>
                                    </Box>

                                </Box>
                            )}
                        </Formik>
                    </Box>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={showSuccessMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccessMessage}
                    >
                        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.4rem' }}>
                            Perfil editado com sucesso! :)
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={showErrorMessage}
                        autoHideDuration={6000}
                        onClose={handleCloseErrorMessage}
                    >
                        <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: '1.4rem' }}>
                            Não foi possível editar suas informações :(
                        </Alert>
                    </Snackbar>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default PerfilStudent;
