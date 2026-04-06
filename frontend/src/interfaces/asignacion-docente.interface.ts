/**
 * Interfaz de Asignación Docente.
 * Vincula Docente + Asignatura + Período.
 * Las relaciones opcionales (?) se incluyen cuando el backend hace triple JOIN.
 */
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
