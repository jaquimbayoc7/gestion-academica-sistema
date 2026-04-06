/**
 * Interfaz de Matrícula.
 * Vincula un Estudiante con una AsignacionDocente.
 * fechaInscripcion se asigna automáticamente al crear.
 * Las relaciones opcionales (?) vienen cuando el backend hace include/join.
 */
import type { Estudiante } from './estudiante.interface';
import type { AsignacionDocente } from './asignacion-docente.interface';
import type { Calificacion } from './calificacion.interface';

export interface Matricula {
  id: number;
  estudianteId: number;
  asignacionDocenteId: number;
  fechaInscripcion: string;
  estudiante?: Estudiante;
  asignacionDocente?: AsignacionDocente;
  calificacion?: Calificacion;
  createdAt: string;
  updatedAt: string;
}
