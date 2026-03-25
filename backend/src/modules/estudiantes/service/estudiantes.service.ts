import { Injectable } from '@nestjs/common';
import { EstudiantesRepository } from '../repository/estudiantes.repository';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private readonly estudiantesRepository: EstudiantesRepository) {}

  findAll() {
    // TODO: HU-01
    return this.estudiantesRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-01
    return this.estudiantesRepository.findOne(id);
  }

  create(dto: CreateEstudianteDto) {
    // TODO: HU-01
    return this.estudiantesRepository.create(dto);
  }

  update(id: number, dto: UpdateEstudianteDto) {
    // TODO: HU-01
    return this.estudiantesRepository.update(id, dto);
  }

  remove(id: number) {
    // TODO: HU-01
    return this.estudiantesRepository.remove(id);
  }
}
