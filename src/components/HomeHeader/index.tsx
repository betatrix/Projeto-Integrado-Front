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
//import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

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
        cursor: 'pointer', // Adicione o cursor de ponteiro para links
    },
};

function InitialPageHeader() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAdminLogin = () => {
        setAnchorElUser(null);
        navigate('/admin');
    };
    const handleStudentLogin = () => {
        setAnchorElUser(null);
        navigate('/estudante');
    };

    return (
        <AppBar position="fixed" style={{ backgroundColor: '#1b1f27' }}>
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
                                <Button color="inherit">Home</Button>
                            </ScrollLink>
                            <ScrollLink to="about" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">Sobre</Button>
                            </ScrollLink>
                            <ScrollLink to="faq" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">FAQ</Button>
                            </ScrollLink>
                            <ScrollLink to="testInformation" smooth={true} duration={500} style={styles.linkButton}>
                                <Button color="inherit">Informações</Button>
                            </ScrollLink>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Tooltip title="Login">
                            <Button type='button' variant='outlined' onClick={handleOpenUserMenu} sx={styles.LoginText}> Entrar
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
                                <Typography textAlign="center">Estudante</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleAdminLogin}>
                                <Typography textAlign="center">Administrador</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default InitialPageHeader;
