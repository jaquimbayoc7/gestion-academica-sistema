/**
 * Interfaz del Docente. telefono es opcional (String? en Prisma).
 * createdAt/updatedAt son strings porque JSON no tiene tipo Date;
 * el backend los serializa como ISO strings ("2026-04-06T10:30:00.000Z").
 */
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidad: string;
  tituloProfesional: string;
  especialidad: string;
  correoInstitucional: string;
  telefono?: string;
  createdAt: string;
  updatedAt: string;
}
