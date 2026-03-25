import { IsString, IsEmail, IsInt, IsDateString } from 'class-validator';

export class CreateEstudianteDto {
  // TODO: HU-01 — agregar validaciones class-validator
  @IsString()
  nombres: string;

  @IsString()
  apellidos: string;

  @IsString()
  codigoEstudiantil: string;

  @IsString()
  documentoIdentidad: string;

  @IsEmail()
  correoInstitucional: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsInt()
  programaAcademicoId: number;
}
