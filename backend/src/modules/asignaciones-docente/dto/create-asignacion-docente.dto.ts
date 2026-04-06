/**
 * DTO para CREAR una Asignación Docente.
 *
 * Solo contiene 3 IDs (Foreign Keys):
 *   - docenteId: ID del docente que dictará la materia
 *   - asignaturaId: ID de la asignatura a dictar
 *   - periodoAcademicoId: ID del período académico
 *
 * VALIDACIÓN DE UNICIDAD COMPUESTA:
 *   No puede existir la misma combinación docente+asignatura+periodo.
 *   Esta validación se hace en el Service con findByCompound().
 *
 * VALIDACIÓN DE FKs:
 *   Si alguna FK no existe, Prisma lanza P2003.
 *   El Service lo captura y retorna NotFoundException.
 */
import { IsInt } from 'class-validator';

export class CreateAsignacionDocenteDto {
  // TODO: HU-06
  @IsInt()
  docenteId: number;

  @IsInt()
  asignaturaId: number;

  @IsInt()
  periodoAcademicoId: number;
}
