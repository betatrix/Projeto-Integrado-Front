import { Container, Typography, ListItem, Box, Button } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

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
  max-width: 100%; 
  padding-left: 0; 
  padding-right: 0; 
`;

export const CourseCard = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #F6F6F6;
  padding: 27px;
  padding-left: 35px;
  padding-right: 40px;
  border-radius: 23px;
  box-shadow: 10px 10px 1px rgba(172, 200, 220, 0.5);
  text-align: center;
  height: 560px;
  width: 100%;
  max-width: 400px;
`;

// TITLES ****************************************************************************************************
export const PageTile = styled(Typography)`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: bolder;
  color: #0B2A40;
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
  font-size: 18px;
`;

export const DetailsResult = styled(Typography)`
  margin-bottom: 7px;
  color: rgba(0, 0, 0, 0.7);
`;

export const CareerListItem = styled(ListItem)`
  color: rgba(0, 0, 0, 0.5);
  margin-left: 15px;
`;

export const BackButton = styled(Button)`
  &.MuiButton-root {
    position: absolute;
    top: 90px;
    left: 5%;
    color: #0B2A40;
    padding: 10px;
    padding-left: 25px;
    padding-right: 25px;
    font-weight: bold;
    
    &:hover {
      background-color: rgba(89,87,230,0.1) !important;
    }
  }
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: #0B2A40;
`;

// SCROLLBAR

export const ScrollableList = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #185D8E;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e2dddd;
    border-radius: 4px;
  }
`;

// MODAL
export const ModalContent = styled(Box)`
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 8px;
    
  }

  &::-webkit-scrollbar-thumb {
    background-color: #185D8E;
    border-radius: 23px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e2dddd;
    border-radius: 23px;
    width: 10px;
    max-height: 200px;
  }
`;
