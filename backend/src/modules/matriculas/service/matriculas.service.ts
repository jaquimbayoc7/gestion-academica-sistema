import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { MatriculasRepository } from '../repository/matriculas.repository';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';

@Injectable()
export class MatriculasService {
  constructor(private readonly matriculasRepository: MatriculasRepository) {}

  findAll() {
    return this.matriculasRepository.findAll();
  }

  async findOne(id: number) {
    const matricula = await this.matriculasRepository.findOne(id);
    if (!matricula) throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    return matricula;
  }

  async create(dto: CreateMatriculaDto) {
    const existing = await this.matriculasRepository.findByCompound(
      dto.estudianteId, dto.asignacionDocenteId,
    );
    if (existing) throw new ConflictException('El estudiante ya está matriculado en esta asignación');
    try {
      return await this.matriculasRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2003') throw new NotFoundException('El estudiante o asignación referenciada no existe');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.matriculasRepository.remove(id);
  }
}
