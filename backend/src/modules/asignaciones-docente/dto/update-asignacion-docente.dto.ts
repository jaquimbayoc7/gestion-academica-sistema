import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignacionDocenteDto } from './create-asignacion-docente.dto';

export class UpdateAsignacionDocenteDto extends PartialType(
  CreateAsignacionDocenteDto,
) {}
