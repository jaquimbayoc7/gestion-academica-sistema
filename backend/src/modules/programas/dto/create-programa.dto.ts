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
