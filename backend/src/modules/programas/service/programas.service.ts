import { Injectable } from '@nestjs/common';
import { ProgramasRepository } from '../repository/programas.repository';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { UpdateProgramaDto } from '../dto/update-programa.dto';

@Injectable()
export class ProgramasService {
  constructor(private readonly programasRepository: ProgramasRepository) {}

  findAll() {
    // TODO: HU-03
    return this.programasRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-03
    return this.programasRepository.findOne(id);
  }

  create(dto: CreateProgramaDto) {
    // TODO: HU-03
    return this.programasRepository.create(dto);
  }

  update(id: number, dto: UpdateProgramaDto) {
    // TODO: HU-03
    return this.programasRepository.update(id, dto);
  }

  remove(id: number) {
    // TODO: HU-03
    return this.programasRepository.remove(id);
  }
}
