import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { LoginContainer } from '../Login/styles'
import { Link } from 'react-router-dom';
import loginImage from '../../assets/welcome-login.svg'

const Login: React.FC = () => {
  return (

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

      <Link to="/dasboard">

        <Button variant="contained" color="primary">
            Entrar
        </Button>

      </Link>

      <Typography variant="body2" color="textSecondary">
        Esqueci minha senha
      </Typography>
      
    </LoginContainer>
  );
};

export default Login;
