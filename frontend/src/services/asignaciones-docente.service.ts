import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { AsignacionDocente } from '@/interfaces/asignacion-docente.interface';

export const asignacionesDocenteService = {
  findAll: () => apiGet<AsignacionDocente[]>('/asignaciones-docente'),
  findOne: (id: number) => apiGet<AsignacionDocente>(`/asignaciones-docente/${id}`),
  create: (data: { docenteId: number; asignaturaId: number; periodoAcademicoId: number }) =>
    apiPost<AsignacionDocente>('/asignaciones-docente', data),
  update: (id: number, data: Partial<{ docenteId: number; asignaturaId: number; periodoAcademicoId: number }>) =>
    apiPut<AsignacionDocente>(`/asignaciones-docente/${id}`, data),
  remove: (id: number) => apiDelete<AsignacionDocente>(`/asignaciones-docente/${id}`),
};
