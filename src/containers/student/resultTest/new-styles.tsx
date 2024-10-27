import { Container, Typography, ListItem, Box } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

  body {
    background-color: #D9EEFF;
    font-family: 'Inter', sans-serif;
  }
`;

export const ResultContainer = styled(Container)`
  margin-top: 5%;
  flex-direction: column;
  align-items: center;
  max-width: 100%; /* Garante que não tenha limite de largura */
  padding-left: 0; /* Remove o padding lateral */
  padding-right: 0; /* Remove o padding lateral */
`;

// export const StyledCard = styled(Card)`
//   width: 100%;
//   max-width: 1000px; /* Aumentando a largura máxima */
//   margin: 20px; /* Ajustando o espaçamento */
//   background-color: #ffffff;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease-in-out;

//   /* &:hover {
//     transform: scale(1.05); /* Deixe a opção de hover ativa, se desejar */
// `;

export const CourseCard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Garante que o botão fique no final */
  background-color: #F6F6F6;
  padding: 27px;
  padding-left: 35px;
  padding-right: 40px;
  border-radius: 23px;
  box-shadow: 10px 10px 1px rgba(172, 200, 220, 0.5);
  text-align: center;
  height: 580px;
  width: 100%; /* Defina a largura dos cards */
  max-width: 420px;
`;

// TITLES ****************************************************************************************************
export const PageTile = styled(Typography)`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: bolder;
  color: #185D8E;
  margin-bottom: 20px;
`;

export const PerfilTitle = styled(Typography)`
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 7px;
`;

export const CourseTitle = styled(Typography)`
  margin-bottom: 17px;
  text-align: center;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  font-size: 18px; /* Ajustando o tamanho da fonte */
`;

export const DetailsResult = styled(Typography)`
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.7);
`;

export const CareerListItem = styled(ListItem)`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 15px;
`;
