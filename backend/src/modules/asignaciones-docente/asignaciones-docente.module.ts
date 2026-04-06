/**
 * MÓDULO DE ASIGNACIONES DOCENTE
 *
 * Gestiona la relación ternaria: Docente + Asignatura + Período.
 * Ejemplo: "El profesor Juan dicta Cálculo I en el período 2026-A".
 *
 * RESTRICCIÓN UNIQUE COMPUESTA:
 *   @@unique([docenteId, asignaturaId, periodoAcademicoId])
 *   Un mismo docente NO puede ser asignado dos veces a la misma
 *   asignatura en el mismo período.
 */
import { Module } from '@nestjs/common';
import { AsignacionesDocenteController } from './controller/asignaciones-docente.controller';
import { AsignacionesDocenteService } from './service/asignaciones-docente.service';
import { AsignacionesDocenteRepository } from './repository/asignaciones-docente.repository';

@Module({
  controllers: [AsignacionesDocenteController],
  providers: [AsignacionesDocenteService, AsignacionesDocenteRepository],
})
export class AsignacionesDocenteModule {}
