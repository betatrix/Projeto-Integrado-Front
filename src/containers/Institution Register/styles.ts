import styled from 'styled-components';
import { TextField as MuiTextField } from '@mui/material';

const StyledTextField = styled(MuiTextField)`
  & .MuiInputBase-root {
    height: 40px; // Reduzindo a altura dos campos
    font-size: 0.875rem; // Fonte menor se necessário
  }

  & .MuiOutlinedInput-input {
    padding: 8px 14px; // Padding reduzido para diminuir o tamanho total
  }

  & .MuiOutlinedInput-root {
    margin: 8px 0; // Adicionando margem vertical para separar os campos
  }
`;
