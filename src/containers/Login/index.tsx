import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import loginImage from '../../assets/welcome-login.svg';
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
    BackButton, 
    Image 
} from './styles';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
    };
    
    return (
        <>
            <Global />
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
            </style>
            <Container>
                <BackButton startIcon={<ArrowBackIcon />}>Voltar</BackButton>
                <LoginContainer>
                    <Header variant="h4">Acesse o Vocco!</Header>
                    <Paragraph> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue id diam in scelerisque.</Paragraph>

                    <FormContainer onSubmit={handleSubmit}>
                        <FormControl variant="filled">
                            <CustomInputLabel htmlFor="email">Digite seu email</CustomInputLabel>
                            <CustomField id="email" type={'email'}/>
                        </FormControl>

                        <SubText variant="body2" color="textSecondary">
                            <CustomLink to={''}>Esqueceu sua senha?</CustomLink>
                        </SubText>

                        <FormControl variant="filled">
                            <CustomInputLabel htmlFor="password">Digite sua senha</CustomInputLabel>
                            <CustomField id="password"
                                type={showPassword ? 'text' : 'password'}
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
                            <CustomButton variant="contained" size="large" type="submit" >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                            </CustomButton>
                        </FormControl>
                    </FormContainer>

                    <SubText variant="body1">
                        Não possuí uma conta?<CustomLink to={'/register'}> Cadastre-se!</CustomLink>
                    </SubText>
                </LoginContainer>
                <RightPanel><Image src={loginImage} /></RightPanel>
            </Container> 
        </>
    );
};

export default Login;