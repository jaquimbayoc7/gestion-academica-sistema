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
