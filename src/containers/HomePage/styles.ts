import { SxProps, Theme } from '@mui/material';
import pageThree from '../../assets/img/pageThree.png';
import pageOne from '../../assets/img/pageOne.png';
import pageTwo from '../../assets/img/pageTwo.png';
import pageFour from '../../assets/img/pageFour.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column', // Ajusta para telas menores
        alignItems: 'center',
        backgroundAttachment: 'local',
    },
});

// Style Index-------------------------------------------------------
export const homePageBoxStyles: SxProps<Theme> = (theme) => ({
    backgroundImage: `url(${pageOne})`,
    ...globalBoxStyles(theme),
});

export const gridIndexContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    marginRight: '90px',
    marginBottom: '110px',
    [theme.breakpoints.down('sm')]: {
        marginRight: '5px',
        marginBottom: '15px',
    },
});

export const gridItemStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    textAlign: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const boxTitleStyles: SxProps<Theme> = (theme) => ({
    mb: '5px',
    mt: '100px',
    ml: '80px',
    [theme.breakpoints.down('sm')]: {
        mt: '50px',
        ml: '20px',
    },
});

export const typographyTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '48px',
    fontWeight: 700,
    color: 'linear-gradient(90deg, #040410, #302EB7)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '36px',
    },
});

export const typographySubtitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '28px',
    fontWeight: 600,
    mb: '20px',
    mt: '10px',
    color: 'linear-gradient(90deg, #040410, #302EB7)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
});

export const boxButtonContainerStyles: SxProps<Theme> = (theme) => ({
    mt: '20px',
    ml: '60px',
    [theme.breakpoints.down('sm')]: {
        ml: '10px',
    },
});

export const buttonStyles: SxProps<Theme> = (theme) => ({
    background: 'linear-gradient(90deg, #040410, #302EB7)',
    borderRadius: '20px',
    padding: '15px 50px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
        background: 'linear-gradient(90deg, #302EB7, #040410)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 30px',
        fontSize: '1rem',
    },
});

// Style About-----------------------------------------------------
export const aboutBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageTwo})`,
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        marginRight: '5px',
        marginBottom: '15px',
    },
});

export const gridItemImageStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '40%',
        maxWidth: '200px',
    },
});

export const imageStyles: React.CSSProperties = {
    width: '80%',
    maxWidth: '400px',
};

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        textAlign: 'center',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    fontSize: '32px',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
});

export const dividerBoxStyles: SxProps<Theme> = (theme) => ({
    width: '800px',
    height: '3px',
    backgroundColor: '#735fe4',
    margin: '10px 0',
    display: 'grid',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    fontSize: '35px',
    marginBottom: '50px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
});

export const typographyAboutSubtitleStyles: SxProps<Theme> = (theme) => ({
    fontSize: '28px',
    fontWeight: 'bold',
    marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
    },
});

export const typographySmallBodyStyles: SxProps<Theme> = (theme) => ({
    fontSize: '35px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
});

// Style FAQ-------------------------------------------------------
export const faqBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageThree})`,
});

export const gridContainerStyles: SxProps<Theme> = (theme) => ({
    height: '50%',
    marginLeft: '8%',
    [theme.breakpoints.down('sm')]: {
        marginLeft: '2%',
    },
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    maxWidth: '1000px',
    width: '100%',
    bgcolor: '#735fe4',
    borderRadius: '10px',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
        padding: '10px',
        borderRadius: '5px',
    },
});

export const listStyles: SxProps<Theme> = (theme) => ({
    maxWidth: '100%',
    bgcolor: 'background.paper',
    background: '#',
    color: 'black',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
        borderRadius: '5px',
    },
});

export const listSubheaderStyles: SxProps<Theme> = (theme) => ({
    background: 'white',
    color: 'black',
    borderRadius: '10px',
    fontSize: '32px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
        borderRadius: '5px',
    },
});

export const listItemIconStyles: SxProps<Theme> = (theme) => ({
    color: 'black',
    [theme.breakpoints.down('sm')]: {
        fontSize: '5rem',
    },
});

export const listItemTextStyles: SxProps<Theme> = (theme) => ({
    fontSize: '32rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20rem',
        borderRadius: '5px',
    },
});

// Style testInf-------------------------------------------------------
// export const testInfBoxStyles: SxProps<Theme> = (theme) => ({
//     ...globalBoxStyles(theme),
//     backgroundImage: `url(${pageFour})`,
// });

// export const TestInfoContent: SxProps<Theme> = (theme) => ({
//     textAlign:'center',
//     [theme.breakpoints.down('sm')]: {
//     },
// });

// export const dividerBoxTestInfStyles: SxProps<Theme> = (theme) => ({
//     width: '400px',
//     height: '3px',
//     backgroundColor: '#735fe4',
//     position:'relative',
//     alignItems: 'center',
//     [theme.breakpoints.down('sm')]: {
//         width: '100%',
//     },
// });

// export const TestInfoTitle: SxProps<Theme> = (theme) => ({
//     textAlign:'center',
//     [theme.breakpoints.down('sm')]: {
//     },
// });

export const testInfBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageFour})`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
});

export const TestInfoContent: SxProps<Theme> = (theme) => ({
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const dividerBoxTestInfStyles: SxProps<Theme> = (theme) => ({
    width: '80%',
    height: '3px',
    backgroundColor: '#735fe4',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
});

export const TestInfoTitle: SxProps<Theme> = (theme) => ({
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});