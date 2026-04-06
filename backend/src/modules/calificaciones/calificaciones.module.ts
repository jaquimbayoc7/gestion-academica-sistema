/**
 * MÓDULO DE CALIFICACIONES
 *
 * Permite registrar y actualizar las notas de cada matrícula.
 * Cada matrícula tiene MÁXIMO UNA calificación (relación 1:1, matriculaId es UNIQUE).
 *
 * FÓRMULA DE NOTA DEFINITIVA:
 *   notaDefinitiva = (nota1 × 0.30) + (nota2 × 0.30) + (nota3 × 0.40)
 *
 * Se calcula automáticamente en el Service cuando las 3 notas están registradas.
 * Si falta alguna nota, notaDefinitiva queda como null.
 *
 * NOTA: No hay endpoint DELETE porque las calificaciones no se eliminan,
 *   solo se editan (PUT) mientras el período esté activo.
 */
import { Module } from '@nestjs/common';
import { CalificacionesController } from './controller/calificaciones.controller';
import { CalificacionesService } from './service/calificaciones.service';
import { CalificacionesRepository } from './repository/calificaciones.repository';

@Module({
  controllers: [CalificacionesController],
  providers: [CalificacionesService, CalificacionesRepository],
})
export class CalificacionesModule {}
