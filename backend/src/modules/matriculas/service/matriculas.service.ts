import { Injectable } from '@nestjs/common';
import { MatriculasRepository } from '../repository/matriculas.repository';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';

@Injectable()
export class MatriculasService {
  constructor(private readonly matriculasRepository: MatriculasRepository) {}

  findAll() {
    // TODO: HU-07
    return this.matriculasRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-07
    return this.matriculasRepository.findOne(id);
  }

  create(dto: CreateMatriculaDto) {
    // TODO: HU-07 — validar unicidad compuesta estudianteId + asignacionDocenteId
    return this.matriculasRepository.create(dto);
  }

  remove(id: number) {
    // TODO: HU-07
    return this.matriculasRepository.remove(id);
  }
}
