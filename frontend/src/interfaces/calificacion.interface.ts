/**
 * Interfaz de Calificación.
 * nota1, nota2, nota3 son opcionales porque se registran progresivamente.
 * notaDefinitiva se calcula automáticamente en el backend cuando las 3 notas existen.
 * matricula? incluye los datos del estudiante y la asignatura (nested include).
 */
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
