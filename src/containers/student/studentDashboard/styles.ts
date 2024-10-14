import { Box, SxProps, TextField, Theme } from '@mui/material';
import styled from 'styled-components';
import banner from '../../../assets/img/banner.png';

export const gridContainerStyles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

export const gridItem1Styles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    [theme.breakpoints.down(1116)]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

export const gridItem2Styles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

export const cardTitleStyle: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.875rem',
    [theme.breakpoints.down('md')]: {
        fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const cardTitle2Style: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#0B2A40',
    fontSize: '1.875rem',
    marginTop: '0.625rem',
    [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
    },
});

export const titleResultStyle: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.875rem',
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        textAlign: 'right',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'right',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
});

export const titlePerfilStyle: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.875rem',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
});

export const contentStyle: SxProps<Theme> = (theme) => ({
    textAlign: 'right',
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginTop: '0.8rem',
    marginRight: '0.5rem',
    borderRadius: '8px',
    backgroundColor: '#E3EDF4',
    display: 'inline-block',
    padding: '6.25px 12.5px',
    [theme.breakpoints.down('md')]: {
        textAlign: 'right',
        fontSize: '0.8rem',
        marginTop: '0.5rem',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'right',
        fontSize: '0.8rem',
        marginTop: '0.5rem',
    },
});

export const IconStyles: SxProps<Theme> = (theme) => ({
    fontSize: '2.5rem',
    paddingTop: '0.8rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '1.5rem',
    },
});

export const contentPerfilStyle = (theme: Theme) => ({
    fontFamily: 'Roboto, monospace',
    fontSize: '2rem',
    paddingTop: '0.8rem',
    color: '#0B2A40',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1rem',
    },
});

export const contentResultStyle: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.625rem',
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1rem',
    },
});

export const paperResultStyles: SxProps<Theme> = (theme) => ({
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#A4BFD2',
    [theme.breakpoints.down('sm')]: {
        backgroundColor: '#A4BFD2',
        width: '18rem',
        height: '11rem',
    },
    [theme.breakpoints.down('md')]: {
        backgroundColor: '#A4BFD2',
        width: '18rem',
        height: '11rem',
    },
});

export const boxResultStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#A4BFD2',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '31.25rem',
    height: '20rem',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '11rem',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '11rem',
    },
});

export const pieChartStyles: SxProps<Theme> = (theme) => ({
    width: 400,
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: 250,
        height: 150,
    },
    [theme.breakpoints.down('md')]: {
        width: 250,
        height: 150,
    },
});

export const paperPerfisStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    backgroundColor: 'rgb(215, 230, 241)',
    boxShadow: 'rgba(10, 41, 81, 0.2) 5px 5px 0px 1.25px',
    border: '3px solid rgb(11, 42, 64)',
    borderRadius: '9px',
    padding: '6.25%',
    display: 'flex',
    flexDirection: 'column',
    width: '21.25rem',
    height: '8.75rem',
    margin: '0.475rem',
    [theme.breakpoints.down('md')]: {
        width: '10.5rem',
        height: '4.7rem',
    },
    [theme.breakpoints.down('sm')]: {
        width: '10.5rem',
        height: '4.7rem',
    },
});

export const paperImgStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: ' rgb(141, 169, 189)',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '11.25rem',
    height: '18.125rem',
    marginLeft: '0.375rem',
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width: '5.5rem',
        height: '10rem',
    },
    [theme.breakpoints.down('sm')]: {
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width: '5.5rem',
        height: '10rem',
    },
});

export const paperTestStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#6B9ABC',
    padding: '2%',
    flexDirection: 'column',
    display:'flex',
    textAlign: 'left',
    alignItems: 'left',
    justifyContent: 'left',
    width: '87.5rem',
    height: '18.75rem',
    marginBottom: '1.25rem',
    marginTop: '3.3rem',
    border: '3px solid #0B2A40',
    [theme.breakpoints.down('md')]: {
        width: '18rem',
        height: '9rem',
        gap: '0.5rem',
        marginBottom: '1rem',
        border: '2px solid #0B2A40',
        '& .your-image-container img': {
            display: 'none'
        }
    },
    [theme.breakpoints.down('sm')]: {
        width: '18rem',
        height: '9rem',
        gap: '0.5rem',
        marginBottom: '1rem',
        border: '2px solid #0B2A40',
        '& .your-image-container img': {
            display: 'none'
        }
    },
});

export const paperBannerStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${banner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '3.25%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '87.5rem',
    height: '2rem',
    marginTop: '2.5rem',
    marginBottom: '3.75rem',
    borderRadius: '8px',
    [theme.breakpoints.down('md')]: {
        width: '18rem',
        height: '4rem',
        marginTop: '1.5rem',
        marginBottom: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        width: '18rem',
        height: '4rem',
        padding: '2%',
        marginTop: '1.5rem',
        marginBottom: '2rem',
    },
});

export const TestButton: SxProps<Theme> = (theme) => ({
    mr: 2,
    fontFamily: 'Roboto, monospace',
    fontSize: '1.625rem',
    padding: '0.5rem 3.75rem',
    backgroundColor: '#D9EEFF',
    color: '#185D8E',
    fontWeight: 700,
    borderColor: '#185D8E',
    borderRadius: '8.75px',
    borderWidth: '2.5px',
    boxShadow: '5px 5px 0px 1.25px rgba(0, 111, 255, 0.2)',
    textAlign: 'center',
    maxWidth: '100%',
    minWidth: '312.5px',
    whiteSpace: 'nowrap',
    marginTop: '1.875rem',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#C0E3FF',
        borderColor: '#185D8E',
        borderWidth: '2.5px',
        transform: 'scale(1.02)',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0.3rem 2rem',
        fontSize: '0.7rem',
        minWidth: '180px',
        marginTop: '0.5rem',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.3rem 1rem',
        fontSize: '0.7rem',
        minWidth: '100px',
        marginTop: '0.5rem',
    },
});

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
