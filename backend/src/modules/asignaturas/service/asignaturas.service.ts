import { Injectable } from '@nestjs/common';
import { AsignaturasRepository } from '../repository/asignaturas.repository';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Injectable()
export class AsignaturasService {
  constructor(private readonly asignaturasRepository: AsignaturasRepository) {}

  findAll() {
    // TODO: HU-04
    return this.asignaturasRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-04
    return this.asignaturasRepository.findOne(id);
  }

  create(dto: CreateAsignaturaDto) {
    // TODO: HU-04
    return this.asignaturasRepository.create(dto);
  }

  update(id: number, dto: UpdateAsignaturaDto) {
    // TODO: HU-04
    return this.asignaturasRepository.update(id, dto);
  }

  remove(id: number) {
    // TODO: HU-04
    return this.asignaturasRepository.remove(id);
  }
}
