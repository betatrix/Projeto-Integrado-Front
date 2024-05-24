import { buscarEntidades, buscarEntidadePorId, excluirEntidade, atualizarEntidade } from './apiService';

export const buscarCursos = async () => {
    const response = await buscarEntidades('curso/ativos');
    return response;
};

export const buscarCursoPorId = async (id: number) => {
    return await buscarEntidadePorId('curso', id);
};

export const excluirCurso = async (id:number) => {
    return await excluirEntidade('curso', id);
};

export const editarCurso = async (id: number, data: object) => {
    return await atualizarEntidade('curso', id, data);
};

