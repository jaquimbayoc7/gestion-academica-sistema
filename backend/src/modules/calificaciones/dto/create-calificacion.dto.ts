/**
 * DTO para CREAR una Calificación.
 *
 * Campos:
 *   - matriculaId (requerido): FK a la matrícula del estudiante
 *   - nota1, nota2, nota3 (opcionales): Notas parciales del 0.0 al 5.0
 *
 * Las notas son opcionales porque pueden registrarse progresivamente:
 *   1. Primero solo nota1 → notaDefinitiva queda null
 *   2. Luego nota2 con PUT → aún null
 *   3. Finalmente nota3 con PUT → se calcula notaDefinitiva
 *
 * VALIDACIONES:
 *   @Min(0) y @Max(5): Las notas deben estar entre 0.0 y 5.0
 *   @IsNumber(): Acepta decimales (ej: 3.5, 4.8)
 *   @IsOptional(): No es obligatorio enviarlas al crear
 */
import { IsInt, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateCalificacionDto {
  // TODO: HU-08
  @IsInt()
  matriculaId: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  nota1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  nota2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  nota3?: number;
}
