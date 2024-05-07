// import {Link} from 'react-router-dom';

// export const Dashboard = () =>{
//     return(
//         <div>
//             <p>Dashboard</p>
//             <Link to={"/cadastro"}>Cadastro de Instituição</Link>
            
//         </div>
        
//     )
// }




import { Subtitle, SquareDisplay, SquareButton, TextButton } from './styles';
import { Grid, Box } from '@mui/material';
import AdminHeader from '../../components/AdminHeader';
import Footer from '../../components/AdminFooter';

// const MyIcon = () => (
//     <img src='../assets/icon-school.svg' alt="Ícone Escola" style={{ width: '24px', height: '24px' }} />
// );

const MyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" 
        height="80px" viewBox="0 -960 960 960" width="80px" fill="#1b1f27">
        <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/>
    </svg>
);

const Dashboard = () => {
    return (
        <>
            <AdminHeader />
            <Box sx={{ marginTop: '20px' }}>
                <Grid container justifyContent="center">
                    <Subtitle>
                        Quantidades Cadastradas
                    </Subtitle>
                    <Grid container spacing={4} justifyContent="center" alignItems="center" textAlign={'center'}>
                        <Grid item>
                            <SquareDisplay>
                                Instituições
                                <p>-</p>
                            </SquareDisplay>
                        </Grid>
                        <Grid item>
                            <SquareDisplay>
                                Cursos
                                <p>-</p>
                            </SquareDisplay>
                        </Grid>
                        <Grid item>
                            <SquareDisplay>
                                Estudantes
                                <p>-</p>
                            </SquareDisplay>
                        </Grid>
                        <Grid item>
                            <SquareDisplay>
                                Testes Realizados
                                <p>-</p>
                            </SquareDisplay>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ marginTop: '40px' }}>
                <Grid container justifyContent="center">
                    <Subtitle>
                        Ferramentas de Gerenciamento
                    </Subtitle>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                            <SquareButton href="/cadastro">
                                <TextButton>
                                    Instituições
                                </TextButton>
                                <MyIcon />
                            </SquareButton>
                        </Grid>
                        <Grid item>
                            <SquareButton href="/cursos">
                                <TextButton>
                                    Cursos
                                </TextButton>
                                <MyIcon />
                            </SquareButton>
                        </Grid>
                        <Grid item>
                            <SquareButton href="/page3">
                                <TextButton>
                                    Teste Vocacional
                                </TextButton>
                                <MyIcon />
                            </SquareButton>
                        </Grid>
                    </Grid>
                </Grid> 
                <Footer />
            </Box>
        </>
    );
};

export default Dashboard;