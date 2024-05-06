//courseService.ts na pasta service

//import { CourseForm } from '../types/courseTypes';
import { buscarEntidades, buscarEntidadePorId } from './apiService';

export const buscarCursos = async () => {
  const response = await buscarEntidades('curso');
  return response;
};

// Buscar curso por ID
export const buscarCursoPorId = async (id: number) => {
    return await buscarEntidadePorId('curso', id);
  };


