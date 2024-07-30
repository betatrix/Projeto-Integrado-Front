import React, { useContext, useState } from 'react';
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
import { AuthContext } from '../../contexts/auth';
import { decryptData } from '../../services/encryptionService';

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

function StudentHeader() {

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

    // const handleOpenTesteMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElTeste(event.currentTarget);
    // };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleCloseTesteMenu = () => {
    //     setAnchorElTeste(null);
    // };

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const handleStudentPerfil = () => {
    //     setAnchorElUser(null);
    //     navigate('/perfil');
    // };

    // const handleStudentTeste = () => {
    //     setAnchorElUser(null);
    //     navigate('/teste-vocacional');
    // };
    // const handleStudentResultadoTeste = () => {
    //     setAnchorElUser(null);
    //     navigate('/resultado');
    // };

    const handleMenuItemClick = () => {
        setAnchorElUser(null);
        logout();
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
                    <Box sx={{ marginLeft: '600px' }}>
                        <Link to="/pagina-inicial" style={styles.linkButton}>
                            <Button color="inherit">Home</Button>
                        </Link>
                        <Link to="/instituicao" style={styles.linkButton}>
                            <Button color="inherit">Universidades</Button>
                        </Link>
                        <Link to="/teste-vocacional" style={styles.linkButton}>
                            <Button color="inherit">Teste</Button>
                        </Link>
                        {/* <Tooltip title='Opções de Teste'>
                            <Button onClick={handleOpenTesteMenu} color="inherit">Teste</Button>
                        </Tooltip>
                        <Menu
                            sx={styles.menu}
                            id="menu-appbar"
                            anchorEl={anchorElTeste}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            open={Boolean(anchorElTeste)}
                            onClose={handleCloseTesteMenu}
                        >
                            <MenuItem onClick={handleStudentTeste}>
                                <Typography textAlign="center">Faça um teste</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleStudentResultadoTeste}>
                                <Typography textAlign="center">Resultado do Teste</Typography>
                            </MenuItem>
                        </Menu> */}

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={styles.welcomeText}>
                            Bem vindo de volta, {student ? student.nome : 'usuário'}!
                        </Typography>
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
                            <MenuItem>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleMenuItemClick}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                            {/* <MenuItem onClick={handleStudentPerfil}>
                                <Typography textAlign="center">Perfil</Typography>
                            </MenuItem> */}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default StudentHeader;
