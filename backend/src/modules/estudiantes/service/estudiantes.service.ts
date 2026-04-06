import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EstudiantesRepository } from '../repository/estudiantes.repository';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private readonly estudiantesRepository: EstudiantesRepository) {}

  findAll() {
    return this.estudiantesRepository.findAll();
  }

  async findOne(id: number) {
    const estudiante = await this.estudiantesRepository.findOne(id);
    if (!estudiante) throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    return estudiante;
  }

  async create(dto: CreateEstudianteDto) {
    try {
      return await this.estudiantesRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un estudiante con ese código, documento o correo');
      throw error;
    }
  }

  async update(id: number, dto: UpdateEstudianteDto) {
    await this.findOne(id);
    try {
      return await this.estudiantesRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un estudiante con ese código, documento o correo');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.estudiantesRepository.remove(id);
  }
}
