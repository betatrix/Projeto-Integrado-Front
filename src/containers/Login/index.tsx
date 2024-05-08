import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { LoginContainer, Image, LoginWrapper } from '../Login/styles';
import loginImage from '../../assets/welcome-login.svg';
import InitialHeader from '../../components/InitialHeader';
import Footer from '../../components/AdminFooter';

const Login: React.FC = () => {
  return (
    <>
      <InitialHeader />

      <LoginWrapper>
        <div style={{ display: 'flex', flex: 1 }}>
          <Image src={loginImage} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
        <LoginContainer>

          <Typography variant="h4">Login</Typography>

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            placeholder="Digite seu email"
          />
          
          <TextField

            label="Senha"
            variant="outlined"
            type="password"
            placeholder="Digite sua senha"
          />
          <Button variant="contained" color="primary">
            Entrar
          </Button>
          <Typography variant="body2" color="textSecondary">
            Esqueci minha senha
          </Typography>
        </LoginContainer>
      </LoginWrapper>
      <Footer />
    </>
  );
};

export default Login;