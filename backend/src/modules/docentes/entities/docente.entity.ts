export class DocenteEntity {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidad: string;
  tituloProfesional: string;
  especialidad: string;
  correoInstitucional: string;
  telefono?: string;
  createdAt: Date;
  updatedAt: Date;
}
