import styled, { createGlobalStyle } from 'styled-components';
import { Typography, Box, Button } from '@mui/material';

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo:wght@400;600&display=swap');

  body {
    color: #030140;
    font-weight: 400;
    font-style: normal;
    background-color: #caddff;
    overflow: hidden; /* Esconde o overflow da página */
  }

  .slick-slide {
    margin: 0 10px; /* espaçamento entre os slides */
  }

  .slick-list {
    padding: 0 20px; /* padding ao redor do carrossel */
  }

  /* Estilizando a barra de rolagem */
  ::-webkit-scrollbar {
    width: 12px; /* Largura da barra de rolagem */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Cor do fundo da barra de rolagem */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Cor do polegar da barra de rolagem */
    border-radius: 10px; /* Bordas arredondadas do polegar */
    border: 3px solid #f1f1f1; /* Espaço ao redor do polegar */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Cor do polegar da barra de rolagem quando em hover */
  }
`;

export const TitleResult = styled(Typography)`
  font-size: 50px;
  color: #fff; 
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Exo', sans-serif;
  font-weight: bold;
`;

export const ResultContainerMessage = styled(Box)`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-bottom: 20px;
`;

export const ResultMessage = styled(Typography)`
  font-size: 12px;
  color: #333;
  margin-bottom: 20px;
`;

export const CourseCard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Garante que o botão fique no final */
  background-color: #fff;
  padding: 27px;
  padding-left: 50px;
  padding-right: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 10px; /* espaçamento entre os cards */
  text-align: center;
  height: 350px;
  width: 150px; /* Defina a largura dos cards */
  box-sizing: border-box;

  .MuiTypography-root {
    text-align: justify;
  }

  .MuiList-root {
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: justify;
  }

  .MuiListItem-root {
    padding: 0;
  }
`;

export const CarouselContainer = styled(Box)`
  width: 80%; /* Ajuste a largura conforme necessário */
  margin: 0 auto; /* Centraliza o contêiner */
  padding: 20px;
  overflow: hidden;
`;

export const CustomButton = styled(Button)`
  &.MuiButton-root {
    background: linear-gradient(90deg, rgba(53,51,205,1) 0%, rgba(16,24,64,1) 100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: 38px;
    color: #fff;
    margin-top: 45px;

    &:hover {
      background: linear-gradient(269deg,#3533cd,#101840,#3533cd);
      background-size: 180% 180%;
      animation: gradient-animation 10s ease infinite;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

      @keyframes gradient-animation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    }
  }
  margin-top: auto; /* Empurra o botão para o final */
`;

export const ModalContent = styled(Box)`
  /* Outros estilos... */
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 3px solid #f1f1f1;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;