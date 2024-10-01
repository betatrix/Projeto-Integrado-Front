import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Typography, Paper, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { PieChart } from '@mui/x-charts/PieChart';
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
    contentPerfilStyle,
    contentResultStyle,
    IconStyles,
} from './styles';
import { buscarTestesDeEstudante, buscarPerfisRecorrentes } from '../../../services/apiService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';
import { useTranslation } from 'react-i18next';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StudentHeader from '../../../components/studentHeader';
import LockIcon from '@mui/icons-material/Lock';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
import Footer from '../../../components/homeFooter';
import vocco from '../../../assets/img/vocco.png';
import perfil from '../../../assets/img/perfil.png';

const PROFILE_DETAILS: { [key: string]: { color: string; icon: React.ReactNode } } = {
    'Artistico': { color: '#FF69B4', icon: <ColorLensIcon sx={IconStyles} /> },
    'Social': { color: '#7FFFD4', icon: <Diversity3Icon sx={IconStyles} /> },
    'Investigativo': { color: '#1E90FF', icon: <TravelExploreIcon sx={IconStyles} /> },
    'Empreendedor': { color: '#DC143C', icon: <PointOfSaleIcon sx={IconStyles} /> },
    'Convencional': { color: '#836FFF', icon: <CardTravelIcon sx={IconStyles} /> },
    'Realista': { color: '#D2691E', icon: <PsychologyIcon sx={IconStyles} /> },
};

const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '2rem',
}));

interface ResultItem {
    perfil: string;
    compatibilidade: number;
}

const StudentDashboard: React.FC = () => {
    const theme = useTheme();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    //const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation();

    const [testHistory, setTestHistory] = useState<{ date: string, result: ResultItem[] }[]>([]);
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
                    console.log(tests);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const formattedTests = tests.map((test: any) => ({
                        date: new Date(test.data).toLocaleDateString('pt-BR'),
                        result: test.perfis,
                    }));
                    console.log(formattedTests);
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const generateChartData = (result: ResultItem[]) => {
        const profileCounts = result.reduce((counts: { [key: string]: number }, item) => {
            counts[item.perfil] = (counts[item.perfil] || 0) + 1;
            return counts;
        }, {});

        return Object.entries(profileCounts).map(([name, value]) => ({ name, value }));
    };

    if (!authContext) {
        return <div>Não conseguiu pegar o contexto.</div>;
    }
    const showLockIcon = testHistory.length === 0;

    // Regras para breakpoints
    const chartConfig = {
        outerRadius: isSmallScreen ? 60 : isMediumScreen ? 80 : 95,
        cx: isSmallScreen ? 70 : isMediumScreen ? 100 : 130,
        cy: isSmallScreen ? 60 : isMediumScreen ? 80 : 90,
        width: isSmallScreen ? 150 : isMediumScreen ? 250 : 260,
        height: isSmallScreen ? 130 : isMediumScreen ? 180 : 200,
        ArrowBackIosIcon: isSmallScreen ? 60 : isMediumScreen ? 80 : 95,
    };

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#F3F3F3', minHeight: '80vh' }}>
                <DrawerHeader />
                <Box>
                    <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
                </Box>
                <Box sx={{ paddingLeft: open ? { xs: '0px', sm: '215px' } : '0px' }} >
                    <StudentHeader />
                    {/* Card Principal////////////////////////////////////////////////////////////////////////////// */}
                    <Grid display="flex" justifyContent="center">
                        <Paper sx={paperTestStyles}>
                            <Box sx={{ display: 'flex' }}> {/* Container Flex */}
                                <Box>
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
                                </Box>
                                <Box sx={{ display: 'flex' }} ml={1} className="your-image-container">
                                    <img
                                        src={vocco}
                                        alt="Logo"
                                        style={{ width: '210px' }}
                                    />
                                </Box>
                            </Box>
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
                                    [theme.breakpoints.down('sm')]: { // Responsividade no Paper interno também
                                        width: '18rem',
                                        height: '11rem',
                                        marginBottom: '1rem',
                                    },
                                    [theme.breakpoints.down('md')]: { // Responsividade no Paper interno também
                                        width: '18rem',
                                        height: '11rem',
                                        marginBottom: '1rem',
                                    },
                                }}>
                                    {showLockIcon ? (
                                        // Se não houver testes, exibe um único Paper com o cadeado
                                        <Paper sx={{
                                            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem', width: '25rem',
                                            height: '16rem', backgroundColor: '#D7E6F1', boxShadow: 'none', [theme.breakpoints.down('sm')]: {
                                                height: '11rem',
                                            }, [theme.breakpoints.down('md')]: {
                                                height: '11rem',
                                            },
                                        }}>
                                            <LockIcon sx={{
                                                fontSize: 100,
                                                color: '#0B2A40',
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: 70,
                                                }, [theme.breakpoints.down('md')]: {
                                                    fontSize: 70,
                                                },
                                            }} />
                                        </Paper>
                                    ) : (
                                        <>
                                            <Paper sx={paperImgStyles}>
                                                <Box
                                                    component="img"
                                                    src={perfil}
                                                    alt="Perfil"
                                                    sx={{
                                                        width: '125px',
                                                        [theme.breakpoints.down('sm')]: {
                                                            width: '80px',
                                                        },
                                                        [theme.breakpoints.down('md')]: {
                                                            width: '80px',
                                                        },
                                                    }}
                                                />
                                            </Paper>
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
                                <Typography sx={titleResultStyle} component="div">
                                    {t('dashboardCard3')}
                                </Typography>

                                <Paper sx={paperResultStyles}>
                                    {/* Exibe o botão anterior apenas se houver mais de um teste */}
                                    {testHistory.length > 1 && (
                                        <IconButton onClick={() => sliderRef?.slickPrev()}>
                                            <ArrowBackIosIcon sx={{
                                                fontSize: 25,
                                                color: '#0B2A40',
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: 10,
                                                }, [theme.breakpoints.down('md')]: {
                                                    fontSize: 10,
                                                },
                                            }} />
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
                                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            {/* Gráfico de pizza */}
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }} >
                                                                <PieChart
                                                                    series={[
                                                                        {
                                                                            data: test.result.map(item => ({
                                                                                id: item.perfil,
                                                                                value: item.compatibilidade,
                                                                                color: PROFILE_DETAILS[item.perfil]?.color || '#CCCCCC',
                                                                            })),
                                                                            innerRadius: 3,
                                                                            outerRadius: chartConfig.outerRadius,
                                                                            paddingAngle: 5,
                                                                            cornerRadius: 5,
                                                                            startAngle: -360,
                                                                            endAngle: 225,
                                                                            cx: chartConfig.cx,
                                                                            cy: chartConfig.cy,
                                                                        },
                                                                    ]}
                                                                    width={chartConfig.width}
                                                                    height={chartConfig.height}
                                                                />
                                                            </Box>

                                                            {/* Legenda ao lado do gráfico */}
                                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '40px' }}>
                                                                {test.result.map((entry, index) => (
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
                                                                                backgroundColor: PROFILE_DETAILS[entry.perfil].color,
                                                                            }}
                                                                        />
                                                                        <Typography variant="body2" sx={{
                                                                            fontSize: 16,
                                                                            fontFamily: 'Roboto, monospace',
                                                                            color: '#0B2A40',
                                                                            fontWeight: 'bold',
                                                                            [theme.breakpoints.down('sm')]: {
                                                                                fontSize: 10,
                                                                            }, [theme.breakpoints.down('md')]: {
                                                                                fontSize: 10,
                                                                            },
                                                                        }} >
                                                                            {entry.perfil}
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
                                            <ArrowForwardIosIcon sx={{
                                                fontSize: 25,
                                                color: '#0B2A40',
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: 10,
                                                }, [theme.breakpoints.down('md')]: {
                                                    fontSize: 10,
                                                },
                                            }} />
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
                    <Footer />
                </Box>
            </Box >

        </>
    );
};

export default StudentDashboard;