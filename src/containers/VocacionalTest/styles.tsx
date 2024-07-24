import styled, { createGlobalStyle } from 'styled-components';
import { LinearProgress, Button, Typography } from '@mui/material';

export const Global = createGlobalStyle`
  body {
    color: rgba(16,24,64,1);
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
  }
`;

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70vh;
`;

export const ButtonGroup = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 300px;
`;

export const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    margin-top: 30px;
    margin-bottom: 15px;
`;

export const IntroText = styled(Typography)`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6); 
  margin-bottom: 20px;
  text-align: center;
`;

export const StyledLinearProgress = styled(LinearProgress)`
    width: 70%;
    margin-bottom: 70px;
    
    & .MuiLinearProgress-barColorPrimary {
        background: linear-gradient(90deg, #312ef4 0%, #0f1c5c 100%); /* Cor da barra de progresso */
        height: 20px; /* Ajuste a altura conforme necessário */
    }
    
    &.MuiLinearProgress-colorPrimary {
        background-color: #d3d3d3; /* Cor de fundo da barra */
    }
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #004281 0%, #0f1c5c 100%);
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    /* background: linear-gradient(90deg, #0f1c5c 0%, #312ef4 100%); */
    transform: translateY(-2px);
  }

  &:active {
    background: linear-gradient(90deg, #0a1350 0%, #004281 100%);
    transform: translateY(0);
  }

  &:disabled {
    background: #d3d3d3;
    color: #a0a0a0;
  }
`;