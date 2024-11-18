import styled, { createGlobalStyle } from 'styled-components';
import { LinearProgress, Button, Typography, SxProps, Theme} from '@mui/material';
import vocacionalTestImg from '../../../assets/img/test-background.png';
import { Link } from 'react-router-dom';

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;600&display=swap');

  body, html, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    color: #030140;
    font-weight: 400;
    font-style: normal;
    font-family: 'Exo', sans-serif;
    background-image: url(${vocacionalTestImg});
    background-size: cover; /* Garante que a imagem cubra toda a área */
    background-position: center; /* Centraliza a imagem */
    background-repeat: no-repeat; /* Remove repetições */
    background-attachment: fixed; /* Fixa o background na tela */
  }
`;

export const IntroText = styled(Typography)`
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6); 
  text-align: center;
`;

export const ModalText = styled(Typography)`
  font-size: 10rem;
  color: rgba(0, 0, 0, 0.6); 
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Exo', sans-serif;
  text-align: justify;
`;

export const StyledTypography = styled(Typography)`
  font-family: 'Exo', sans-serif;
  text-align: center;
`;

export const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 650px;
    width: 90%; 
    max-width: 1200px;
    background-color: white;
    border-radius: 20px; 
    padding: 20px; 
    /* box-shadow: 5px 5px 1px #185D8E; */
    margin: auto;
    max-height: 650px;
    margin-top: 7%;
    border: solid #185D8E; 
    position: relative; /* Para usar posição absoluta no filho */
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

export const StyledLinearProgress = styled(LinearProgress)`
    width: 70%;
    
    & .MuiLinearProgress-barColorPrimary {
        background: linear-gradient(90deg, #A4BFD2 0%, #185D8E 100%); /* Cor da barra de progresso */
        height: 20px;
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

export const CustomButton = styled(Button)`
  &.MuiButton-root {
    background: #D9EEFF;
    box-shadow: 5px 5px 0px 1px #B9D4F8;
    border-radius: 10px;
    height: 40px;
    color: #185D8E;
    border: solid;
    font-weight: bold;
    width: 200px;
    padding: 0.7rem 1.05rem;
    margin-top: 10px;

    &:hover {
      background-color: #a7cae3;
      transform: scale(1.1);
    }
  }
`;

export const CourseCustomButton = styled(Button)<{ selected?: boolean }>`
  &.MuiButton-root {
    background: #f7fbff;
    box-shadow: 3px 3px 0px 1px #B9D4F8;
    border-radius: 10px;
    height: 100px;
    color: #185D8E;
    border: solid;
    font-weight: bold;
    width: 200px;
    padding: 0.7rem 1.05rem;
    margin-top: 10px;

    &:hover {
      background-color: #a7cae3;
      transform: scale(1.1);
    }

    ${({ selected }) => selected && `
      background-color: #a7cae3;
      transform: scale(1.1);
    `}
  }
`;
// Background -------------------------------------------------------
const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '90vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#0b2e6a',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

// eslint-disable-next-line react-refresh/only-export-components
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${vocacionalTestImg})`,
    ...globalBoxStyles(theme),
});

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    top: 80px;
    left: 20px;
    left: 5%;
    color: #185D8E;
    padding: 5px;
    padding-left: 10px;
    padding-right: 15px;
    font-weight: 600;
    width: 150px;
    font-size: 18px;
    
    &:hover {
      color: #0B2A40;
      background-color: #D9EEFF !important;
    }
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: #185D8E;
`;