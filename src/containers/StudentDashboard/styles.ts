import { Box, IconButton, SxProps, TextField, Theme } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { Button } from '@mui/material';
import pageFour from '../../assets/img/pageFour.png';

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

//Style Index
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${pageFour})`,
    ...globalBoxStyles(theme),
});

export const SquareButton = styled(Button)`
    width: 350px;
    height: 350px;
    background-color: #ffffff;
    border: 2px solid #5479f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
        background-color: #e6e6e6;
    }
`;

export const TextButton = styled.span`
    font-size: 1.2rem;
    color: #1b1f27;
    margin-bottom: 10px;
    text-align: center;
`;

export const CardContentBox = styled.div`
    width: 100%;
    margin-top: 10px;
`;

// export const TestButton = styled(Button)`
//     background: linear-gradient(90deg, #040410, #302EB7);
//     border-radius: 20px;
//     padding: 15px 50px;
//     font-size: 1.2rem;
//     font-weight: bold;
//     color: white;
//     text-transform: none;

//     &:hover {
//         background: linear-gradient(90deg, #302EB7, #040410);
//     }
// `;

export const TestButton: SxProps<Theme> = (theme) => ({
    background: 'linear-gradient(90deg, #040410, #302EB7)',
    borderRadius: '20px',
    padding: '15px 50px',
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
//Style Announcement
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
    padding: 10px 0;
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
    max-height: 70px;
    width: auto;
    height: auto;
    display: block;
`;

export const CloseButton = styled(IconButton)`
    position: absolute;
    right: 300px;
    bottom: 25px; 
`;

//Style SearchInstitution

export const StyledBox = styled(Box)`
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 700px;
    margin: auto;
    margin-top: 32px;
`;

export const StyledTypography = styled(Box)`
    margin-bottom: 16px;
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
    padding-top: 8px;
`;

export const StyledModal = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 24px;
    padding: 32px;
    width: 80%;
    max-width: 600px;
`;

export const DetailTypography = styled(Box)`
    margin-top: 16px;
    text-align: center;
    padding-left: 16px;
`;

export const GridContainer = styled(Box)`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
