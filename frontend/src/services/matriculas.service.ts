import { apiGet, apiPost, apiDelete } from '@/lib/api';
import type { Matricula } from '@/interfaces/matricula.interface';

export const matriculasService = {
  findAll: () => apiGet<Matricula[]>('/matriculas'),
  findOne: (id: number) => apiGet<Matricula>(`/matriculas/${id}`),
  create: (data: { estudianteId: number; asignacionDocenteId: number }) =>
    apiPost<Matricula>('/matriculas', data),
  remove: (id: number) => apiDelete<Matricula>(`/matriculas/${id}`),
};
