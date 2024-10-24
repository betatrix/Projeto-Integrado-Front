import { cadastrarEntidade, excluirEntidade } from './apiService';

export const cadastrarPoliticasInstituicao = async (instituicaoId: number, politicaId: number) => {
    const response = await cadastrarEntidade('politicaInstituicao', {
        instituicaoId,
        politicaId
    });
    console.log(response);
    return response;

};

export const excluirPoliticasInstituicao = async (id: number) => {
    return await excluirEntidade('cursoInstituicao', id );
};