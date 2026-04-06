/**
 * DTO para CREAR un Período Académico.
 *
 * Campos: nombre (UNIQUE, ej: "2026-A"), fechaInicio, fechaFin, activo (opcional, default: false).
 * Las fechas se envían como string ISO ("2026-01-15") y se convierten a Date en el Repository.
 * Si activo=true, el Service desactiva automáticamente todos los demás períodos.
 */
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
