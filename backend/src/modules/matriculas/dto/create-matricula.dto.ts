/**
 * DTO para CREAR una Matrícula.
 *
 * Solo requiere 2 IDs:
 *   - estudianteId: ¿QUIÉN se matricula?
 *   - asignacionDocenteId: ¿EN QUÉ se matricula? (asignatura+docente+periodo)
 *
 * La fechaInscripcion se asigna automáticamente en la BD con @default(now()).
 *
 * VALIDACIÓN:
 *   - El Service verifica que no exista ya la combinación estudianteId+asignacionDocenteId.
 *   - Si alguna FK no existe, Prisma lanza P2003.
 */
import { IsInt } from 'class-validator';

export class CreateMatriculaDto {
  // TODO: HU-07
  @IsInt()
  estudianteId: number;

  @IsInt()
  asignacionDocenteId: number;
}
