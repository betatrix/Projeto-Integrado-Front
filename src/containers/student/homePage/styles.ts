import { SxProps, Theme } from '@mui/material';
import pageThree from '../../../assets/img/pageThree.png';
import pageOne from '../../../assets/img/pageOne.png';
import pageTwo from '../../../assets/img/pageTwo.png';
import pageFour from '../../../assets/img/pageFour.png';

const globalBoxStyles: SxProps<Theme> = (theme) => ({
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '200px',
    paddingRight: '200px',
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
    backgroundImage: `url(${pageOne})`,
    ...globalBoxStyles(theme),
});

export const gridIndexContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    textAlign: 'center',
    padding: '0 5%',
    [theme.breakpoints.down('sm')]: {
        marginRight: '0.25rem', // 5px converted to rem and reduced to 80%
        marginBottom: '0.75rem', // 15px converted to rem and reduced to 80%
        textAlign: 'center',
    },
});

export const typographyTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Exo 2',
    fontSize: '2.4rem', // 48px converted to rem and reduced to 80%
    fontWeight: 700,
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem', // 36px converted to rem and reduced to 80%
    },
});

export const typographySubtitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    fontSize: '1.4rem', // 28px converted to rem and reduced to 80%
    // fontWeight: 600,
    mb: '1rem', // 20px converted to rem and reduced to 80%
    mt: '0.5rem', // 10px converted to rem and reduced to 80%
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem', // 20px converted to rem and reduced to 80%
    },
});

export const buttonStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    background: 'linear-gradient(90deg, #040410, #302EB7)',
    borderRadius: '1rem', // 20px converted to rem
    padding: '0.75rem 2.5rem', // 15px 50px converted to rem and reduced to 80%
    fontSize: '1rem', // 1.2rem reduced to 80%
    fontWeight: 'bold',
    color: 'white',
    '&:hover': {
        background: 'linear-gradient(90deg, #302EB7, #040410)',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1.5rem', // 10px 30px converted to rem and reduced to 80%
        fontSize: '0.8rem', // 1rem reduced to 80%
    },
});

// Style About-----------------------------------------------------
export const aboutBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageThree})`,
    backgroundColor: 'white',
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    // marginBottom: '7.5rem', // 150px converted to rem and reduced to 80%
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
    },
});

export const gridItemImageStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: '25rem', // 200px converted to rem and reduced to 80%
    },
});

export const imageStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '25rem', // 600px converted to rem and reduced to 80%
    borderRadius:'1rem',

};

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    // textAlign: 'left',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem', // 20px converted to rem and reduced to 80%
        textAlign: 'center',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    fontFamily:'Exo 2',
    fontSize: '2.3rem',
    [theme.breakpoints.down('sm')]: {
        fontSize: '2rem', // 24px converted to rem and reduced to 80%
        textAlign: 'center',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Poppins',
    color: '#1b1f27',
    textAlign: 'justify',
    fontSize: '1.25rem', // 25px converted to rem and reduced to 80%
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem', // 24px converted to rem and reduced to 80%
    },
});

export const typographySmallBodyStyles: SxProps<Theme> = (theme) => ({
    marginLeft: '2rem', // 40px converted to rem and reduced to 80%
    fontFamily: 'Poppins',
    fontSize: '1.25rem', // 25px converted to rem and reduced to 80%
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem', // 24px converted to rem and reduced to 80%
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

export const gridStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '60%',
    bgcolor: '#99b9ff',
    borderRadius: '0.5rem',
    padding: '0.25rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
        padding: '0px',
        borderRadius: '0.25rem',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0rem',
        borderRadius: '0.25rem',
    },
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: '',
    textAlign: 'center',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '0px',
        borderRadius: '0.25rem',
    },
    [theme.breakpoints.down('md')]: {
        padding: '0rem',
        borderRadius: '0.25rem',
    },
});

export const listStyles: SxProps<Theme> = (theme) => ({
    maxWidth: '70rem',
    bgcolor: 'background.paper',
    color: 'black',
    borderRadius: '0.5rem', // 10px converted to rem
    marginTop: '3rem',
    [theme.breakpoints.down('sm')]: {
        borderRadius: '0.25rem', // 5px converted to rem
    },
});

export const listItemIconStyles: SxProps<Theme> = (theme) => ({
    color: 'black',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem', // 5rem reduced to 80%
    },
});

export const listItemTextStyles: SxProps<Theme> = (theme) => ({
    fontSize: '1.6rem', // 32rem reduced to 80% (assuming 32rem was a mistake and should be 32px)
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem', // 20rem reduced to 80% (assuming 20rem was a mistake and should be 20px)
        borderRadius: '0.25rem', // 5px converted to rem
    },
});

export const FaqTitle: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    textAlign: 'center',
    fontFamily: 'Exo 2',
    fontSize: '2.3rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        fontVariant: 'h6',
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
    fontFamily: 'Poppins',
    color: '#1b1f27',
    textAlign: 'justify',
    fontSize: '1.2rem', // 25px converted to rem and reduced to 80%
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const TestInfoTitle: SxProps<Theme> = (theme) => ({
    color: '#1b1f27',
    fontFamily: 'Exo 2',
    fontSize: '2.3rem',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
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
// export const CardContentStyles: SxProps<Theme> = (theme) => ({
//     whiteSpace: 'normal',
//     padding: '1rem',
//     textAlign: 'center',
//     [theme.breakpoints.down('sm')]: {
//         textAlign: 'center',
//     },
// });

export const GridItemText: SxProps<Theme> = (theme) => ({
    // marginBottom: '5rem', // 100px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemCards: SxProps<Theme> = (theme) => ({
    // marginBottom: '10rem', // 100px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

// Style Parceiros-------------------------------------------------------
export const CarouselTitle: SxProps<Theme> = (theme) => ({
    marginTop: '0.8rem',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#1b1f27',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});