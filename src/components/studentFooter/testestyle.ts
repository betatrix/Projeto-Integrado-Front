import styled from 'styled-components';

export const FooterStyle = styled('div')(() => ({
    backgroundColor: '#333',
    color: '#fff',
    width: '100%',
    // position: 'absolute', // Mantém o rodapé fixo na parte inferior da tela
    bottom: 0, // Alinha o rodapé no final da tela
    left: 0,
    padding: '1rem',
    textAlign: 'center',
}));