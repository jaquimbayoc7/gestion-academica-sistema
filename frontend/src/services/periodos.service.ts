/**
 * SERVICIO FRONTEND DE PERÍODOS ACADÉMICOS
 * CRUD completo. Al crear/actualizar con activo=true, el backend
 * desactiva automáticamente los demás períodos.
 */
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { PeriodoAcademico } from '@/interfaces/periodo-academico.interface';

export const periodosService = {
  findAll: () => apiGet<PeriodoAcademico[]>('/periodos'),
  findOne: (id: number) => apiGet<PeriodoAcademico>(`/periodos/${id}`),
  create: (data: Omit<PeriodoAcademico, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiPost<PeriodoAcademico>('/periodos', data),
  update: (id: number, data: Partial<Omit<PeriodoAcademico, 'id' | 'createdAt' | 'updatedAt'>>) =>
    apiPut<PeriodoAcademico>(`/periodos/${id}`, data),
  remove: (id: number) => apiDelete<PeriodoAcademico>(`/periodos/${id}`),
};
