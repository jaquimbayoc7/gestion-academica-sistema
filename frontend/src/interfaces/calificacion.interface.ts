import type { Matricula } from './matricula.interface';

export interface Calificacion {
  id: number;
  matriculaId: number;
  nota1?: number;
  nota2?: number;
  nota3?: number;
  notaDefinitiva?: number;
  matricula?: Matricula;
  createdAt: string;
  updatedAt: string;
}
