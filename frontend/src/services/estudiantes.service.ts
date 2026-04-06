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
};
