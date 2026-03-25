import { Module } from '@nestjs/common';
import { MatriculasController } from './controller/matriculas.controller';
import { MatriculasService } from './service/matriculas.service';
import { MatriculasRepository } from './repository/matriculas.repository';

@Module({
  controllers: [MatriculasController],
  providers: [MatriculasService, MatriculasRepository],
})
export class MatriculasModule {}
