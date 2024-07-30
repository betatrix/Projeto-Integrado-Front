import { Box, IconButton, SxProps, TextField, Theme } from '@mui/material';
import styled, { keyframes } from 'styled-components';
//import { Button } from '@mui/material';
import pageDashboard from '../../../assets/img/pageDashboard.png';

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
    // backgroundImage: `url(${pageFour})`,
    backgroundImage: `url(${pageDashboard})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...globalBoxStyles(theme),
});

export const gridStyles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    backgroundColor:'#99b9ff',
    marginBottom:'4%',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

export const boxStyles: SxProps<Theme> = (theme) => ({
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    maxWidth: '50rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
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

export const TextButton = styled.span`
    font-size: 1.2rem;
    color: #1b1f27;
    margin-bottom: 0.5rem;  
    text-align: center;
`;

export const TestButton: SxProps<Theme> = (theme) => ({
    background: 'linear-gradient(90deg, #040410, #302EB7)',
    borderRadius: '1rem',
    padding: '0.75rem 2.5rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    fontFamily: 'Exo 2',
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
    padding: 0.5rem 0;  
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
    max-height: 3.5rem;  
    width: auto;
    height: auto;
    display: block;
`;

export const CloseButton = styled(IconButton)`
    position: absolute;
    right: 15rem;  
    bottom: 1.25rem;  
`;

// Style SearchInstitution

export const StyledBox = styled(Box)`
    margin-bottom: 3rem;  
    display: flex;
    flex-direction: column;
    gap: 0.8rem;  
    max-width: 35rem;  
    margin: auto;
    margin-top: 1.6rem;  
`;

export const StyledTypography = styled(Box)`
    margin-bottom: 0.8rem;  
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
    padding-top: 0.4rem;  
`;

export const StyledModal = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    box-shadow: 1.2rem;  
    padding: 1.6rem;  
    width: 80%;
    max-width: 30rem;  
`;

export const DetailTypography = styled(Box)`
    margin-top: 0.8rem;  
    text-align: center;
    padding-left: 0.8rem;  
`;

export const GridContainer = styled(Box)`
    margin-top: 0.8rem;  
    display: flex;
    flex-direction: column;
    gap: 0.8rem;  
`;
