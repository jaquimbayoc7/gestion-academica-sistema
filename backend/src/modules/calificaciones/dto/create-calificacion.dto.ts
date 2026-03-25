import { IsInt, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateCalificacionDto {
  // TODO: HU-08
  @IsInt()
  matriculaId: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  nota1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  nota2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  nota3?: number;
}
