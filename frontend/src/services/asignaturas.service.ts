import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Asignatura } from '@/interfaces/asignatura.interface';

export const asignaturasService = {
  findAll: () => apiGet<Asignatura[]>('/asignaturas'),
  findOne: (id: number) => apiGet<Asignatura>(`/asignaturas/${id}`),
  create: (data: Omit<Asignatura, 'id' | 'createdAt' | 'updatedAt' | 'programaAcademico'>) =>
    apiPost<Asignatura>('/asignaturas', data),
  update: (id: number, data: Partial<Omit<Asignatura, 'id' | 'createdAt' | 'updatedAt' | 'programaAcademico'>>) =>
    apiPut<Asignatura>(`/asignaturas/${id}`, data),
  remove: (id: number) => apiDelete<Asignatura>(`/asignaturas/${id}`),
};
