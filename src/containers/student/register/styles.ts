import { SxProps, Theme } from '@mui/material';

export const GlobalStyles: SxProps<Theme> = () => ({
    minHeight: '90vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
});

export const BackButton: SxProps<Theme> = () => ({
    position: 'absolute',
    top: 20,
    left: 20,
    color: '#3533cd',
    '&:hover': {
        backgroundColor: 'rgba(89,87,230,0.1) !important',
    },
});

export const LoginContainer: SxProps<Theme> = () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#caddff',
});

export const FormContainer: SxProps<Theme> = () => ({
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: '20px',
    width: '100%',
    maxWidth: '700px',
    background: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
});

export const Header: SxProps<Theme> = () => ({
    fontWeight: 700,
    marginBottom: '10px',
});

export const SubText: SxProps<Theme> = () => ({
    color: '#474d66',
    textDecoration: 'none',
    textAlign: 'left',
});

export const CustomLink: SxProps<Theme> = () => ({
    textDecoration: 'none',
    fontWeight: 600,
    color: '#735FE4',
    transition: '0.3s',
    '&:hover': {
        color: '#452DCB',
    },
});

export const CustomField: SxProps<Theme> = () => ({
    backgroundColor: '#E6E6E6',
    borderRadius: '10px',
    '&:hover': {
        backgroundColor: '#edeff5',
    },
    '&.Mui-focused': {
        backgroundColor: '#edeff5',
    },
    '&::before, &:hover::before, &::after': {
        borderBottom: 'none !important',
    },
    '&.Mui-error': {
        backgroundColor: '#F9DADA',
    },
});

export const CustomInputLabel: SxProps<Theme> = () => ({
    color: '#696f8c',
    '&.Mui-focused': {
        color: '#696f8c',
    },
});

export const MessageError: SxProps<Theme> = () => ({
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
});

export const loginButton: SxProps<Theme> = (theme) => ({
    mr: 2,
    marginTop: '1rem',
    fontFamily: 'Roboto, monospace',
    fontSize: '1.3rem',
    padding: '0.4rem 13.5rem',
    backgroundColor: '#D9EEFF',
    color: '#185D8E',
    fontWeight: 700,
    border: 'solid 2px #185D8E',
    borderRadius: '7px',
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
