import { Module } from '@nestjs/common';
import { DocentesController } from './controller/docentes.controller';
import { DocentesService } from './service/docentes.service';
import { DocentesRepository } from './repository/docentes.repository';

@Module({
  controllers: [DocentesController],
  providers: [DocentesService, DocentesRepository],
})
export class DocentesModule {}
