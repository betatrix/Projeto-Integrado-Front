import { buscarEntidades, buscarEntidadePorId } from './apiService';

export const buscarCursos = async () => {
  const response = await buscarEntidades('curso/ativos');
  return response;
};

export const buscarCursoPorId = async (id: number) => {
  return await buscarEntidadePorId('curso', id);
};


