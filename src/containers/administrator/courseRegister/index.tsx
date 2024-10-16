import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-mui';
import { Button, Box, Typography, Grid, Paper, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import AdminHeader from '../../../components/adminHeader';
import Footer from '../../../components/homeFooter';

export const CadastroCursoSimplificado: React.FC = () => {
    const initialValues = {
        descricao: '',
        perfilId: '',
        possiveisCarreiras: '',
        areaId: '',
        tipo: '',
        empregabilidade: '',
    };

    const validationSchema = Yup.object().shape({
        descricao: Yup.string(),
        perfilId: Yup.string(),
        possiveisCarreiras: Yup.string(),
        areaId: Yup.string(),
        tipo: Yup.string(),
        empregabilidade: Yup.string(),
    });

    const handleSubmit = (values: unknown) => {
        console.log('Form values:', values);
    };

    return (
        <>
            <AdminHeader />
            <Box sx={{ backgroundColor: '#F3F3F3' }}>
                <Box sx={{ height: 50 }}></Box>
                <Box sx={{ backgroundColor: '#F3F3F3', marginTop: 10 }}>
                    <Box sx={{ marginTop: 5 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        maxWidth: 600,
                                        margin: 'auto',
                                    }}
                                >
                                    <Form>
                                        <Box sx={{ '& .MuiTextField-root': { m: 1 } }}>
                                            <Paper sx={{ marginTop: '30px', marginBottom: '25px', backgroundColor: 'white', paddingBottom: 3 }}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    sx={{
                                                        maxWidth: 500,
                                                        paddingLeft: '60px',
                                                        paddingTop: '20px',
                                                        paddingBottom: '30px',
                                                    }}
                                                >
                                                    <Typography variant="h6" sx={{
                                                        fontSize: '25px', textAlign: 'left',
                                                        fontFamily: 'Roboto, monospace',
                                                        color: '#757575',
                                                        fontWeight: 'bold',
                                                    }}>
                                                        Dados do Curso
                                                    </Typography>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="descricao"
                                                            label="Descrição do Curso"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="perfilId"
                                                            label="ID do Perfil"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={TextField}
                                                            name="possiveisCarreiras"
                                                            label="Possíveis Carreiras (separadas por vírgula)"
                                                            variant="standard"
                                                            size="small"
                                                            fullWidth
                                                            required
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={Select}
                                                            name="areaId"
                                                            label="Área"
                                                            variant="standard"
                                                            fullWidth
                                                            required
                                                        >
                                                            <MenuItem value={1}>Tecnologia</MenuItem>
                                                            <MenuItem value={2}>Saúde</MenuItem>
                                                            <MenuItem value={3}>Engenharia</MenuItem>
                                                        </Field>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={Select}
                                                            name="tipo"
                                                            label="Tipo de Instituição"
                                                            variant="standard"
                                                            fullWidth
                                                            required
                                                        >
                                                            <MenuItem value="SUPERIOR">Superior</MenuItem>
                                                            <MenuItem value="TECNICO">Técnico</MenuItem>
                                                            <MenuItem value="AMBOS">Técnico e Superior</MenuItem>
                                                        </Field>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            component={Select}
                                                            name="empregabilidade"
                                                            label="Nível de Empregabilidade"
                                                            variant="standard"
                                                            fullWidth
                                                            required
                                                        >
                                                            <MenuItem value="ALTA">Alta</MenuItem>
                                                            <MenuItem value="MEDIA">Média</MenuItem>
                                                            <MenuItem value="BAIXA">Baixa</MenuItem>
                                                        </Field>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Box>

                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                            sx={{ marginBottom: 10 }}
                                        >
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    variant="contained"
                                                    sx={{
                                                        fontSize: '20px',
                                                        fontFamily: 'Roboto, monospace',
                                                        color: 'white',
                                                        backgroundColor: '#185D8E',
                                                        fontWeight: 'bold',
                                                        width: '100%',
                                                        height: '45px',
                                                    }}
                                                >
                                                    Cadastrar Curso
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                </Box>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default CadastroCursoSimplificado;
