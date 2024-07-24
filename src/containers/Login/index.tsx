import React, { useContext } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { login } from '../../services/studentService';
import { StudentLoginForm } from '../../types/studentTypes';
import { Formik } from 'formik';
// import { encryptData } from '../../services/encryptionService';
import { AuthContext } from '../../contexts/auth';

const initialValues: StudentLoginForm = {
    login: '',
    senha: '',
};

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);

    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (values: StudentLoginForm, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await login(values);

            if (response.status === 200) {
                console.log('Sucesso ao realizar o login.');
                authContext?.login(response.data.token, response.data.usuario, response.data.estudante, response.data.usuario.role);
                
                // const data = response.data;
                // localStorage.setItem('token', encryptData(data.token));
                // localStorage.setItem('role', encryptData(data.usuario.role));
                // localStorage.setItem('user', encryptData(JSON.stringify(data.usuario)));
                // localStorage.setItem('info', encryptData(JSON.stringify(data.estudante)));               
            } else {
                setError('Email ou senha inválidos');
            }

            window.location.href = '/pagina-inicial-adm';
        } catch (error) {
            setError('Ocorreu um erro ao tentar fazer login');
            console.log(error);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <>
            <Global />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
            </style>
            <Container>
                <BackButton startIcon={<ArrowBackIcon />}>
                    <CustomLink to={'/pagina-inicial'}>Página inicial</CustomLink>
                </BackButton>
                <LoginContainer>
                    <Header variant="h4">Acesse o Vocco!</Header>
                    <Paragraph> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue id diam in scelerisque.</Paragraph>

                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <FormContainer onSubmit={handleSubmit}>
                                <FormControl variant="filled">
                                    <CustomInputLabel htmlFor="login">Digite seu email</CustomInputLabel>
                                    <CustomField
                                        id="login"
                                        type={'email'}
                                        name="login"
                                        value={values.login}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                    />
                                </FormControl>

                                <SubText variant="body2" color="textSecondary">
                                    <CustomLink to={'/recuperar-senha'}>Esqueceu sua senha?</CustomLink>
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
                        Não possuí uma conta?<CustomLink to={'/register'}> Cadastre-se!</CustomLink>
                    </SubText>
                </LoginContainer>
                <RightPanel></RightPanel>
            </Container>
        </>
    );
};

export default Login;
