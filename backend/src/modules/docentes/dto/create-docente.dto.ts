import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateDocenteDto {
  // TODO: HU-02 — agregar validaciones class-validator
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  documentoIdentidad: string;

  @IsString()
  tituloProfesional: string;

  @IsString()
  especialidad: string;

  @IsEmail()
  correoInstitucional: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
