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
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
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
    textAlign: 'center',
    padding: '0 5%',
    [theme.breakpoints.down('sm')]: {
        marginRight: '0.25rem', // 5px converted to rem and reduced to 80%
        marginBottom: '0.75rem', // 15px converted to rem and reduced to 80%
        textAlign: 'center',
    },
});

export const typographyTitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '2.4rem', // 48px converted to rem and reduced to 80%
    fontWeight: 700,
    color: 'linear-gradient(90deg, #040410, #302EB7)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem', // 36px converted to rem and reduced to 80%
    },
});

export const typographySubtitleStyles: SxProps<Theme> = (theme) => ({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.4rem', // 28px converted to rem and reduced to 80%
    fontWeight: 600,
    mb: '1rem', // 20px converted to rem and reduced to 80%
    mt: '0.5rem', // 10px converted to rem and reduced to 80%
    color: 'linear-gradient(90deg, #040410, #302EB7)',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem', // 20px converted to rem and reduced to 80%
    },
});

export const buttonStyles: SxProps<Theme> = (theme) => ({
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
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    marginBottom: '7.5rem', // 150px converted to rem and reduced to 80%
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        marginRight: '0.25rem', // 5px converted to rem and reduced to 80%
        marginBottom: '0.75rem', // 15px converted to rem and reduced to 80%
    },
});

export const gridItemImageStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '40%',
        maxWidth: '10rem', // 200px converted to rem and reduced to 80%
    },
});

export const imageStyles: React.CSSProperties = {
    marginTop: '7.5rem', // 150px converted to rem and reduced to 80%
    width: '90%',
    maxWidth: '30rem', // 600px converted to rem and reduced to 80%
};

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem', // 20px converted to rem and reduced to 80%
        textAlign: 'center',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem', // 24px converted to rem and reduced to 80%
    },
});

export const dividerBoxStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    height: '0.15rem', // 3px converted to rem and reduced to 80%
    backgroundColor: '#735fe4',
    margin: '0.05rem', // 1px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    textAlign: 'justify',
    marginRight: '2rem', // 40px converted to rem and reduced to 80%
    marginLeft: '2rem', // 40px converted to rem and reduced to 80%
    marginTop: '1rem', // 20px converted to rem and reduced to 80%
    fontSize: '1.25rem', // 25px converted to rem and reduced to 80%
    lineHeight: '140%',
    marginBottom: '1.5rem', // 30px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem', // 24px converted to rem and reduced to 80%
    },
});

export const typographySmallBodyStyles: SxProps<Theme> = (theme) => ({
    marginLeft: '2rem', // 40px converted to rem and reduced to 80%
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
});

export const gridContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '3.5rem', // 70px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        marginLeft: '0.1rem', // 2% of viewport width (not converted)
    },
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    marginLeft: '25rem', // 500px converted to rem and reduced to 80%
    marginTop: '3.5rem', // 70px converted to rem and reduced to 80%
    maxWidth: '50rem', // 1000px converted to rem and reduced to 80%
    width: '100%',
    bgcolor: '#735fe4',
    borderRadius: '0.5rem', // 10px converted to rem
    padding: '0.25rem', // 5px converted to rem
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem', // 10px converted to rem and reduced to 80%
        borderRadius: '0.25rem', // 5px converted to rem
    },
});

export const listStyles: SxProps<Theme> = (theme) => ({
    maxWidth: '100%',
    bgcolor: 'background.paper',
    color: 'black',
    borderRadius: '0.5rem', // 10px converted to rem
    [theme.breakpoints.down('sm')]: {
        borderRadius: '0.25rem', // 5px converted to rem
    },
});

export const listItemIconStyles: SxProps<Theme> = (theme) => ({
    color: 'black',
    [theme.breakpoints.down('sm')]: {
        fontSize: '4rem', // 5rem reduced to 80%
    },
});

export const listItemTextStyles: SxProps<Theme> = (theme) => ({
    fontSize: '1.6rem', // 32rem reduced to 80% (assuming 32rem was a mistake and should be 32px)
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem', // 20rem reduced to 80% (assuming 20rem was a mistake and should be 20px)
        borderRadius: '0.25rem', // 5px converted to rem
    },
});

export const dividerBoxTestFaqStyles: SxProps<Theme> = (theme) => ({
    width: '50%',
    height: '0.15rem', // 3px converted to rem and reduced to 80%
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#735fe4',
    margin: '0.05rem', // 1px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
});

export const FaqTitle: SxProps<Theme> = (theme) => ({
    textAlign: 'left',
    marginLeft: '7.5rem', // 150px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
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
    marginLeft: '2rem', // 40px converted to rem and reduced to 80%
    marginRight: '2rem', // 40px converted to rem and reduced to 80%
    textAlign: 'justify',
    fontSize: '1.25rem', // 25px converted to rem and reduced to 80%
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const dividerBoxTestInfStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    alignItems: 'flex-start',
    height: '0.15rem', // 3px converted to rem and reduced to 80%
    backgroundColor: '#735fe4',
    margin: '0.05rem', // 1px converted to rem and reduced to 80%
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

export const BoxCardHollandStyles: SxProps<Theme> = (theme) => ({
    display: 'flex',
    gap: '0.5rem',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
});

export const CardStyle: SxProps<Theme> = (theme) => ({
    flex: '0 0 auto', // Permite que o cartão não redimensione automaticamente
    transition: 'transform 0.3s ease',
});
export const CardContentStyles: SxProps<Theme> = (theme) => ({
    whiteSpace: 'normal',
    padding: '1rem',
    textAlign: 'center',
});

export const BoxTitleAndDividerBoxStyles: SxProps<Theme> = (theme) => ({
    marginBottom: '1rem', // 20px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemText: SxProps<Theme> = (theme) => ({
    marginBottom: '5rem', // 100px converted to rem and reduced to 80%
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});
