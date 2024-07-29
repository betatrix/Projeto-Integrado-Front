import { Box, IconButton, SxProps, TextField, Theme } from '@mui/material';
import styled, { keyframes } from 'styled-components';
//import { Button } from '@mui/material';
import pageFour from '../../../assets/img/pageFour.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

// Style Index
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${pageFour})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...globalBoxStyles(theme),
});

export const paperStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: 'white',
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: '20rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

// export const SquareButton = styled(Button)`
//     width: 17.5rem;  // 350px converted to rem and reduced to 80%
//     height: 17.5rem;  // 350px converted to rem and reduced to 80%
//     background-color: #ffffff;
//     border: 0.1rem solid #5479f7;  // 2px converted to rem and reduced to 80%
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     border-radius: 1rem;  // 20px converted to rem and reduced to 80%
//     transition: transform 0.2s;

//     &:hover {
//         transform: scale(1.05);
//         background-color: #e6e6e6;
//     }
// `;

export const TextButton = styled.span`
    font-size: 1.2rem;
    color: #1b1f27;
    margin-bottom: 0.5rem;  // 10px converted to rem and reduced to 80%
    text-align: center;
`;

// export const CardContentBox = styled.div`
//     width: 100%;
//     margin-top: 0.5rem;  // 10px converted to rem and reduced to 80%
// `;

export const TestButton: SxProps<Theme> = (theme) => ({
    background: 'linear-gradient(90deg, #040410, #302EB7)',
    borderRadius: '1rem', // 20px converted to rem and reduced to 80%
    padding: '0.75rem 2.5rem', // 15px 50px converted to rem and reduced to 80%
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
        background: 'linear-gradient(90deg, #302EB7, #040410)',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

// Style Announcement
const slide = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

export const AnnouncementBarContainer = styled(Box)`
    width: 100%;
    background-color: #ff9800;
    color: #fff;
    text-align: center;
    padding: 0.5rem 0;  // 10px converted to rem and reduced to 80%
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export const SlidingImage = styled.div`
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
    animation: ${slide} 10s linear infinite;
`;

export const StyledImage = styled.img`
    max-width: none;
    max-height: 3.5rem;  // 70px converted to rem and reduced to 80%
    width: auto;
    height: auto;
    display: block;
`;

export const CloseButton = styled(IconButton)`
    position: absolute;
    right: 15rem;  // 300px converted to rem and reduced to 80%
    bottom: 1.25rem;  // 25px converted to rem and reduced to 80%
`;

// Style SearchInstitution

export const StyledBox = styled(Box)`
    margin-bottom: 3rem;  // 60px converted to rem and reduced to 80%
    display: flex;
    flex-direction: column;
    gap: 0.8rem;  // 16px converted to rem and reduced to 80%
    max-width: 35rem;  // 700px converted to rem and reduced to 80%
    margin: auto;
    margin-top: 1.6rem;  // 32px converted to rem and reduced to 80%
`;

export const StyledTypography = styled(Box)`
    margin-bottom: 0.8rem;  // 16px converted to rem and reduced to 80%
    text-align: center;
`;

export const SearchBox = styled(Box)`
    display: flex;
    justify-content: center;
`;

export const StyledTextField = styled(TextField)`
    width: 100%;
`;

export const ListBox = styled(Box)`
    padding-top: 0.4rem;  // 8px converted to rem and reduced to 80%
`;

export const StyledModal = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 1.2rem;  // 24px converted to rem and reduced to 80%
    padding: 1.6rem;  // 32px converted to rem and reduced to 80%
    width: 80%;
    max-width: 30rem;  // 600px converted to rem and reduced to 80%
`;

export const DetailTypography = styled(Box)`
    margin-top: 0.8rem;  // 16px converted to rem and reduced to 80%
    text-align: center;
    padding-left: 0.8rem;  // 16px converted to rem and reduced to 80%
`;

export const GridContainer = styled(Box)`
    margin-top: 0.8rem;  // 16px converted to rem and reduced to 80%
    display: flex;
    flex-direction: column;
    gap: 0.8rem;  // 16px converted to rem and reduced to 80%
`;
