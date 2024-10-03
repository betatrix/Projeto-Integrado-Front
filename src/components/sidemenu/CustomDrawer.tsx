// import React, { useEffect } from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import vocco from '../../assets/img/vocco.png';
import { Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const drawerWidth = 245;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                backgroundColor: '#E3EDF4',
                maxHeight: '100vh',
                overflowY: 'auto',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                backgroundColor: '#E3EDF4',
                maxHeight: '100vh',
                overflowY: 'auto',
            },
        }),
    })
);

const iconMap: { [key: string]: { icon: React.ReactNode, link: string } } = {
    'dashboard': { icon: <DashboardIcon sx={{fontSize: '1.8rem'}}/>, link: '/estudante' },
    'test': { icon: <AssignmentRoundedIcon sx={{fontSize: '1.8rem'}} />, link: '/teste-vocacional' },
    'myAccount': { icon: <AccountBoxRoundedIcon sx={{fontSize: '1.8rem'}}/>, link: '/minha-conta' },
    'courses': { icon: <LocalLibraryRoundedIcon sx={{fontSize: '1.8rem'}} />, link: '/cursos' },
    'university': { icon: <SchoolRoundedIcon sx={{fontSize: '1.8rem'}}/>, link: '/instituicao' },
    'logout': { icon: <LogoutRoundedIcon sx={{fontSize: '1.8rem'}}/>, link: '/logout' },
};

interface CustomDrawerProps {
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, handleDrawerOpen, handleDrawerClose }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const { t } = useTranslation();

    return (
        <>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Itens normais do menu */}
                    <List sx={{ backgroundColor: '#E3EDF4', boxShadow: 'none', flexGrow: 1 }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 1.8,
                                }}
                                onClick={open ? handleDrawerClose : handleDrawerOpen}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        mr: open ? 2 : 'auto',
                                    }}
                                >
                                    <img
                                        src={vocco}
                                        alt="Logo"
                                        style={{ width: '45px' }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontFamily: 'Poppins',
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                color: '#185D8E',
                                                opacity: open ? 1 : 0,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        >
                                            VOCCO
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                        {Object.keys(iconMap).map((key) => (
                            key !== 'logout' && (
                                <ListItem key={key} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        component={Link}
                                        to={iconMap[key].link}
                                        sx={[
                                            { minHeight: 48, px: 2.5 },
                                            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                        ]}
                                    >
                                        <ListItemIcon
                                            sx={[{ minWidth: 0, justifyContent: 'center', color: '#0B2A40' }, open ? { mr: 1.5 } : { mr: 'auto' }]}
                                        >
                                            {iconMap[key]?.icon}
                                        </ListItemIcon>
                                        <ListItemText

                                            primary={
                                                <Typography
                                                    sx={[{
                                                        fontFamily: 'Roboto, monospace',
                                                        color: '#185D8E', fontSize: '1.2rem'
                                                    }, open ? { opacity: 1 } : { opacity: 0 }]}
                                                >
                                                    {t(key)}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            )
                        ))}
                    </List>
                    <List sx={{ backgroundColor: '#E3EDF4', boxShadow: 'none', color: '#185D8E' }}>
                        <ListItem disablePadding sx={{ marginTop: 'auto', marginBottom: '25px' }}>
                            <ListItemButton
                                component={Link}
                                to={iconMap['logout'].link}
                                sx={[
                                    { minHeight: 48, px: 2.5 },
                                    open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[{ minWidth: 0, justifyContent: 'center', color: '#0B2A40' }, open ? { mr: 1.5 } : { mr: 'auto' }]}
                                >
                                    {iconMap['logout']?.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography
                                            sx={[{
                                                fontFamily: 'Roboto, monospace',
                                                fontSize: '1.2rem',
                                                color: '#185D8E',
                                                fontWeight: 'bold'
                                            }, open ? { opacity: 1 } : { opacity: 0 }]}
                                        >
                                            {t('logout')}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default CustomDrawer;
