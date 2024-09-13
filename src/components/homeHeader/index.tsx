import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Button,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageMenu from '../translationButton';

const styles = {
    logo: {
        mr: 2,
        fontFamily: 'Poppins',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'black',
        textDecoration: 'none',
    },
    LoginText: {
        mr: 2,
        marginLeft: '10px',
        fontFamily: 'Roboto, monospace',
        fontSize: '15px',
        backgroundColor: '#D9EEFF',
        color: '#185D8E',
        fontWeight: 700,
        borderColor: '#185D8E',
        borderRadius: '7px',
        borderWidth: '2px',
        boxShadow: '4px 4px 0px 1px rgba(0, 111, 255, 0.2)',
        '&:hover': {
            backgroundColor: '#C0E3FF',
            borderColor: '#185D8E',
            borderWidth: '2px',
        },
    },
    menu: {
        mt: '45px',
    },
    linkButton: {
        fontFamily: 'Roboto, monospace',
        fontSize: '15px',
        color: '#232235',
        fontWeight: 700,
        textDecoration: 'none',
        marginRight: '10px',
        cursor: 'pointer',
    },
};

function InitialPageHeader() {
    const navigate = useNavigate();
    const{ t } = useTranslation();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <AppBar style={{ backgroundColor: '#F3F3F3', boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', height: '100px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScrollLink to="home" smooth={true} duration={500}>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/pagina-inicial"
                                sx={styles.logo}
                            >
                                VOCCO
                            </Typography>
                        </ScrollLink>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <ScrollLink to="testInformation" smooth={true} duration={500}>
                            <Button color="inherit" style={styles.linkButton}>{t('testInformation')}</Button>
                        </ScrollLink>
                        <ScrollLink to="about" smooth={true} duration={500}>
                            <Button color="inherit" style={styles.linkButton}>{t('about')}</Button>
                        </ScrollLink>
                        <ScrollLink to="faq" smooth={true} duration={500}>
                            <Button color="inherit" style={styles.linkButton}>{t('faq')}</Button>
                        </ScrollLink>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LanguageMenu />
                        <Button type="button" variant="outlined" onClick={handleLogin} sx={styles.LoginText} >
                            {t('login')}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default InitialPageHeader;
