export interface Receita {
  id: string;
  nome: string;
  modoPreparo: string;
  tempoPreparo: string;
  porcoes: string;
  dificuldade: string;
  categoria: string;
  imagem?: string;
}