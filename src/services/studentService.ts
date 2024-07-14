import { StudentLoginForm, StudentRegisterForm } from '../types/studentTypes';
import { cadastrarEstudante, recuperarSenha, redefinirSenha, loginConta } from './apiService';

export const cadastroEstudante = async (estudanteData: StudentRegisterForm) => {
    const response = await cadastrarEstudante('estudante', estudanteData);
    return response;
};

export const recuperacaoSenha = async (email: string) => {
    const response = await recuperarSenha(email);
    return response;
};

export const redefinicaoSenha = async (token: string, senha: string) => {
    const response = await redefinirSenha(token, senha);
    return response;
};

export const login = async (estudanteData:StudentLoginForm) => {
    const response = await loginConta('estudante', estudanteData);
    return response;
};