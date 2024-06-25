import axios from 'axios';

// variável de ambiente:
const API_URL = import.meta.env.VITE_API_URL;

// Cadastrar entidade
export const cadastrarEntidade = async (entidade: string, data: object) => {
    const response = await axios.post(`${API_URL}/${entidade}`, data);
    return response.data;
};

// Obter entidades
export const buscarEntidades = async (entidade: string) => {
    const response = await axios.get(`${API_URL}/${entidade}`);
    return response.data;
};

// Obter entidade por ID
export const buscarEntidadePorId = async (entidade: string, id: number) => {
    const response = await axios.get(`${API_URL}/${entidade}/${id}`);
    return response.data;
};

// Atualizar entidade
export const atualizarEntidade = async (entidade: string, id: number, data: object) => {
    const response = await axios.patch(`${API_URL}/${entidade}/${id}`, data);
    return response.data;
};

// Substituir entidade
export const substituirEntidade = async (entidade: string, id: number, data: object) => {
    const response = await axios.put(`${API_URL}/${entidade}/${id}`, data);
    return response.data;
};

// Excluir entidade
export const excluirEntidade = async (entidade: string, id: number) => {
    const response = await axios.delete(`${API_URL}/${entidade}/${id}`);
    return response.data;
};

// Cadastrar estudante
export const cadastrarEstudante = async (entidade: string, data: object) => {
    const response = await axios.post(`${API_URL}/${entidade}/cadastro`, data);
    return response.data;
};

// Enviar email para recuperação de senha
export const recuperarSenha = async (email: string) => {
    const response = await axios.post(`${API_URL}/auth/esqueceuSenha?email=${encodeURIComponent(email)}`);
    return response.data, response.status;
};

// Redefinir senha do estudante
export const redefinirSenha = async (token: string, senha:string) => {
    const response = await axios.post(`${API_URL}/auth/redefinirSenha?token=${encodeURIComponent(token)}&novaSenha=${encodeURIComponent(senha)}`);
    return response.data, response.status;
};