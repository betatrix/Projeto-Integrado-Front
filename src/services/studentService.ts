import { StudentRegisterForm } from '../types/studentTypes';
import { cadastrarEstudante, recuperarSenha } from './apiService';

export const cadastroEstudante = async (estudanteData: StudentRegisterForm) => {
    const response = await cadastrarEstudante('estudante', estudanteData);
    return response;
};

export const recuperacaoSenha = async (email: string) => {
    const response = await recuperarSenha(email);
    return response;
};
