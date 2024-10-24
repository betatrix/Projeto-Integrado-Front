import { cadastrarEntidade, excluirEntidade } from './apiService';

export const cadastrarCursoInstituicao = async (instituicaoId: number, notaMec: number | null, cursoId: number) => {
    console.log('Enviando dados para cadastro:', { instituicaoId, notaMec, cursoId });
    const response = await cadastrarEntidade('cursoInstituicao', {
        instituicaoId,
        notaMec,
        cursoId
    });
    console.log(response);
    return response;

};

export const excluirCursoInstituicao = async (id: number) => {
    return await excluirEntidade('cursoInstituicao', id );
};
