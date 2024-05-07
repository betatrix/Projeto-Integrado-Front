// import styled from 'styled-components';

// export const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 300px; // Note que 'gap' em styled-components precisa ser especificado com unidades, como 'px'
//   max-width: 400px;
//   margin: auto;
// `;


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
