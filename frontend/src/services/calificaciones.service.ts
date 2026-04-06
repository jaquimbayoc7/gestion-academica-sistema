import { apiGet, apiPost, apiPut } from '@/lib/api';
import type { Calificacion } from '@/interfaces/calificacion.interface';

export const calificacionesService = {
  findAll: () => apiGet<Calificacion[]>('/calificaciones'),
  findOne: (id: number) => apiGet<Calificacion>(`/calificaciones/${id}`),
  create: (data: { matriculaId: number; nota1?: number; nota2?: number; nota3?: number }) =>
    apiPost<Calificacion>('/calificaciones', data),
  update: (id: number, data: { nota1?: number; nota2?: number; nota3?: number }) =>
    apiPut<Calificacion>(`/calificaciones/${id}`, data),
};
