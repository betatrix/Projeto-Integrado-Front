
export type CourseForm = {
    descricao: string;
    empregabilidade: string;
    possiveisCarreiras: string [];
    area: Area;
    id: number;
    ativo: string;
  };

export type Area = {
    descricao: string;
  };
