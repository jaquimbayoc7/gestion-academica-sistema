/**
 * Interfaz de Asignatura.
 * Pertenece a un ProgramaAcademico (FK: programaAcademicoId).
 * programaAcademico? viene cuando el backend incluye la relación.
 */
import type { ProgramaAcademico } from './programa-academico.interface';

export interface Asignatura {
  id: number;
  nombre: string;
  codigo: string;
  creditos: number;
  programaAcademicoId: number;
  programaAcademico?: ProgramaAcademico;
  createdAt: string;
  updatedAt: string;
}
