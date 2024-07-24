import React, { useState } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
    Button,
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const styles = {
    logo: {
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    LoginText: {
        mr: 2,
        color: 'white',
    },
    menu: {
        mt: '45px',
    },
    linkButton: {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px',
        cursor: 'pointer',
    },
};

function InitialPageHeader() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    // const { t, i18n } = useTranslation();
    // const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAdminLogin = () => {
        setAnchorElUser(null);
        navigate('/login');
    };

    const handleStudentLogin = () => {
        setAnchorElUser(null);
        navigate('/estudante');
    };

    const{
        t,
        i18n: {
            changeLanguage, language
        },
    } = useTranslation();

    const[currentLanguage, setCurrentLanguage] = useState(language);

    const handleChangeLanguage = () => {
        const newLanguage = currentLanguage === 'en' ? 'pt' : 'en';
        changeLanguage(newLanguage);
        setCurrentLanguage(newLanguage);
    };
    return (
        <AppBar position="sticky" style={{ backgroundColor: '#1b1f27' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/pagina-inicial"
                            sx={styles.logo}
                        >
                            VOCCO
                        </Typography>
                        <Box sx={{ marginLeft: '800px' }}>
                            <ScrollLink to="home" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('home')}</Button>
                            </ScrollLink>
                            <ScrollLink to="testInformation" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('Informações')}</Button>
                            </ScrollLink>
                            <ScrollLink to="about" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('Sobre')}</Button>
                            </ScrollLink>
                            <ScrollLink to="faq" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">{t('faq')}</Button>
                            </ScrollLink>
                            <Button onClick={handleChangeLanguage} color="inherit" sx={{display:'none'}}>
                                {currentLanguage === 'en' ? 'Português' : 'English'}
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Login">
                            <Button type="button" variant="outlined" onClick={handleOpenUserMenu} sx={styles.LoginText} >
                                {t('login')}
                            </Button>
                        </Tooltip>
                        <Menu
                            sx={styles.menu}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleStudentLogin}>
                                <Typography textAlign="center">{t('student')}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleAdminLogin}>
                                <Typography textAlign="center">{t('admin')}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default InitialPageHeader;
