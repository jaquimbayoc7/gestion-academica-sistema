/**
 * ============================================================
 * DTO: Data Transfer Object para ACTUALIZAR un Estudiante
 * ============================================================
 *
 * PartialType(CreateEstudianteDto) genera automáticamente una clase
 * donde TODOS los campos de CreateEstudianteDto son OPCIONALES.
 *
 * Esto permite actualizar solo los campos que se envían:
 *   PUT /api/v1/estudiantes/1  { "nombres": "Juan" }  → Solo actualiza el nombre
 *   PUT /api/v1/estudiantes/1  { "correoInstitucional": "nuevo@mail.co" }  → Solo el correo
 *
 * Las validaciones de cada campo se HEREDAN de CreateEstudianteDto,
 * pero al ser opcionales, solo se validan si se envían.
 */
import { PartialType } from '@nestjs/mapped-types';
import { CreateEstudianteDto } from './create-estudiante.dto';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {}
