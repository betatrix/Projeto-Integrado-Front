import styled, { createGlobalStyle } from 'styled-components';
import { Typography, Box } from '@mui/material';

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
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 0 10px; /* espaçamento entre os cards */
  text-align: center;
  height: 350px;
  width: 150px; /* Defina a largura dos cards */
  box-sizing: border-box;
`;

export const CarouselContainer = styled(Box)`
  width: 80%; /* Ajuste a largura conforme necessário */
  margin: 0 auto; /* Centraliza o contêiner */
  padding: 20px;
  overflow: hidden;
`;