import { Box, Paper } from '@mui/material';
import InitialPageHeader from '../../components/HomeHeader';
import Footer from '../../components/AdminFooter';
import about from '../../assets/img/about.png';

const About = () => {
    return (
        <>
            <InitialPageHeader />
            <Box
                sx={{
                    height: 'calc(100vh - 128px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#caddf',
                    overflow: 'hidden',
                    padding: { xs: 2, md: 4 }
                }}
            >
                <Paper
                    sx={{
                        padding: { xs: 2, md: 4 },
                        // height:'98%',
                        width: '100%',
                        maxWidth: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 3
                    }}
                >
                    <img
                        src={about}
                        alt="Imagem representativa"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '80%'
                        }}
                    />
                </Paper>
            </Box>
            <Footer />
        </>
    );
};

export default About;
