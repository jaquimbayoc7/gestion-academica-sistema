/**
 * SERVICIO FRONTEND DE DOCENTES
 * Mismo patrón que estudiantes: objeto con métodos CRUD tipados.
 */
import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Docente } from '@/interfaces/docente.interface';

export const docentesService = {
  findAll: () => apiGet<Docente[]>('/docentes'),
  findOne: (id: number) => apiGet<Docente>(`/docentes/${id}`),
  create: (data: Omit<Docente, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiPost<Docente>('/docentes', data),
  update: (id: number, data: Partial<Omit<Docente, 'id' | 'createdAt' | 'updatedAt'>>) =>
    apiPut<Docente>(`/docentes/${id}`, data),
  remove: (id: number) => apiDelete<Docente>(`/docentes/${id}`),
};
