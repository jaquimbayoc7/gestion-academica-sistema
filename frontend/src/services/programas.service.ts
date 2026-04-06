import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { ProgramaAcademico } from '@/interfaces/programa-academico.interface';

export const programasService = {
  findAll: () => apiGet<ProgramaAcademico[]>('/programas'),
  findOne: (id: number) => apiGet<ProgramaAcademico>(`/programas/${id}`),
  create: (data: Omit<ProgramaAcademico, 'id' | 'createdAt' | 'updatedAt'>) =>
    apiPost<ProgramaAcademico>('/programas', data),
  update: (id: number, data: Partial<Omit<ProgramaAcademico, 'id' | 'createdAt' | 'updatedAt'>>) =>
    apiPut<ProgramaAcademico>(`/programas/${id}`, data),
  remove: (id: number) => apiDelete<ProgramaAcademico>(`/programas/${id}`),
};
