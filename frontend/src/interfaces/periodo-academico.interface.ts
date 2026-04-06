/**
 * Interfaz de Período Académico.
 * activo: boolean → Solo un período puede estar activo a la vez.
 * El frontend muestra un badge "Activo"/"Inactivo" según este campo.
 */
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
