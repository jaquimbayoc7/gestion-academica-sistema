import { Module } from '@nestjs/common';
import { CalificacionesController } from './controller/calificaciones.controller';
import { CalificacionesService } from './service/calificaciones.service';
import { CalificacionesRepository } from './repository/calificaciones.repository';

@Module({
  controllers: [CalificacionesController],
  providers: [CalificacionesService, CalificacionesRepository],
})
export class CalificacionesModule {}
