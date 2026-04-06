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
