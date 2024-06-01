import { Box, Button} from '@mui/material';
import InitialPageHeader from '../../components/HomeHeader';
import Footer from '../../components/AdminFooter';

const DataStudent = () => {
    return (
        <>
            <InitialPageHeader />
            <Box>
                <Button>Dados do Estudante</Button>
            </Box>
            <Footer />
        </>
    );
};

export default DataStudent;
