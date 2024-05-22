import { buscarEntidades, buscarEntidadePorId } from './apiService';

export const buscarPoliticas = async () => {
    const response = await buscarEntidades('politica/ativos');
    return response;
};

export const buscarpoliticaPorId = async (id: number) => {
    return await buscarEntidadePorId('politica', id);
};
