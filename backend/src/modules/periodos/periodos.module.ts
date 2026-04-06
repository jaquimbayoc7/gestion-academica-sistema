/**
 * MÓDULO DE PERÍODOS ACADÉMICOS
 * Gestiona los períodos (ej: "2026-A", "2026-B").
 * REGLA DE NEGOCIO CLAVE: Solo puede existir UN período activo a la vez.
 */
import { Module } from '@nestjs/common';
import { PeriodosController } from './controller/periodos.controller';
import { PeriodosService } from './service/periodos.service';
import { PeriodosRepository } from './repository/periodos.repository';

@Module({
  controllers: [PeriodosController],
  providers: [PeriodosService, PeriodosRepository],
})
export class PeriodosModule {}
