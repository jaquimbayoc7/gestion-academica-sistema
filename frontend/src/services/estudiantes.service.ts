/**
 * SERVICIO FRONTEND DE ESTUDIANTES
 *
 * Capa intermedia entre los componentes React y las funciones de API.
 * Centraliza todas las llamadas HTTP relacionadas con estudiantes.
 *
 * PATRÓN: Cada servicio exporta un objeto con métodos CRUD.
 * Los componentes lo usan así:
 *   const data = await estudiantesService.findAll();
 *   const nuevo = await estudiantesService.create({ nombres: 'Juan', ... });
 *
 * TIPADO:
 *   Omit<Estudiante, 'id' | 'createdAt' | 'updatedAt' | 'programaAcademico'>
 *   Esto significa: "todos los campos de Estudiante EXCEPTO id, createdAt, etc."
 *   Se usa en create() porque esos campos los genera el backend.
 *
 *   Partial<...>: Hace todos los campos opcionales (para actualización parcial).
 */
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Estudiante } from '@/interfaces/estudiante.interface';

export const estudiantesService = {
  findAll: () => apiGet<Estudiante[]>('/estudiantes'),
  findOne: (id: number) => apiGet<Estudiante>(`/estudiantes/${id}`),
  create: (data: Omit<Estudiante, 'id' | 'createdAt' | 'updatedAt' | 'programaAcademico'>) =>
    apiPost<Estudiante>('/estudiantes', data),
  update: (id: number, data: Partial<Omit<Estudiante, 'id' | 'createdAt' | 'updatedAt' | 'programaAcademico'>>) =>
    apiPut<Estudiante>(`/estudiantes/${id}`, data),
  remove: (id: number) => apiDelete<Estudiante>(`/estudiantes/${id}`),
  /** HU-14: Historial académico del estudiante agrupado por período */
  historial: (id: number) => apiGet<any>(`/estudiantes/${id}/historial`),
  /** HU-16: Promedio acumulado ponderado por créditos */
  promedioAcumulado: (id: number) => apiGet<any>(`/estudiantes/${id}/promedio`),
};
