import { SxProps, Theme } from '@mui/material';
import pageTwo from '../../../assets/img/pageTwo.png';
import pageFour from '../../../assets/img/pageFour.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#F3F3F3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '5rem',
    paddingRight: '5rem',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundAttachment: 'local',
        paddingLeft: '0px',
        paddingRight: '0px',
    },
});

// Style Index-------------------------------------------------------
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    //TODO(beatriz.andrade): adicionar backgorund
    ...globalBoxStyles(theme),
});

export const gridIndexContainerStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    textAlign: 'left',
    padding: '15px',
    marginTop: '10rem',
    [theme.breakpoints.down('sm')]: {
        marginTop: '4rem',
        textAlign: 'center',
        padding: '10px',
        height: '100%',
    },
});

export const typographyTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,  
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.6rem',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.6rem',
    },
});

export const typographySubtitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300, 
    fontSize: '1.4rem',
    mb: '1rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        textAlign: 'center',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.1rem',
    },
});

export const buttonStyles: SxProps<Theme> = (theme) => ({
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


// Style About-----------------------------------------------------
export const aboutBoxStyles: SxProps<Theme> = (theme) => ({
    //TODO(beatriz.andrade): adicionar backgorund
    ...globalBoxStyles(theme),
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
    },
});

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 300, 
    fontSize: '1.4rem',
    mb: '1rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        margin: '14px',
        fontSize: '1rem',
        textAlign: 'left',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1rem',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,  
    fontSize: '2.4rem',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.4rem',
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: '1.8rem',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    paddingTop: '10px',
    textAlign: 'justify',
    fontSize: '1.25rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

// Style FAQ-------------------------------------------------------
export const faqBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageFour})`,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingLeft:'1rem',
        paddingRight: '1rem',
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        paddingLeft:'1rem',
        paddingRight: '1rem',
    },
});

export const listStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    marginTop: '0.4rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem',
    },
});

export const listItemIconStyles: SxProps<Theme> = (theme) => ({
    color: 'black',
    fontSize: '1.25rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const listItemTextStyles: SxProps<Theme> = (theme) => ({
    fontSize: '1.2rem',
    fontFamily: 'Poppins, sans-serif',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
});

export const FaqTitle: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '2.3rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
    },
});

// Style testInf-------------------------------------------------------

export const testInfBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageTwo})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

export const TestInfoContent: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins, sans-serif',
    color: '#1b1f27',
    textAlign: 'justify',
    fontSize: '1.2rem',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '5%',
    },
});

export const TestInfoTitle: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '2.3rem',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontSize: '1.8rem',
    },
});

export const BoxCardHollandStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: '#99b9ff',
    borderRadius:'0.5rem',
    paddingTop:'2rem',
    paddingBottom: '2rem',
    display: 'flex',
    gap: '0.5rem',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const CardStyle: SxProps<Theme> = (theme) => ({
    flex: '0 0 auto',
    transition: 'transform 0.3s ease',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemText: SxProps<Theme> = (theme) => ({
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemCards: SxProps<Theme> = (theme) => ({
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

// Style Parceiros-------------------------------------------------------
export const BoxCarouselStyles: SxProps<Theme> = (theme) => ({
    backgroundColor: 'white',
    maxWidth: '100%',
    border: '3px solid #185D8E',
    marginTop: '7rem',
    borderRadius: '2rem',
    boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
    padding: '1.5rem',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '90%',
        marginTop: '4rem',
        padding: '0.1rem',
    },
    [theme.breakpoints.down('md')]: {
        maxWidth: '90%',
        padding: '0.1rem',
    },
    [theme.breakpoints.down('lg')]: {
        marginTop: '4rem',
        padding: '0.1rem',
    },
    [theme.breakpoints.up('xl')]: {
        marginTop: '4rem',
        padding: '0.1rem',
    },
});


export const CarouselTitle: SxProps<Theme> = (theme) => ({
    marginTop: '1rem',
    textAlign: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    color: '#185D8E',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});