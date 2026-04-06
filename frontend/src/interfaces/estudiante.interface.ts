/**
 * Interfaz TypeScript que define la forma del objeto Estudiante en el frontend.
 * Refleja exactamente la estructura que retorna el backend en el campo `data`.
 *
 * Campos opcionales (con ?):
 *   programaAcademico?: Solo viene cuando el backend hace include en la consulta.
 *   Si se consulta una lista simple, podría no venir.
 */
import type { ProgramaAcademico } from './programa-academico.interface';

export interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  codigoEstudiantil: string;
  documentoIdentidad: string;
  correoInstitucional: string;
  fechaNacimiento: string;
  programaAcademicoId: number;
  programaAcademico?: ProgramaAcademico;
  createdAt: string;
  updatedAt: string;
}
