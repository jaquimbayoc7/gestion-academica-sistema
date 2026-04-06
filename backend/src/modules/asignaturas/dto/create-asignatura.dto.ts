/**
 * DTO para CREAR una Asignatura.
 *
 * Campos: nombre, codigo (UNIQUE), creditos (mínimo 1), programaAcademicoId (FK).
 * El programaAcademicoId debe referenciar un programa existente.
 * Si no existe, Prisma lanza error P2003 (FK violation).
 */
import { IsString, IsInt, Min } from 'class-validator';

export class CreateAsignaturaDto {
  // TODO: HU-04
  @IsString()
  nombre: string;

  @IsString()
  codigo: string;

  @IsInt()
  @Min(1)
  creditos: number;

  @IsInt()
  programaAcademicoId: number;
}
