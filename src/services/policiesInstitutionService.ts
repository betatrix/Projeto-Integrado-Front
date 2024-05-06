import { cadastrarEntidade } from './apiService';

export const cadastrarPoliticasInstituicao = async (instituicaoId: number, politicaId: number) => {
    //console.log("Enviando dados para cadastro:", { instituicaoId, politicaId });
    const response = await cadastrarEntidade('politicaInstituicao', {
        instituicaoId,
        politicaId
    })
    console.log(response)
    return response

}