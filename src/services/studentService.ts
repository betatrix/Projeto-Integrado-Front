import { StudentRegisterForm } from '../types/studentTypes';
import { cadastrarEstudante } from './apiService';

export const cadastroEstudante = async (estudanteData: StudentRegisterForm) => {
    const response = await cadastrarEstudante('estudante', estudanteData);
    return response;
};
