/**
 * SERVICIO DE PROGRAMAS ACADÉMICOS
 * Mismo patrón: NotFoundException + ConflictException (P2002 = código duplicado).
 * Al eliminar: si el programa tiene estudiantes o asignaturas, Prisma lanza P2003.
 */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ProgramasRepository } from '../repository/programas.repository';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { UpdateProgramaDto } from '../dto/update-programa.dto';

@Injectable()
export class ProgramasService {
  constructor(private readonly programasRepository: ProgramasRepository) {}

  findAll() {
    return this.programasRepository.findAll();
  }

  async findOne(id: number) {
    const programa = await this.programasRepository.findOne(id);
    if (!programa) throw new NotFoundException(`Programa con ID ${id} no encontrado`);
    return programa;
  }

  async create(dto: CreateProgramaDto) {
    try {
      return await this.programasRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un programa con ese código');
      throw error;
    }
  }

  async update(id: number, dto: UpdateProgramaDto) {
    await this.findOne(id);
    try {
      return await this.programasRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un programa con ese código');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.programasRepository.remove(id);
  }
}
