import { buscarEntidades, buscarEntidadePorId } from './apiService';

export const buscarPoliticas = async () => {
  const response = await buscarEntidades('politica');
  return response;
};

export const buscarpoliticaPorId = async (id: number) => {
    return await buscarEntidadePorId('politica', id);
  };
