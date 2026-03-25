import { IsInt } from 'class-validator';

export class CreateMatriculaDto {
  // TODO: HU-07
  @IsInt()
  estudianteId: number;

  @IsInt()
  asignacionDocenteId: number;
}
