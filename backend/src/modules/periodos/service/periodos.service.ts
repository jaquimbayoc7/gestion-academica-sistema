import { Injectable } from '@nestjs/common';
import { PeriodosRepository } from '../repository/periodos.repository';
import { CreatePeriodoDto } from '../dto/create-periodo.dto';
import { UpdatePeriodoDto } from '../dto/update-periodo.dto';

@Injectable()
export class PeriodosService {
  constructor(private readonly periodosRepository: PeriodosRepository) {}

  findAll() {
    // TODO: HU-05
    return this.periodosRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-05
    return this.periodosRepository.findOne(id);
  }

  create(dto: CreatePeriodoDto) {
    // TODO: HU-05 — lógica: solo un período activo a la vez
    return this.periodosRepository.create(dto);
  }

  update(id: number, dto: UpdatePeriodoDto) {
    // TODO: HU-05 — lógica: solo un período activo a la vez
    return this.periodosRepository.update(id, dto);
  }

  remove(id: number) {
    // TODO: HU-05
    return this.periodosRepository.remove(id);
  }
}
