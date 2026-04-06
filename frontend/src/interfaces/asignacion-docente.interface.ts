import type { Docente } from './docente.interface';
import type { Asignatura } from './asignatura.interface';
import type { PeriodoAcademico } from './periodo-academico.interface';

export interface AsignacionDocente {
  id: number;
  docenteId: number;
  asignaturaId: number;
  periodoAcademicoId: number;
  docente?: Docente;
  asignatura?: Asignatura;
  periodoAcademico?: PeriodoAcademico;
  createdAt: string;
  updatedAt: string;
}
