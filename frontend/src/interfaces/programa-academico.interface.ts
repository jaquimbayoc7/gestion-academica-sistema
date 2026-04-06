/**
 * Interfaz de Programa Académico.
 * Es la entidad padre: Estudiantes y Asignaturas pertenecen a un Programa.
 */
export interface ProgramaAcademico {
  id: number;
  nombre: string;
  codigo: string;
  facultad: string;
  duracionSemestres: number;
  createdAt: string;
  updatedAt: string;
}
