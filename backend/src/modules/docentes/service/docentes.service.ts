import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { DocentesRepository } from '../repository/docentes.repository';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private readonly docentesRepository: DocentesRepository) {}

  findAll() {
    return this.docentesRepository.findAll();
  }

  async findOne(id: number) {
    const docente = await this.docentesRepository.findOne(id);
    if (!docente) throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    return docente;
  }

  async create(dto: CreateDocenteDto) {
    try {
      return await this.docentesRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un docente con ese documento o correo');
      throw error;
    }
  }

  async update(id: number, dto: UpdateDocenteDto) {
    await this.findOne(id);
    try {
      return await this.docentesRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un docente con ese documento o correo');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.docentesRepository.remove(id);
  }
}
