import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Pie, Cell, Legend, PieChart } from 'recharts';
import {
    content0Style, contentStyle, gridItem1Styles, titleResultStyle, TestButton,
    paperBannerStyles, paperTestStyles, paperPerfisStyles, paperResultStyles,
    paperImgStyles,
    gridContainerStyles,
    gridItem2Styles,
    titlePerfilStyle,
    cardTitleStyle,
    cardTitle2Style
} from './styles';
import { buscarTestesDeEstudante, buscarPerfisRecorrentes } from '../../../services/apiService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupsIcon from '@mui/icons-material/Groups';
import ScienceIcon from '@mui/icons-material/Science';
import vocco from '../../../assets/img/vocco.png';
import StudentHeader from '../../../components/studentHeader';
import StudentFooter from '../../../components/studentFooter';
// import { PieChart } from '@mui/x-charts/PieChart';
// import StudentFooter from '../../../components/studentFooter';

const PROFILE_DETAILS: { [key: string]: { color: string; icon: React.ReactNode } } = {
    'Artistico': { color: '#FF69B4', icon: <PaletteIcon /> },
    'Social': { color: '#7FFFD4', icon: <GroupsIcon /> },
    'Investigativo': { color: '#1E90FF', icon: <ScienceIcon /> },
    'Empreendedor': { color: '#DC143C', icon: <PaletteIcon /> },
    'Convencional': { color: '#836FFF', icon: <PaletteIcon /> },
    'Realista': { color: '#D2691E', icon: <PaletteIcon /> },
};

const iconMap: { [key: string]: { icon: React.ReactNode } } = {
    'Dashboard': { icon: <DashboardIcon /> },
    'Testes Vocacionais': { icon: <AssignmentRoundedIcon /> },
    'Minha conta': { icon: <AccountBoxRoundedIcon /> },
    'Cursos': { icon: <LocalLibraryRoundedIcon /> },
    'Instituições': { icon: <SchoolRoundedIcon /> },
    'Log Out': { icon: <LogoutRoundedIcon /> },
};

const drawerWidth = 240;

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

const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '5px',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme), // Aplica o estilo quando o Drawer está aberto
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                backgroundColor: '#E3EDF4', // Cor de fundo personalizada
            },
        }),
        ...(!open && {
            ...closedMixin(theme), // Aplica o estilo quando o Drawer está fechado
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                backgroundColor: '#E3EDF4', // Cor de fundo personalizada
            },
        }),
    })
);

const StudentDashboard: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    //___________________________________________________________________________________________
    const { t } = useTranslation();
    //___________________________________________________________________________________________

    const [testHistory, setTestHistory] = useState<{ date: string, result: string[] }[]>([]);
    const [recorrentes, setRecorrentes] = useState<string[]>([]);
    const [sliderRef, setSliderRef] = useState<Slider | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [recorrenteImage, setRecorrenteImage] = useState<string | null>(null);

    const authContext = useContext(AuthContext);
    const userData = authContext?.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    useEffect(() => {
        const fetchTestHistory = async () => {
            try {
                if (user?.id) {
                    const tests = await buscarTestesDeEstudante(user.id);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedTests = tests.map((test: any) => ({
                        date: new Date(test.data).toLocaleDateString('pt-BR'),
                        result: test.perfis,
                    }));
                    setTestHistory(formattedTests);
                }
            } catch (error) {
                console.error('Erro ao buscar histórico de testes:', error);
            }
        };

        const fetchPerfisRecorrentes = async () => {
            try {
                if (user?.id) {
                    const profiles = await buscarPerfisRecorrentes(user.id);
                    setRecorrentes(profiles);
                    if (profiles.length > 0) {
                        // const perfilMaisRecorrente = profiles[0];
                        // const imageUrl = URL_DO_BACKEND/${perfilMaisRecorrente}.png;
                        // setRecorrenteImage(imageUrl);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar perfis recorrentes:', error);
            }
        };

        fetchTestHistory();
        fetchPerfisRecorrentes();
    }, [user?.id]);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: false,
    };

    const generateChartData = (result: string[]) => {
        const profileCounts = result.reduce((counts: { [key: string]: number }, profile) => {
            counts[profile] = (counts[profile] || 0) + 1;
            return counts;
        }, {});

        return Object.entries(profileCounts).map(([name, value]) => ({ name, value }));
    };

    if (!authContext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <List sx={{ backgroundColor: '#E3EDF4', boxShadow: 'none' }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            {/* Alinhamento da logo e do texto VOCCO para seguir o mesmo padrão dos outros itens */}
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center', // Igual aos outros itens
                                    px: 1.8,
                                }}
                                onClick={open ? handleDrawerClose : handleDrawerOpen} // Alterna entre abrir e fechar o Drawer
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        justifyContent: 'center',
                                        mr: open ? 2 : 'auto', // Mantém o espaçamento como os outros itens
                                    }}
                                >
                                    {/* Ícone da logo (tamanho fixo) */}
                                    <img
                                        src={vocco}
                                        alt="Logo"
                                        style={{
                                            width: '35px', // Tamanho fixo da logo (igual aos ícones)
                                        }}
                                    />
                                </ListItemIcon>

                                {/* Texto VOCCO (só aparece quando o Drawer está aberto) */}
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontFamily: 'Poppins', // Exemplo de família de fontes
                                                fontSize: '25px', // Tamanho personalizado da fonte
                                                fontWeight: 'bold', // Exemplo de peso da fonte
                                                color: '#185D8E',
                                                opacity: open ? 1 : 0, // Faz com que desapareça quando fechado
                                                transition: 'opacity 0.3s ease', // Transição suave
                                            }}
                                        >
                                            VOCCO
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>

                    {/* O restante do menu, seguindo o mesmo padrão */}
                    <List sx={{ backgroundColor: '#E3EDF4', boxShadow: 'none', color: '#185D8E', fontFamily: 'Roboto, monospace' }}>
                        {['Dashboard', 'Testes Vocacionais', 'Minha conta', 'Cursos', 'Instituições'].map((text) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        { minHeight: 48, px: 2.5 },
                                        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            { minWidth: 0, justifyContent: 'center', color: '#0B2A40' },
                                            open ? { mr: 3 } : { mr: 'auto' },
                                        ]}
                                    >
                                        {iconMap[text]?.icon} {/* Usa o mapeamento para obter o ícone */}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[{ fontFamily: 'Roboto, monospace' }, open ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    {/* <Divider sx={{ minHeight: 290 }} /> */}

                    <List sx={{ backgroundColor: '#E3EDF4', boxShadow: 'none', color: '#185D8E', fontFamily: 'Roboto, monospace' }}>
                        {['Log Out'].map((text) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={[
                                        { minHeight: 48, px: 2.5 },
                                        open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            { minWidth: 0, justifyContent: 'center', color: '#0B2A40' },
                                            open ? { mr: 3 } : { mr: 'auto' },
                                        ]}
                                    >
                                        {iconMap[text]?.icon} {/* Usa o mapeamento para obter o ícone */}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[{ fontFamily: 'Roboto, monospace', }, open ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#F3F3F3' }}>
                    <StudentHeader />
                    <DrawerHeader />
                    {/* Card Principal////////////////////////////////////////////////////////////////////////////// */}
                    <Grid display="flex" justifyContent="center">
                        <Paper sx={paperTestStyles}>
                            <Typography sx={cardTitleStyle} component="div">
                                {t('dashboardCard1')}
                            </Typography>
                            <Typography sx={cardTitle2Style} component="div">
                                {t('dashboardCard1')}
                            </Typography>
                            <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                                {/* <Button variant="text" size="large" sx={TestButton} component="div">
                                    {t('dashboardTestButton')}
                                </Button> */}
                            </Link>
                        </Paper>
                    </Grid>
                    {/* Container Meio////////////////////////////////////////////////////////////////////////////// */}
                    <Grid container sx={gridContainerStyles}>
                        <Box>
                            <Typography sx={titlePerfilStyle} component="div">
                                {t('dashboardCard2')}
                            </Typography>
                            <Grid item sx={gridItem1Styles}>
                                <Box sx={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                                    {/* <Paper sx={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                display: 'flex',
                                height: '16rem',
                                width: '28rem',
                                backgroundColor: 'transparent',
                                boxShadow: 'none'
                            }}> */}
                                    <Paper sx={paperImgStyles}></Paper>

                                    <Box>
                                        {recorrentes.length > 0 ? (
                                            recorrentes.map((profile, index) => (
                                                <Paper key={index} sx={paperPerfisStyles}>
                                                    <Box display="flex" alignItems="center">
                                                        {PROFILE_DETAILS[profile].icon}
                                                        <Typography sx={{ ...content0Style }}>
                                                            {profile}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            ))
                                        ) : (
                                            <Paper sx={paperPerfisStyles}>
                                                <Typography sx={content0Style}>
                                                    {t('dashboardCard2Text')}
                                                </Typography>
                                            </Paper>
                                        )}
                                    </Box>
                                    {/* </Paper> */}
                                </Box>

                            </Grid>
                        </Box>
                        <Box sx={{ width: '12.5rem' }}></Box>
                        <Grid item sx={gridItem2Styles}>
                            <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
                                <Typography sx={titleResultStyle} component="div" style={{ textAlign: 'center', marginBottom: '0.4rem', marginTop: '0.4rem' }}>
                                    {t('dashboardCard3')}
                                </Typography>

                                <Paper sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                    backgroundColor: '#A4BFD2'
                                }}>
                                    <IconButton onClick={() => sliderRef?.slickPrev()}>
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                    <Box sx={paperResultStyles}>
                                        {testHistory.length > 0 ? (
                                            <Slider ref={setSliderRef} {...carouselSettings}>
                                                {testHistory.map((test, index) => (
                                                    <Box key={index} sx={{ padding: '1%', textAlign: 'center' }}>
                                                        <Typography sx={contentStyle}>
                                                            {test.date}
                                                        </Typography>
                                                        <PieChart width={400} height={200}>
                                                            <Pie
                                                                data={generateChartData(test.result)}
                                                                dataKey="value"
                                                                nameKey="name"
                                                                cx={170}
                                                                cy={70}
                                                                cornerRadius={5}
                                                                startAngle={-360}
                                                                endAngle={225}
                                                                outerRadius={90}
                                                                innerRadius={0}
                                                                paddingAngle={2}
                                                                fill="#8884d8"
                                                                stroke="white"
                                                                strokeWidth={0}
                                                            >

                                                                {generateChartData(test.result).map((entry, index) => (
                                                                    <Cell key={`cell-${index}`} fill={PROFILE_DETAILS[entry.name].color || '#CCCCCC'} />
                                                                ))}
                                                            </Pie>
                                                            {/* <Tooltip /> */}
                                                            <Legend layout="vertical"// Faz a legenda ficar uma embaixo da outra
                                                                align="left"// Alinha à direita
                                                                verticalAlign="middle"
                                                            />
                                                        </PieChart>
                                                    </Box>
                                                ))}
                                            </Slider>
                                        ) : (
                                            <Typography sx={content0Style}>
                                                {t('dashboardCard3Text')}
                                            </Typography>
                                        )}
                                    </Box>
                                    <IconButton onClick={() => sliderRef?.slickNext()}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Paper>

                            </Box>
                        </Grid>
                    </Grid>
                    {/* Container Meio/
                  ///////////////////////////////////////////////////////////////////////////// */}
                    <Grid display="flex" justifyContent="center">
                        <Paper sx={paperBannerStyles}></Paper>
                    </Grid>

                </Box >

            </Box >
            <StudentFooter />
        </Box >
    );
};

export default StudentDashboard;