import { IsString, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePeriodoDto {
  // TODO: HU-05
  @IsString()
  nombre: string;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
