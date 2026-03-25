import { Module } from '@nestjs/common';
import { PeriodosController } from './controller/periodos.controller';
import { PeriodosService } from './service/periodos.service';
import { PeriodosRepository } from './repository/periodos.repository';

@Module({
  controllers: [PeriodosController],
  providers: [PeriodosService, PeriodosRepository],
})
export class PeriodosModule {}
