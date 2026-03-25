import { Module } from '@nestjs/common';
import { AsignacionesDocenteController } from './controller/asignaciones-docente.controller';
import { AsignacionesDocenteService } from './service/asignaciones-docente.service';
import { AsignacionesDocenteRepository } from './repository/asignaciones-docente.repository';

@Module({
  controllers: [AsignacionesDocenteController],
  providers: [AsignacionesDocenteService, AsignacionesDocenteRepository],
})
export class AsignacionesDocenteModule {}
