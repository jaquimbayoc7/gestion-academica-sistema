/**
 * ============================================================
 * DTO: Data Transfer Object para CREAR un Estudiante
 * ============================================================
 *
 * ¿QUÉ ES UN DTO?
 *   Es una clase que define la FORMA EXACTA de los datos que el cliente
 *   debe enviar en el body de la petición POST. Sirve para:
 *   1. Documentar qué campos se esperan
 *   2. Validar automáticamente los datos con class-validator
 *   3. Tipar los datos en TypeScript
 *
 * DECORADORES DE VALIDACIÓN (class-validator):
 *   @IsString()    → El campo debe ser un string
 *   @IsEmail()     → El campo debe tener formato de email válido
 *   @IsDateString()→ El campo debe ser una fecha en formato ISO ("2000-01-15")
 *   @IsInt()        → El campo debe ser un número entero
 *
 * EJEMPLO DE BODY VÁLIDO:
 *   {
 *     "nombres": "Juan Carlos",
 *     "apellidos": "Pérez Gómez",
 *     "codigoEstudiantil": "EST-2026-001",
 *     "documentoIdentidad": "1234567890",
 *     "correoInstitucional": "juan.perez@corhuila.edu.co",
 *     "fechaNacimiento": "2000-05-15",
 *     "programaAcademicoId": 1
 *   }
 *
 * SI EL BODY ES INVÁLIDO (ej: falta "nombres"), el ValidationPipe retorna:
 *   { statusCode: 400, message: ["nombres must be a string"] }
 */
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
