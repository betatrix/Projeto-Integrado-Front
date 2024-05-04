
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Box, Typography } from '@mui/material';
import { TextField } from 'formik-mui';
import axios from 'axios';
import { InstituicaoForm } from '../../types/institutionTypes';
import { useNavigate } from 'react-router-dom';
import { cadastrarInstituicao } from '../../services/institutionService';
import * as Yup from "yup";

interface FormValues extends InstituicaoForm {
  endereco: {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export const CadastroInstituicao = () => {
  const navigate = useNavigate();
  
  const handleNavigateBack = () => navigate('/pagina-inicial');
  const handleNavigateForward = () => navigate('/cursos');
  
  const initialValues: FormValues = {
    nome: '',
    site: '',
    notaMec: null, 
    sigla: '',
    endereco: {
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required('O nome da instituição é obrigatório'),
  site: Yup.string().required('O site é obrigatório'),  // Simplificado sem validação de URL
  notaMec: Yup.number()
    .nullable()
    .typeError('A nota MEC deve ser um número')
    .min(1, 'A nota MEC deve ser no mínimo 1')
    .max(5, 'A nota MEC deve ser no máximo 5')
    .required('A nota MEC é obrigatória'),
  sigla: Yup.string()
    .matches(/^[A-Z]+$/, 'A sigla deve estar em letras maiúsculas')
    .required('A sigla é obrigatória'),
  endereco: Yup.object().shape({
    cep: Yup.string()
      .max(8, 'O CEP deve ter no máximo 8 caracteres')
      .required('O CEP é obrigatório'),
    logradouro: Yup.string().required('O logradouro é obrigatório'),
    numero: Yup.string().required('O número é obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('O bairro é obrigatório'),
    cidade: Yup.string().required('A cidade é obrigatória'),
    estado: Yup.string().required('O estado é obrigatório'),
    })
  });


  const handleCepChange = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    const cep = event.target.value.replace(/\D/g, '');
    setFieldValue('endereco.cep', cep);

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
        setFieldValue('endereco.logradouro', logradouro);
        setFieldValue('endereco.bairro', bairro);
        setFieldValue('endereco.cidade', localidade);
        setFieldValue('endereco.estado', uf);
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await cadastrarInstituicao(values);
      console.log('Instituição cadastrada com sucesso:', response);
      handleNavigateForward();
     
    } catch (error) {
      console.error('Erro ao cadastrar instituição:', error);
    }
    setSubmitting(false);
  };

 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" sx={{ textAlign: 'center' }}>Cadastro de Instituição</Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <Field component={TextField} name="nome" label="Nome da Instituição" variant="outlined" fullWidth required/>
            <Field component={TextField} name="site" label="Site" variant="outlined" fullWidth required/>
            <Field component={TextField} name="notaMec" type="number" label="Nota MEC" variant="outlined" fullWidth required/>
            <Field component={TextField} name="sigla" label="Sigla" variant="outlined" fullWidth required/>
            <Field component={TextField} name="endereco.cep" label="CEP" variant="outlined" fullWidth required onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCepChange(event, setFieldValue)} />
            <Field component={TextField} name="endereco.logradouro" label="Logradouro" variant="outlined" fullWidth required />
            <Field component={TextField} name="endereco.numero" label="Número" variant="outlined" fullWidth required />
            <Field component={TextField} name="endereco.complemento" label="Complemento" variant="outlined" fullWidth />
            <Field component={TextField} name="endereco.bairro" label="Bairro" variant="outlined" fullWidth required />
            <Field component={TextField} name="endereco.cidade" label="Cidade" variant="outlined" fullWidth required />
            <Field component={TextField} name="endereco.estado" label="Estado" variant="outlined" fullWidth required />
            <Button type="button" variant="outlined" onClick={handleNavigateBack} sx={{ mt: 2, mr: 1 }}>
              Voltar
            </Button>
            <Button type="submit" disabled={isSubmitting} variant="contained" sx={{ mt: 2 }}>
              Avançar
            </Button>
          </Form>
        )}
      </Formik>
      
    

    </Box>
  );
};



































