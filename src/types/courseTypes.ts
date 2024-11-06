
export type Area = {
  id:number;
  descricao: string;
};
// export type Perfil ={
//   id?: number;
//   descricao: string;
// }

export type CourseForm = {
    descricao: string;
    empregabilidade: NivelEmpregabilidade;
    tipo: TipoInstituicaoCurso;
    possiveisCarreiras?: string[];
    area?: Area;
    // areaId?:number;
    // perfil?: string; // Alterado para string
    // perfilId?: number; // Você pode remover este campo se ele não for mais necessário
    id: number;
    ativo?: string | boolean;
  };

export type CourseFormCad = {
    descricao: string;
    empregabilidade: string;
    // empregabilidade: NivelEmpregabilidade;
    tipo: TipoInstituicaoCurso;
    possiveisCarreiras?: string[];
    area?: Area;
    areaId?:number;
    perfil?: string; // Alterado para string
    perfilId?: number; // Você pode remover este campo se ele não for mais necessário
    ativo?: string | boolean;
  };

export enum NivelEmpregabilidade {
    INDEFINIDO = 'Selecione a empregabilidade',
    ALTA = 'Alta',
    MEDIA = 'Média',
    BAIXA = 'Baixa',
    EM_QUEDA = 'Em Queda',
}

export enum TipoInstituicaoCurso {
  INDEFINIDO = 'Selecione o Tipo de Ensino',
  SUPERIOR = 'Superior',
  TECNICO = 'Técnico',
  AMBOS = 'Ambos',
}