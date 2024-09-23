import React, { useContext, useState } from 'react';
import {
    AppBar,
    Box,
    IconButton,
    Typography,
    Tooltip,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material';
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';
import LanguageMenu from '../translationButton';
// import { useTranslation } from 'react-i18next';

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

function StudentHeader( ) {
    // const { t } = useTranslation();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    // const [anchorElTeste, setAnchorElTeste] = useState<null | HTMLElement>(null);
    const authContext = useContext(AuthContext);
    // const navigate = useNavigate();

    if (!authContext) {
        return null;
    }
    const { logout } = authContext;
    const studentData = authContext.student ? decryptData(authContext.student) : null;
    const student = studentData ? JSON.parse(studentData) : null;

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuItemClick = () => {
        setAnchorElUser(null);
        logout();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#F3F3F3', boxShadow: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 3, justifyContent: 'flex-end', mr: 5 }}>
                <LanguageMenu />
                <Tooltip title="Opções de Perfil">
                    <IconButton onClick={handleOpenUserMenu} sx={styles.avatarButton}>
                        <Avatar alt={student ? student.nome : 'User Avatar'} src="/static/images/avatar/2.jpg" />
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
                    <MenuItem onClick={handleMenuItemClick}>
                        <Typography textAlign="center" sx={{ fontFamily: 'Roboto, monospace'}}>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </AppBar>
    );
}

export default StudentHeader;
