import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
// import { Pie, Cell, Legend} from 'recharts';
// import { PieChart } from '@mui/icons-material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import {
    contentStyle, gridItem1Styles, titleResultStyle, TestButton,
    paperBannerStyles, paperTestStyles, paperPerfisStyles, paperResultStyles,
    paperImgStyles,
    gridContainerStyles,
    gridItem2Styles,
    titlePerfilStyle,
    cardTitleStyle,
    cardTitle2Style,
    boxResultStyles,
    // pieChartStyles,
    contentPerfilStyle,
    contentResultStyle,
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
import StudentHeader from '../../../components/studentHeader';
import LockIcon from '@mui/icons-material/Lock';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import Footer from '../../../components/homeFooter';

const PROFILE_DETAILS: { [key: string]: { color: string; icon: React.ReactNode } } = {
    'Artistico': { color: '#FF69B4', icon: <PaletteIcon /> },
    'Social': { color: '#7FFFD4', icon: <GroupsIcon /> },
    'Investigativo': { color: '#1E90FF', icon: <ScienceIcon /> },
    'Empreendedor': { color: '#DC143C', icon: <PaletteIcon /> },
    'Convencional': { color: '#836FFF', icon: <PaletteIcon /> },
    'Realista': { color: '#D2691E', icon: <PaletteIcon /> },
};

const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '2rem',
}));

const StudentDashboard: React.FC = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation();

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
    const showLockIcon = testHistory.length === 0;

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#F3F3F3', minHeight: '100vh' }}>
                <DrawerHeader />
                <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                <StudentHeader />
                {/* Card Principal////////////////////////////////////////////////////////////////////////////// */}
                <Grid display="flex" justifyContent="center">
                    <Paper sx={paperTestStyles}>
                        <Typography sx={cardTitleStyle} component="div">
                            {t('dashboardTitle')}
                        </Typography>
                        <Typography sx={cardTitle2Style} component="div">
                            {t('dashboardCard1')}
                        </Typography>
                        <Link to="/teste-vocacional" style={{ textDecoration: 'none' }}>
                            <Button variant="text" size="large" sx={TestButton} component="div">
                                {t('dashboardTest1')}
                            </Button>
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
                            <Paper sx={{
                                ...paperImgStyles,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '27.5rem',
                                height: '16rem',
                                backgroundColor: '#D7E6F1',
                                boxShadow: 'none', // Sem sombra
                                [theme.breakpoints.down('sm')]: { // Responsividade no Paper interno também
                                    width: '17rem',
                                    height: '11rem',
                                },
                                [theme.breakpoints.down('md')]: { // Responsividade no Paper interno também
                                    width: '17rem',
                                    height: '11rem',
                                },
                            }}>
                                {showLockIcon ? (
                                    // Se não houver testes, exibe um único Paper com o cadeado
                                    <Paper sx={{
                                        ...paperImgStyles, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', width: '25rem',
                                        height: '16rem', backgroundColor: '#D7E6F1', boxShadow: 'none', [theme.breakpoints.down('sm')]: {
                                            width: '17rem',
                                            height: '11rem',
                                        }, [theme.breakpoints.down('md')]: {
                                            width: '17rem',
                                            height: '11rem',
                                        }, [theme.breakpoints.down(1116)]: {
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: '50rem'
                                        }
                                    }}>
                                        <LockIcon sx={{
                                            fontSize: 100,
                                            color: '#0B2A40',
                                            [theme.breakpoints.down('sm')]: {
                                                width: '1rem',
                                                height: '2rem',
                                            },
                                            [theme.breakpoints.down('md')]: {
                                                width: '1rem',
                                                height: '2rem',
                                            },
                                        }} />
                                    </Paper>
                                ) : (
                                    <>
                                        <Paper sx={paperImgStyles}></Paper>
                                        <Box>
                                            {recorrentes.map((profile, index) => (
                                                <Paper key={index} sx={paperPerfisStyles}>
                                                    <Box display="flex" alignItems="center">
                                                        <Box sx={{ fontSize: 'small' }}>
                                                            {PROFILE_DETAILS[profile].icon} {/* Ícone estilizado */}
                                                        </Box>
                                                        <Typography sx={contentPerfilStyle(theme)} >
                                                            {profile}
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            ))}
                                        </Box>
                                    </>
                                )}
                            </Paper>
                        </Grid>
                    </Box>
                    <Box sx={{ width: '12.3rem' }}></Box>
                    <Grid item sx={gridItem2Styles}>
                        <Box sx={{ alignItems: 'center', textAlign: 'center' }}>
                            <Typography sx={titleResultStyle} component="div" style={{ textAlign: 'center' }}>
                                {t('dashboardCard3')}
                            </Typography>

                            <Paper sx={paperResultStyles}>
                                {/* Exibe o botão anterior apenas se houver mais de um teste */}
                                {testHistory.length > 1 && (
                                    <IconButton onClick={() => sliderRef?.slickPrev()}>
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                )}

                                <Paper sx={boxResultStyles}>
                                    {testHistory.length > 0 ? (
                                        <Slider ref={setSliderRef} {...carouselSettings}>
                                            {testHistory.map((test, index) => (
                                                <Box key={index} sx={{ textAlign: 'right' }} >
                                                    <Typography sx={contentStyle}>
                                                        {test.date}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                        {/* Gráfico de pizza */}
                                                        <Box sx={{ margin: 0 }} >
                                                            <PieChart
                                                                series={[
                                                                    {
                                                                        data: generateChartData(test.result).map(item => ({
                                                                            id: item.name,
                                                                            value: item.value,
                                                                            color: PROFILE_DETAILS[item.name]?.color || '#CCCCCC',
                                                                        })),
                                                                        innerRadius: 4,
                                                                        outerRadius: 100,
                                                                        paddingAngle: 5,
                                                                        cornerRadius: 5,
                                                                        startAngle: -360,
                                                                        endAngle: 225,
                                                                    },
                                                                ]}
                                                                width={296}
                                                                height={200}
                                                            />
                                                        </Box>

                                                        {/* Legenda ao lado do gráfico */}
                                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 0 }}>
                                                            {generateChartData(test.result).map((entry, index) => (
                                                                <Box
                                                                    key={index}
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        marginBottom: '10px', // Espaçamento entre os itens da legenda
                                                                    }}
                                                                >
                                                                    <Box
                                                                        sx={{
                                                                            width: '15px',
                                                                            height: '15px',
                                                                            backgroundColor: PROFILE_DETAILS[entry.name].color,
                                                                        }}
                                                                    />
                                                                    <Typography variant="body2" sx={{ color: '#000000' }}>
                                                                        {entry.name}
                                                                    </Typography>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                </Box>

                                            ))}
                                        </Slider>
                                    ) : (
                                        <Typography sx={contentResultStyle}>
                                            {t('dashboardCard3Text')}
                                        </Typography>
                                    )}
                                </Paper>

                                {/* Exibe o botão próximo apenas se houver mais de um teste */}
                                {testHistory.length > 1 && (
                                    <IconButton onClick={() => sliderRef?.slickNext()}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                )}
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
            <Footer />
        </>
    );
};

export default StudentDashboard;