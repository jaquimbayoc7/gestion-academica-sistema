/**
 * DTO para CREAR un Docente.
 *
 * Campos requeridos: nombres, apellidos, documentoIdentidad,
 *   tituloProfesional, especialidad, correoInstitucional
 * Campo opcional: telefono (puede ser null o no enviarse)
 *
 * CAMPOS UNIQUE en BD: documentoIdentidad, correoInstitucional
 *   → Si se duplican, el Service retorna HTTP 409 (Conflict).
 */
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
