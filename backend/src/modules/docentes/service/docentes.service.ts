import { Injectable } from '@nestjs/common';
import { DocentesRepository } from '../repository/docentes.repository';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private readonly docentesRepository: DocentesRepository) {}

  findAll() {
    // TODO: HU-02
    return this.docentesRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-02
    return this.docentesRepository.findOne(id);
  }

  create(dto: CreateDocenteDto) {
    // TODO: HU-02
    return this.docentesRepository.create(dto);
  }

  update(id: number, dto: UpdateDocenteDto) {
    // TODO: HU-02
    return this.docentesRepository.update(id, dto);
  }

  remove(id: number) {
    // TODO: HU-02
    return this.docentesRepository.remove(id);
  }
}
