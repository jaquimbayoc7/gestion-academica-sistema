import { Injectable } from '@nestjs/common';
import { AsignacionesDocenteRepository } from '../repository/asignaciones-docente.repository';
import { CreateAsignacionDocenteDto } from '../dto/create-asignacion-docente.dto';
import { UpdateAsignacionDocenteDto } from '../dto/update-asignacion-docente.dto';

@Injectable()
export class AsignacionesDocenteService {
  constructor(
    private readonly asignacionesDocenteRepository: AsignacionesDocenteRepository,
  ) {}

  findAll() {
    // TODO: HU-06
    return this.asignacionesDocenteRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-06
    return this.asignacionesDocenteRepository.findOne(id);
  }

  create(dto: CreateAsignacionDocenteDto) {
    // TODO: HU-06 — validar unicidad compuesta
    return this.asignacionesDocenteRepository.create(dto);
  }

  update(id: number, dto: UpdateAsignacionDocenteDto) {
    // TODO: HU-06
    return this.asignacionesDocenteRepository.update(id, dto);
  }

  remove(id: number) {
    // TODO: HU-06
    return this.asignacionesDocenteRepository.remove(id);
  }
}
