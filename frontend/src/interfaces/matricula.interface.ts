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
