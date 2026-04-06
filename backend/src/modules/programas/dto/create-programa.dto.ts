/**
 * DTO para CREAR un Programa Académico.
 *
 * Campos: nombre, codigo (UNIQUE), facultad, duracionSemestres (mínimo 1).
 * @Min(1) impide crear programas con duración 0 o negativa.
 */
import { IsString, IsInt, Min } from 'class-validator';

export class CreateProgramaDto {
  // TODO: HU-03 — agregar validaciones class-validator
  @IsString()
  nombre: string;

  @IsString()
  codigo: string;

  @IsString()
  facultad: string;

  @IsInt()
  @Min(1)
  duracionSemestres: number;
}
