/**
 * MÓDULO DE ASIGNATURAS
 * Gestiona las materias de cada programa académico.
 * Cada asignatura pertenece a un programa (FK: programaAcademicoId).
 */
import { Module } from '@nestjs/common';
import { AsignaturasController } from './controller/asignaturas.controller';
import { AsignaturasService } from './service/asignaturas.service';
import { AsignaturasRepository } from './repository/asignaturas.repository';

@Module({
  controllers: [AsignaturasController],
  providers: [AsignaturasService, AsignaturasRepository],
})
export class AsignaturasModule {}
