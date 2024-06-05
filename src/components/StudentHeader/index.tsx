import React, { useState } from 'react';
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    IconButton,
    Typography,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const settings = ['Account', 'Dashboard', 'Logout'];

const styles = {
    logo: {
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
    },
    avatarButton: {
        p: 0,
    },
    menu: {
        mt: '45px',
    },
    welcomeText: {
        mr: 2,
        color: 'white',
    },
    linkButton: {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px',
    },
};

function AdminHeader() {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ backgroundColor: '#1b1f27' }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={styles.logo}
                        >
                            VOCCO
                        </Typography>
                    </Box>
                    <Box sx={{marginLeft: '900px' }}>
                        <Link to="/pagina-inicial" style={styles.linkButton}>
                            <Button color="inherit">Home</Button>
                        </Link>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={styles.welcomeText}>Bem vindo de volta, fulano!</Typography>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={styles.avatarButton}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
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
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AdminHeader;
