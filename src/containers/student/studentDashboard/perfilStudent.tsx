import { Box, Button, styled} from '@mui/material';
import Footer from '../../../components/adminFooter';
import StudentHeader from '../../../components/studentHeader';
import CustomDrawer from '../../../components/sidemenu/CustomDrawer';
// import { useTranslation } from 'react-i18next';
import React, { useContext, useState } from 'react';
import { fotoEstudante } from '../../../services/studentService';
import { AuthContext } from '../../../contexts/auth';
import { decryptData } from '../../../services/encryptionService';

const PerfilStudent: React.FC = () => {
    // const { t } = useTranslation();

    const authContext = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const DrawerHeader = styled('div')(() => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        minHeight: '2rem',
    }));

    if (!authContext) {
        return null;
    }

    const userData = authContext.user ? decryptData(authContext.user) : null;
    const user = userData ? JSON.parse(userData) : null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Por favor, selecione um arquivo.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('arquivo', selectedFile);

            const response = await fotoEstudante(user.id, formData);

            if (response.status === 200) {
                const newPhotoUrl = response.data.fotoPerfil;

                authContext.updateUserPhoto(newPhotoUrl);
                console.log('Foto atualizada com sucesso:', newPhotoUrl);
            }
        } catch (error) {
            setError('Erro ao enviar o arquivo');
            console.error('Erro durante o upload:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DrawerHeader />
            <CustomDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
            <StudentHeader />
            <Box>
                <Button
                    sx={{ margin: '10rem' }}
                    variant="contained"
                    component="label"
                >
                    Upload File
                    <input
                        accept="image/*"
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                <Button
                    variant="contained"
                    onClick={handleUpload}
                    sx={{ margin: '1rem' }}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Submit'}
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Box>
            <Footer />
        </>
    );
};

export default PerfilStudent;
