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
