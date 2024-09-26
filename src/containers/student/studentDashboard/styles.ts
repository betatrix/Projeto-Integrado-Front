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
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
    },

});

export const cardTitle2Style: SxProps<Theme> =(theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#0B2A40',
    // fontWeight: 'bold',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '0.7rem',
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
    display: 'inline-block', // Faz o fundo colorido se ajustar ao tamanho do conteúdo
    padding: '5px 10px',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'right',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'right',
        fontSize: '0.8rem',
    },
});

export const contentPerfilStyle = (theme:Theme) => ({
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    textAlign: 'center',
    marginTop: '0.5rem',
    fontSize: '1.6rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        fontSize: '0.8rem',
    },

});

export const contentResultStyle: SxProps<Theme> =(theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Roboto, monospace',
    color: '#0B2A40',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.3rem',
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
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#A4BFD2',
    [theme.breakpoints.down('sm')]: {
        backgroundColor: '#A4BFD2',
        width: '17rem',
        height: '10rem',
    },
    [theme.breakpoints.down('md')]: {
        backgroundColor: '#A4BFD2',
        width: '17rem',
        height: '10rem',
    },
});

export const boxResultStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#A4BFD2',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '25rem',
    height: '16rem',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '12rem',
        height: '10rem',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '12rem',
        height: '10rem',
    },
});

export const pieChartStyles: SxProps<Theme> = (theme) => ({
    width: 400,
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: 250, // Largura menor em telas pequenas
        height: 150,
    },
    [theme.breakpoints.down('md')]: {
        width: 250, // Largura menor em telas pequenas
        height: 150,
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
    margin: '0.38rem',
    [theme.breakpoints.down('sm')]: {
        width: '10.5rem',
        height: '4.7rem',
    },
    [theme.breakpoints.down('md')]: {
        width: '10.5rem',
        height: '4.7rem',
    },
});

export const paperImgStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#D7E6F1',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '9rem',
    height: '14.5rem',
    marginLeft: '0.3rem',
    // marginRight:'0.5rem',
    // marginTop: '0.5rem',
    [theme.breakpoints.down('sm')]: {
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width: '5.5rem',
        height: '10rem',
    },
    [theme.breakpoints.down('md')]: {
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        width: '5.5rem',
        height: '10rem',
    },
});

export const paperTestStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#6B9ABC',
    gap:'1rem',
    padding: '2%',
    flexDirection: 'column',
    display:'flex',
    textAlign: 'left',
    alignItems: 'left',
    justifyContent: 'left',
    width: '70rem',
    height: '15rem',
    marginBottom: '0.5rem',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
        width: '17rem',
        height: '8rem',
        gap: '0.5rem'
    },
    [theme.breakpoints.down('md')]: {
        width: '17rem',
        height: '8rem',
        gap: '0.5rem'
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
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '17rem',
        height: '8rem',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '17rem',
        height: '8rem',
    },
});

export const TestButton: SxProps<Theme> = (theme) => ({
    mr: 2,
    fontFamily: 'Roboto, monospace',
    fontSize: '1.3rem',
    padding: '0.4rem 3rem',
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
    marginTop: '1rem',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        backgroundColor: '#C0E3FF',
        borderColor: '#185D8E',
        borderWidth: '2px',
        transform: 'scale(1.02)',
    },

    [theme.breakpoints.down('md')]: {
        padding: '0.3rem 2rem', // Padding ajustado para médio
        fontSize: '0.5rem',
        minWidth: '180px',
        marginTop: '0.3rem',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.3rem 1rem', // Padding menor para telas pequenas
        fontSize: '0.5rem', // Tamanho de fonte menor
        minWidth: '100px', // Largura mínima reduzida para telas pequenas
        marginTop: '0.3rem',
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
