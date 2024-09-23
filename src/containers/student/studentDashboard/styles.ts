import { Box, SxProps, TextField, Theme } from '@mui/material';
import styled from 'styled-components';
//import { Button } from '@mui/material';
import banner from '../../../assets/img/banner.png';

// const globalBoxStyles: SxProps<Theme> = (theme) => ({
//     minHeight: '100vh',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundColor: '#caddff',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     paddingLeft: '10%',
//     paddingRight: '10%',
//     [theme.breakpoints.down('sm')]: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         backgroundAttachment: 'local',
//         paddingLeft: '0px',
//         paddingRight: '0px',
//     },
//     [theme.breakpoints.down('md')]: {
//         flexDirection: 'column',
//         alignItems: 'center',
//         backgroundAttachment: 'local',
//         paddingLeft: '0px',
//         paddingRight: '0px',
//     },
// });

// Style Index
// export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
//     // backgroundImage: `url(${pageFour})`,
//     // backgroundImage: `url(${pageDashboard}), linear-gradient(to bottom,  #99b9ff 50%, #caddff 0%, #caddff 50%)`,
//     backgroundColor: '#caddff',
//     width: '100%',
//     // height: '10rem',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...globalBoxStyles(theme),
// });

export const gridContainerStyles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    // marginLeft: '1rem',
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
    // marginLeft:'0.9rem',
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

export const gridItem2Styles: SxProps<Theme> = (theme) => ({
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    // marginLeft:'10rem',
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

export const cardTitleStyle: SxProps<Theme> =(theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const cardTitle2Style: SxProps<Theme> =(theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: 'black',
    // fontWeight: 'bold',
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const titleResultStyle: SxProps<Theme> =(theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const titlePerfilStyle: SxProps<Theme> =(theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
    // marginLeft: '0.9rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const contentStyle: SxProps<Theme> =(theme) => ({
    textAlign: 'right',
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '0.5rem',
    borderRadius: '8px', // cantos arredondados
    backgroundColor: '#E3EDF4',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
});

export const content0Style: SxProps<Theme> =(theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    textAlign: 'center',
    marginTop: '0.5rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const paperResultStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#A4BFD2',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '25rem',
    height: '16rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '12rem',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '12rem',
    },
});

export const paperPerfisStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    backgroundColor: '#D7E6F1',
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '17rem',
    height: '7rem',
    margin: '0.5rem',
    [theme.breakpoints.down('sm')]: {
        width: '8.5rem',
        height: '3.5rem',
    },
    [theme.breakpoints.down('md')]: {
        width: '8.5rem',
        height: '3.5rem',
    },
});

export const paperImgStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#D7E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '9rem',
    height: '14.5rem',
    // marginRight:'0.5rem',
    // marginTop: '0.5rem',
    [theme.breakpoints.down('sm')]: {
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width: '4.5rem',
        height: '7rem',
    },
    [theme.breakpoints.down('md')]: {
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width: '4.5rem',
        height: '7rem',
    },
});

export const paperTestStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#6B9ABC',
    gap:'2rem',
    padding: '2%',
    flexDirection: 'column',
    display:'flex',
    textAlign: 'left',
    alignItems: 'left',
    justifyContent: 'left',
    width: '70rem',
    height: '15rem',
    marginBottom: '0.5rem',
    marginTop: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '20rem',
        height: '8rem',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '20rem',
        height: '8rem',
    },
});

export const paperBannerStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${banner})`,
    // backgroundColor: '#99b9ff',
    padding: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '70rem',
    height: '2rem',
    // margin: '0.5rem',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '12rem',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '15rem',
        height: '12rem',
    },
});

export const TestButton: SxProps<Theme> = (theme) => ({
    mr: 2,
    fontFamily: 'Roboto, monospace',
    fontSize: '1.3rem',
    padding: '0.4rem 13.5rem',
    backgroundColor: '#D9EEFF',
    color: '#185D8E',
    fontWeight: 700,
    borderColor: '#185D8E',
    borderRadius: '7px',
    borderWidth: '2px',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    textAlign: 'center',
    maxWidth: '100%',
    minWidth: '250px',
    whiteSpace: 'nowrap',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#C0E3FF',
        borderColor: '#185D8E',
        borderWidth: '2px',
        transform: 'scale(1.02)',
    },
    [theme.breakpoints.down('lg')]: {
        padding: '0.3rem 10rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0.3rem 15rem',
        fontSize: '1rem',
        minWidth: '200px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.3rem 8rem',
        fontSize: '1rem',
        minWidth: '200px',
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
