export type Area = {
  id?:number;
  descricao: string;
};

export type CourseForm = {
    descricao: string;
    empregabilidade?: string;
    // empregabilidade: NivelEmpregabilidade;
    tipoInstituicaoCurso: TipoInstituicaoCurso;
    possiveisCarreiras?: string [];
    area?: Area;
    areaId?:number;
    id: number;
    ativo?: string | boolean;
  };

export enum NivelEmpregabilidade {
    ALTA = 'ALTA',
    MEDIA = 'MEDIA',
    EM_QUEDA = 'EMQUEDA',
    BAIXA = 'BAIXA',
}

export enum TipoInstituicaoCurso {
  INDEFINIDO = 'Selecione o Tipo de Ensino',
  SUPERIOR = 'SUPERIOR',
  TECNICO = 'TECNICO',
  AMBOS = 'AMBOS',
}