import { buscarEntidades, buscarEntidadePorId, excluirEntidade, substituirEntidade} from './apiService';
import { AdmForm, UserForm} from '../../src/types/userTypes';

export const buscarUsuarios = async () => {
    const response = await buscarEntidades('estudante');
    return response;
};

export const buscarUsuarioPorId = async (id: number) => {
    return await buscarEntidadePorId('estudante', id);
};

export const excluirUsuario = async (id: number) => {
    return await excluirEntidade('estudante', id);
};

export const editarUsuario = async (userData: UserForm) => {
    return await substituirEntidade('estudante', userData);
};

export const buscarAdministrador = async () => {
    const response = await buscarEntidades('administrador');
    return response;
};

export const buscarAdministradorPorId = async (id: number) => {
    return await buscarEntidadePorId('administrador', id);
};

export const excluirAdministrador = async (id: number) => {
    return await excluirEntidade('administrador', id);
};

export const editarAdministrador = async (userData: AdmForm) => {
    return await substituirEntidade('administrador', userData);
};
