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
    [theme.breakpoints.down('sm')]: {
        marginRight: '5px',
        marginBottom: '15px',
        textAlign: 'center',
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
    backgroundImage: `url(${pageThree})`,
});

export const gridAboutContainerStyles: SxProps<Theme> = (theme) => ({
    marginBottom:'150px',
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
    marginTop:'150px',
    width: '90%',
    maxWidth: '600px',
};

export const gridItemTextStyles: SxProps<Theme> = (theme) => ({
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
        fontSize: '20px',
        textAlign: 'center',
    },
});

export const typographyAboutTitleStyles: SxProps<Theme> = (theme) => ({
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
});

export const dividerBoxStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    height: '3px',
    backgroundColor: '#735fe4',
    margin: '1px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
});

export const typographyBodyStyles: SxProps<Theme> = (theme) => ({
    textAlign:'justify',
    marginRight:'40px',
    marginLeft: '40px',
    marginTop:'20px',
    fontSize: '25px',
    lineHeight: '140%',
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
});

export const typographySmallBodyStyles: SxProps<Theme> = (theme) => ({
    marginLeft: '40px',
    fontSize: '25px',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
});

// Style FAQ-------------------------------------------------------
export const faqBoxStyles: SxProps<Theme> = (theme) => ({
    ...globalBoxStyles(theme),
    backgroundImage: `url(${pageFour})`,
});

export const gridContainerStyles: SxProps<Theme> = (theme) => ({
    height: '100%',
    alignItems:'center',
    textAlign:'center',
    marginBottom: '70px',
    [theme.breakpoints.down('sm')]: {
        marginLeft: '2%',
    },
});

export const innerBoxStyles: SxProps<Theme> = (theme) => ({
    marginLeft:'500px',
    marginTop: '70px',
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
export const dividerBoxTestFaqStyles: SxProps<Theme> = (theme) => ({
    width: '50%',
    height: '3px',
    alignItems:'center',
    textAlign:'center',
    backgroundColor: '#735fe4',
    margin: '1px',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
});
export const FaqTitle: SxProps<Theme> = (theme) => ({
    textAlign: 'left',
    marginLeft:'150px',
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
    marginLeft: '40px',
    marginRight: '40px',
    textAlign: 'justify',
    fontSize: '25px',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const dividerBoxTestInfStyles: SxProps<Theme> = (theme) => ({
    width: '100%',
    alignItems: 'flex-start',
    height: '3px',
    backgroundColor: '#735fe4',
    margin: '1px',
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
    gap: 1,
    py: 1,
    overflow: 'auto',
    width: '100%',
    scrollSnapType: 'x mandatory',
    '& > *': {
        scrollSnapAlign: 'center',
    },
    '::-webkit-scrollbar': { display: 'none' },
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const CardStyle: SxProps<Theme> = (theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const BoxTitleAndDividerBoxStyles: SxProps<Theme> = (theme) => ({
    marginBottom:'20px',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});

export const GridItemText: SxProps<Theme> = (theme) => ({
    marginBottom: '100px',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
    },
});
