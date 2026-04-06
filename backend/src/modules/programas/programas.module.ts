/**
 * MÓDULO DE PROGRAMAS ACADÉMICOS
 * Gestiona los programas (Ing. Sistemas, Contaduría, etc.).
 * Los estudiantes y asignaturas se asocian a un programa.
 */
import { Module } from '@nestjs/common';
import { ProgramasController } from './controller/programas.controller';
import { ProgramasService } from './service/programas.service';
import { ProgramasRepository } from './repository/programas.repository';

@Module({
  controllers: [ProgramasController],
  providers: [ProgramasService, ProgramasRepository],
})
export class ProgramasModule {}
