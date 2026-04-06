import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PeriodosRepository } from '../repository/periodos.repository';
import { CreatePeriodoDto } from '../dto/create-periodo.dto';
import { UpdatePeriodoDto } from '../dto/update-periodo.dto';

@Injectable()
export class PeriodosService {
  constructor(private readonly periodosRepository: PeriodosRepository) {}

  findAll() {
    return this.periodosRepository.findAll();
  }

  async findOne(id: number) {
    const periodo = await this.periodosRepository.findOne(id);
    if (!periodo) throw new NotFoundException(`Período con ID ${id} no encontrado`);
    return periodo;
  }

  async create(dto: CreatePeriodoDto) {
    if (dto.activo) {
      await this.periodosRepository.deactivateAll();
    }
    try {
      return await this.periodosRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un período con ese nombre');
      throw error;
    }
  }

  async update(id: number, dto: UpdatePeriodoDto) {
    await this.findOne(id);
    if (dto.activo) {
      await this.periodosRepository.deactivateAll();
    }
    try {
      return await this.periodosRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un período con ese nombre');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.periodosRepository.remove(id);
  }
}
