import React, { useContext, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik } from 'formik';
import {
    Global,
    LoginContainer,
    CustomField,
    CustomButton,
    CustomInputLabel,
    Header,
    Paragraph,
    FormContainer,
    SubText,
    CustomLink,
    Container,
    RightPanel,
    BackButton
} from './styles';
import { AuthContext } from '../../../contexts/auth';
import { encryptData } from '../../../services/encryptionService';
import { loginEstudante } from '../../../services/studentService';
import { LoginForm } from '../../../types/loginTypes';
import { loginAdministrador } from '../../../services/admService';
import { useNavigate } from 'react-router-dom';

const initialValues: LoginForm = {
    login: '',
    senha: '',
};

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (values: LoginForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setError(null);
    
        try {
            const isAdmin = values.login.endsWith('@vocco.com');
            const response = isAdmin ? await loginAdministrador(values) : await loginEstudante(values);

            if (response.status === 200) {
                const role = isAdmin ? 'ADMIN' : 'ESTUDANTE';
    
                authContext?.login(
                    encryptData(response.data.token),
                    encryptData(JSON.stringify(response.data.usuario)),
                    encryptData(role),
                    encryptData(JSON.stringify(response.data.estudante || null)),
                    encryptData(JSON.stringify(response.data.administrador || null))
                );
            
                const redirectUrl = role === "ESTUDANTE" ? '/estudante' : '/admin';
                navigate(redirectUrl);
            } else {
                setError('Email ou senha inválidos!');
            }
        } catch (error) {
            setError('Ocorreu um erro ao tentar fazer login.');
            console.log(error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };    

    return (
        <>
            <Global />
            <Container>
                <BackButton startIcon={<ArrowBackIcon />}>
                    <CustomLink to="/pagina-inicial">Página inicial</CustomLink>
                </BackButton>
                <LoginContainer>
                    <Header variant="h4">Acesse o Vocco!</Header>
                    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue id diam in scelerisque.</Paragraph>

                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <FormContainer onSubmit={handleSubmit}>
                                <FormControl variant="filled">
                                    <CustomInputLabel htmlFor="login">Digite seu email</CustomInputLabel>
                                    <CustomField
                                        id="login"
                                        type="email"
                                        name="login"
                                        value={values.login}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </FormControl>

                                <SubText variant="body2" color="textSecondary">
                                    <CustomLink to="/recuperar-senha">Esqueceu sua senha?</CustomLink>
                                </SubText>

                                <FormControl variant="filled">
                                    <CustomInputLabel htmlFor="senha">Digite sua senha</CustomInputLabel>
                                    <CustomField
                                        id="senha"
                                        type={showPassword ? 'text' : 'password'}
                                        name="senha"
                                        value={values.senha}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <CustomButton variant="contained" size="large" type="submit">
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                                    </CustomButton>
                                </FormControl>
                                
                                {error && <div>{error}</div>}
                            </FormContainer>
                        )}
                    </Formik>

                    <SubText variant="body1">
                        Não possui uma conta?<CustomLink to="/register"> Cadastre-se!</CustomLink>
                    </SubText>
                </LoginContainer>
                <RightPanel />
            </Container>
        </>
    );
};

export default Login;
